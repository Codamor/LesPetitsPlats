"use strict"

//DOM ELEMENTS
export let gallery = document.getElementById("gallery") ;
export let searchBar = document.getElementById("search") ;
export let submitSearchButton = document.getElementById("submit") ;
export let ingredientsList = document.getElementById("ingredients-list") ;
export let ingredientsInput = document.getElementById("ingredients-input") ;
export let devicesList = document.getElementById("devices-list") ;
export let devicesInput = document.getElementById("devices-input") ;
export let utensilsList = document.getElementById("utensils-list") ;
export let utensilsInput = document.getElementById("utensils-input") ;
export let allTags = document.getElementsByClassName("filter__tag") ;
export let allTagsIcon = document.getElementsByClassName("filter__icon--tag") ;
export let userSelectedTags = document.getElementById("user-selected-tags") ;
export let displayedRecipes = document.getElementsByClassName("card") ;

//SEARCH function
export function searchPatternAlgorithm(text, pattern) {
    let wordLength = pattern.length;
    let textLength = text.length;

    for (let i = 0; i <= textLength - wordLength; i++) {
        let j;

        for (j = 0; j < wordLength; j++) {
            if (text[i + j] !== pattern[j]) {
                break;
            }
        }

        if (j == wordLength) {
            return true ;
        }
    }
}

function searchPatternAlgorithmTwo(text, pattern) {
    /*console.log(text, pattern)*/
    let matchNumber = 0 ;
    let wordLength = pattern.length;
    let textLength = text.length;

    for (let i = 0; i <= textLength - wordLength; i++) {
        let j;

        for (j = 0; j < wordLength; j++) {
            if (text[i + j] !== pattern[j]) {
                break;
            }
        }

        if (j == wordLength) {
            /*console.log("match")*/
            matchNumber += 1 ;
        }
    }
    return matchNumber ;
}


//UTILITARIES
export function compareUserSearchWithData(dataWordsArray, userSearchWordsArray){
    let matchNumber = 0 ;

    for (let i = 0; i < dataWordsArray.length; i++) {
        for (let j = 0; j < userSearchWordsArray.length; j++) {
            if (searchPatternAlgorithm(dataWordsArray[i], userSearchWordsArray[j])){
                matchNumber += 1 ;
            }
        }
    }
    return matchNumber ;
}

export function compareUserSearchWithDataTwo(dataText, userSearchWordsArray){
    let matchNumber = 0 ;

    for (let i = 0; i < userSearchWordsArray.length; i++) {
        matchNumber += searchPatternAlgorithmTwo(dataText, userSearchWordsArray[i])
    }

    return matchNumber ;
}

export function removeDuplicatesFromArray(array){
    let normalizedElements = [] ;
    let arrayWithoutDuplicates = [] ;

    for (let i = 0; i < array.length; i++) {
        let element = cleanText(array[i]) ;

        if (!normalizedElements.includes(element)){
            normalizedElements.push(element) ;
            arrayWithoutDuplicates.push(array[i]) ;
        }
    }
    return arrayWithoutDuplicates ;
}

//TO CLEAN TEXT
let stopWords = [" a ", " au ", " aux ", " le ", " la ", " les ", " un ", " une ", " des ", " du ", " dans ", //TODO handle empty space more efficiently
    " l'", " d'", " en ", " de ", " et ", " pour ", " que ", " avec ", " plus ", " sans ", " ce ",
    " ceci ", " ou ", " mais ", " donc ", " ni ", " etc ", " recette "] ;


export function cleanText(text){
    text = toLowerCaseText(text) ;
    text = removeAccents(text) ;
    text = removePunctuation(text) ;
    text = removeMultipleSpaces(text) ;
    text = removeStopWords(text) ;
    return text ;
}

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
    return text.trim() ;
}

function removeStopWords(text){
    for (let i = 0; i < stopWords.length; i++) {
        text = text.replaceAll(stopWords[i], " ")
    }
    return text ;
}

export function splitText(text){
    return text.split(" ") ;
}

