

let listaTextoEncriptado = [];
showContent();

function showContent() {
    const notResults = document.getElementById('no_results');
    const history = document.getElementById('history');
    if (listaTextoEncriptado.length === 0) {

        notResults.style.display = 'block';
        history.style.display = 'none';
    } else {

        notResults.style.display = 'none';
        history.style.display = 'block';
    }

}
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function getTextInput() {
    let textoDeUsuario = document.getElementById("userValue").value;
    if (!textoDeUsuario) {
        alert("Ingrese un texto");
    }
    return textoDeUsuario;
};



function encriptar() {
    let textoDeUsuario = validar(getTextInput());
    if (!textoDeUsuario) {
        return;
    }
    let textoEncriptado = procesar(textoDeUsuario);
    console.log({ textoEncriptado });
    //listaTextoEncriptado.push({ text: textoDeUsuario, encripted: textoEncriptado });
    listaTextoEncriptado.push(textoEncriptado);
    showContent()
}

function desencriptar() {
    let textoDeUsuario = getTextInput();
    if (!textoDeUsuario) {
        return;
    }
    let textoDesencriptado = procesar(textoDeUsuario, false);
    console.log(textoDesencriptado);
    showContent()

}

function copiar(index) {
    let texto = listaTextoEncriptado[index];
    asignarTextoElemento("#userValue", texto.encripted);
}

function procesar(text, toEncriptar = true) {

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
    }

    let regex = new RegExp(Object.keys(relleno).join('|'), 'gi');;
    let procesado = "";
    if (!toEncriptar) {
        //search value in listarTextoEncriptado
        let index = listaTextoEncriptado.findIndex(function (elemento) {
            return elemento === text;

        });
        if (index === -1) {
            alert("No se encontró el texto encriptado");
            return;
        }

        const vocales = Object.keys(relleno).join('');
        regex = (new RegExp(`([${vocales}])(${Object.values(relleno).join('|')})`, 'gi'));

        return text.replace(regex, (encriptado, vocal) => {
            // Recuperar solo la vocal inicial
            console.log({ encriptado, vocal });
            return vocal[0];
        });

    }

    "/[aeiouáéíóú]/g"
    return text.replace(regex, (vocal) => {
        console.log(vocal);
        return vocal + relleno[vocal.toLowerCase()];
    });

}
function validar(texto) {
    if (texto.match(/\p{Lu}|\p{N}|\p{S}|\p{P}/gu)) {
        alert("Recuerda NO usar mayusculas, números ni simbolos");
        return false;
    }
    console.log(texto);
    return texto;

}
