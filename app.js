document.addEventListener('DOMContentLoaded', () => {
    actualizarVisibilidadSecciones();
});

function actualizarVisibilidadSecciones() {
    const notResults = document.getElementById('message');
    const history = document.getElementById('history');

    if (listaTextoEncriptado.length === 0) {
        mostrarElemento(notResults);
        ocultarElemento(history);
    } else {
        ocultarElemento(notResults);
        mostrarElemento(history);
    }
}

function mostrarElemento(elemento) {
    elemento.style.display = 'block';
}

function ocultarElemento(elemento) {
    elemento.style.display = 'none';
}
function asignarTextoElemento(selector, texto) {
    const elementoHTML = document.querySelector(selector);
    console.log({ selector, texto, elementoHTML });

    if (elementoHTML) {
        elementoHTML.value = texto;
    }
}

function crearItemLista(elemento, index) {
    const item = document.createElement('li');
    item.classList.add('list-item');
    item.textContent = elemento;
    item.onclick = () => crearBotonCopiar(index);
    return item;
}

function crearBotonCopiar(index) {
    const contendorBotonCopiar = document.getElementById('contendorBotonCopiar');
    const boton = document.createElement('button');

    contendorBotonCopiar.innerHTML = '';
    boton.textContent = `Copiar índice ${index}`;
    boton.onclick = () => copiarTexto(index);
    contendorBotonCopiar.appendChild(boton);
}

function getTextInput() {
    const textoDeUsuario = document.getElementById("userValue").value;
    if (!textoDeUsuario) {
        alert("Ingrese un texto");
        return null;
    }
    return textoDeUsuario;
}

function validarTexto(texto) {
    const patronInvalido = /\p{Lu}|\p{N}|\p{S}|\p{P}/gu;
    if (patronInvalido.test(texto)) {
        alert("Recuerda NO usar mayúsculas, números ni símbolos");
        return false;
    }
    return true;
}

function procesarTexto(texto, encriptar = true) {
    const relleno = {
        "a": "i",
        "e": "nter",
        "i": "mes",
        "o": "ber",
        "u": "fati",
        "á": "i",
        "é": "nter",
        "í": "mes",
        "ó": "ber",
        "ú": "fati"
    };

    let regex = new RegExp(Object.keys(relleno).join('|'), 'gi');
    if (!encriptar) {
        return desencriptarTexto(texto, regex, relleno);
    }

    return texto.replace(regex, (vocal) => {
        return vocal + relleno[vocal.toLowerCase()];
    });
}

function desencriptarTexto(texto, regex, relleno) {
    const index = listaTextoEncriptado.indexOf(texto);
    if (index === -1) {
        alert("No se encontró el texto encriptado");
        return texto;
    }

    const vocales = Object.keys(relleno).join('');
    const regexDesencriptado = new RegExp(`([${vocales}])(${Object.values(relleno).join('|')})`, 'gi');

    return texto.replace(regexDesencriptado, (encriptado, vocal) => vocal[0]);
}
let listaTextoEncriptado = [];

function encriptar() {
    const textoDeUsuario = getTextInput();
    if (!textoDeUsuario || !validarTexto(textoDeUsuario)) {
        return;
    }

    const textoEncriptado = procesarTexto(textoDeUsuario);
    listaTextoEncriptado.push(textoEncriptado);
    actualizarLista();
}

function desencriptar() {
    const textoDeUsuario = getTextInput();
    console.log({ textoDeUsuario });

    if (!textoDeUsuario) {
        return;
    }

    const textoDesencriptado = procesarTexto(textoDeUsuario, false);
    console.log({ textoDesencriptado });

    //asignarTextoElemento("#userValue", textoDesencriptado);
}

function actualizarLista() {
    actualizarVisibilidadSecciones();
    const listaContenedor = document.getElementById('listaContenedor');
    listaContenedor.innerHTML = '';

    listaTextoEncriptado.forEach((elemento, index) => {
        const item = crearItemLista(elemento, index);
        listaContenedor.appendChild(item);
    });
}

function copiarTexto(index) {
    const textoEncriptado = listaTextoEncriptado[index];

    console.log({ index, textoEncriptado });

    asignarTextoElemento("#userValue", textoEncriptado);
}


