"use strict"

//DOM ELEMENTS
export let gallery = document.getElementById("gallery") ;
export let search = document.getElementById("search") ;
export let submit = document.getElementById("submit") ;
export let ingredientsList = document.getElementById("ingredients-list") ;
export let devicesList = document.getElementById("devices-list") ;
export let utensilsList = document.getElementById("utensils-list") ;


//TO CLEAN TEXT
let stopWords = [" a ", " au ", " aux ", " le ", " la ", " les ", " un ", " une ", " des ", " du ", " dans ", //TODO handle empty space more efficiently
    " l'", " d'", " en ", " de ", " et ", " pour ", " que ", " avec ", " plus ", " sans ", " ce ",
    " ceci ", " ou ", " mais ", " donc ", " ni ", " etc ", " recette "] ;


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

export function splitText(text){
    return text.split(" ") ;
}

export function arrayMatch(array1, array2){
    let matchNumber = 0 ;

    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if(array1[i] === array2[j]){
                matchNumber += 1 ;
            }
        }
    }
    return matchNumber ;
}

export function removeDuplicatesFromArray(array){
    let normalizedElements = [] ;
    let arrayWithoutDuplicates = [] ;

    for (let i = 0; i < array.length; i++) {
        let ingredient = cleanText(array[i]) ;

        if (!normalizedElements.includes(ingredient)){
            normalizedElements.push(ingredient) ;
            arrayWithoutDuplicates.push(array[i]) ;
        }
    }

    return arrayWithoutDuplicates ;
}