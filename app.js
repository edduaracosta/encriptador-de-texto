
let listaTextoEncriptado = [];

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function encriptar(){
    let textoAEncriptar =  validar();
    //cambiar de ambito la clave de encriptacion para mas seguridad
    
    //for(let i=0; i<textoAEncriptar.length(); i++){
    //}
    let textoEncriptado = procesar(textoAEncriptar);

    console.log(textoEncriptado);

    listaTextoEncriptado.push(textoEncriptado);

}

function procesar(texto) {
    const relleno = {
        "a":"i", 
        "e":"nter",
        "i":"mes", 
        "o":"ber", 
        "u":"fati",
        "á":"i", 
        "é":"nter",
        "í":"mes", 
        "ó":"ber", 
        "ú":"fati"
    }
    //replace("a","i")
    return texto.replace(/[aeiouáéíóú]/g, (vocal) => 
    {
        console.log(vocal);
        return vocal + relleno[vocal.toLowerCase()];
        
    });
}
function validar(){
    let textoDeUsuario = document.getElementById("userValue").value;
    if(textoDeUsuario.match(/\p{Lu}|\p{N}|\p{S}|\p{P}/gu)){
        alert("Recuerda NO usar mayusculas, números ni simbolos"); 
        return false;
    }
    console.log(textoDeUsuario);
    return textoDeUsuario;
    
}
function limpiar(){
    return document.querySelector("#userValue").value = ""; ;
}
