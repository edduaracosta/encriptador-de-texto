let textoAEncriptar = "";
let textoEncriptado = "";
let listaTextoEncriptado = [];
let vocales = ["a","e","i","o","u"];
let relleno = ["i", "nter","mes", "ber", "fati"]

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function encriptar(){
    validar();
}
function separar(){
    if(textoAEncriptar!=" "){
        return;
    }
}

function validar(){
    let textoDeUsuario = document.getElementById("userValue").value;
    if(textoDeUsuario.match(/\p{Lu}|\p{N}|\p{S}|\p{P}/gu)){
        alert("Recuerda NO usar mayusculas, numeros ni simbolos");
    }
}
function limpiar(){
    return document.querySelector("#userValue").value = ""; ;
}
