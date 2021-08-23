"use strict"


//TO CLEAN TEXT
let stopWords = [" a ", " au ", " aux ", " le ", " la ", " les ", " un ", " une ", " des ", " du ", " dans ",
    " l'", " d'", " en ", " de ", " et ", " pour ", " que ", " avec ", " plus ", " sans ", " ce ",
    " ceci ", " ou ", " mais ", " donc ", " ni ", " etc "] ;


function toLowerCaseText(text){
    return text.toLowerCase() ;
}

function removeAccents(text){
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ;
}

function removePunctuation(text){
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") ;
}

function removeMultipleSpaces(text){
    return text.replace(/\s\s+/g, ' ');
}

function removeStopWords(text){

    for (let i = 0; i < stopWords.length; i++) {
        text = text.replaceAll(stopWords[i], " ")
    }
    return text ;
}

export function cleanText(text){

    text = toLowerCaseText(text) ;
    text = removeAccents(text) ;
    text = removePunctuation(text) ;
    text = removeMultipleSpaces(text) ;
    text = removeStopWords(text) ;

    return text
}

