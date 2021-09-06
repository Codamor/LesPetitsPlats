"use strict"

import {
    cleanText,
    gallery,
    searchBar,
    splitText,
    submitSearchButton,
    ingredientsList,
    devicesList,
    utensilsList,
    allTags,
    allTagsIcon,
    displayedRecipes,
    userSelectedTags,
    ingredientsInput,
    devicesInput,
    utensilsInput,
    ingredientsTags, devicesTags, searchTextPatternAlgorithm
} from "./helpers.js";

export class View{
    constructor() {
    }

    displayRecipes(recipesObjectsList){
        gallery.innerHTML = `` ;

        let htmlAllRecipes = `` ;
        for (let i = 0; i < recipesObjectsList.length; i++) {
            htmlAllRecipes += this.createHTMLRecipe(recipesObjectsList[i]) ;
        }
        gallery.innerHTML = htmlAllRecipes ;
    }

    displayTagsList(matchedTags, tagType){
        let htmlLists = `` ;

        while (matchedTags.length){
            let elementsBatch = matchedTags.splice(0, 10) ;
            let liElement = `` ;
            let ulElement = `` ;

            for (let i = 0; i < elementsBatch.length; i++) {
                liElement += this.createHTMLTag(elementsBatch[i], tagType)
            }

            ulElement =
                `<ul class="filter__list">
                    ${liElement}
                 </ul>`

            htmlLists += ulElement ;
        }

        if (tagType === "ingredient"){
            ingredientsList.innerHTML = htmlLists ;
        } else if (tagType === "device"){
            devicesList.innerHTML = htmlLists ;
        } else if (tagType === "utensil"){
            utensilsList.innerHTML = htmlLists ;
        }

    }

    displayUserSelectedTag(tag, tagType){
        let alreadyDisplayedTags = this.getDisplayedUserSelectedTags() ;

        for (let i = 0; i < alreadyDisplayedTags.length; i++) {
            if (alreadyDisplayedTags[i].tagValue === tag){
                return false
            }
        }

        let htmlTag = this.createHTMLUserSelectedTag(tag, tagType) ;

        userSelectedTags.innerHTML += htmlTag ;
    }

    filterRecipesByTags(allRecipesId, recipesIDToEnable, recipesIDToDisable){
        for (let i = 0; i < allRecipesId.length; i++) {
            if(!recipesIDToEnable.includes(allRecipesId[i])){
                recipesIDToDisable.push(allRecipesId[i]) ;
            }
        }
        for (let i = 0; i < recipesIDToEnable.length; i++) {
            this.enableRecipe(recipesIDToEnable[i]) ;
        }

        for (let i = 0; i < recipesIDToDisable.length; i++) {
            this.disableRecipe(recipesIDToDisable[i]) ;
        }
    }


    enableRecipe(recipeId){
        let recipe = document.querySelector(`[data-recipe-id="${recipeId}"]`) ;
        recipe.dataset.visible = "true" ;
    }

    disableRecipe(recipeId){
        let recipe = document.querySelector(`[data-recipe-id="${recipeId}"]`) ;
        recipe.dataset.visible = "false" ;
    }

    createHTMLIngredientsList(ingredients){
        let htmlIngredients = `` ;

        for (let i = 0; i < ingredients.length; i++) {
            htmlIngredients +=
                `<li class="card__ingredient">
                    ${ingredients[i].quantity ? `<h3 class="card__ingredient-title">${ingredients[i].ingredient}</h3>:` : `<span class="card__ingredient-title">${ingredients[i].ingredient}</span>`}
                    ${ingredients[i].quantity ? `<span className="card__ingredient-value">${ingredients[i].quantity}</span>` : `<span className="card__ingredient-value"></span>` }
                    ${ingredients[i].unit ? `<span class="card__ingredient-unit">${ingredients[i].unit}</span>` : `<span class="card__ingredient-unit"></span>` }
                </li>` ;
        }
        return htmlIngredients ;
    }

    createHTMLRecipe(recipeObject){
        let htmlRecipe = `` ;
        let htmlIngredientsList = this.createHTMLIngredientsList(recipeObject.ingredients) ;

        htmlRecipe =
            `<div class="card" aria-label="Recette de cuisine" data-recipe-id="${recipeObject.id}">
                <div class="card__media">

                </div>
                
                <div class="card__data">
                    <div class="card__header">
                        <h2 class="card__title">
                            ${recipeObject.name}
                        </h2>

                        <div class="card__time">
                            ${recipeObject.time}
                        </div>
                    </div>

                    <div class="card__cols-box">
                        <ul class="card__col card__col--col-1">
                            ${htmlIngredientsList}
                        </ul>

                        <div class="card__col card__col--col-2">
                            <p class="card__description">
                                ${recipeObject.description}
                            </p>
                        </div>

                    </div>
                </div>
            </div>` ;

        return htmlRecipe ;
    }

    createHTMLTag(oneTag, tagType){
        let htmlTag =
            `<li data-tag-name="${oneTag}">
                <span data-tag-type="${tagType}" data-value="${oneTag}" class="filter__tag">${oneTag}</span>
            </li>` ;

        return htmlTag ;
    }

    createHTMLUserSelectedTag(oneTag, tagType){
        let htmlUserSelectedTag = `` ;
        let filterOption ;

        switch (tagType){
            case tagType = "ingredient" :
                filterOption = "filter--option-one" ;
                break ;
            case tagType = "device" :
                filterOption = "filter--option-two" ;
                break ;
            case tagType = "utensil" :
                filterOption = "filter--option-three"  ;
                break ;

        }

        htmlUserSelectedTag =
            `<div class="filter ${filterOption} filter--selected" data-tag-type="${tagType}" data-tag-value="${oneTag}">
                ${oneTag}
                <span class="filter__icon filter__icon--tag"></span>
             </div>`

        return htmlUserSelectedTag ;
    }

    getDisplayedRecipesId(){
        let displayedRecipesId = [] ;

        for (let i = 0; i < displayedRecipes.length; i++) {
            displayedRecipesId.push(Number(displayedRecipes[i].dataset.recipeId)) ;
        }

        return displayedRecipesId ;
    }

    getDisplayedUserSelectedTags(){
        let userSelectedTags = document.getElementsByClassName("filter--selected") ;
        let userSelectedTagsValue = [] ;

        for (let i = 0; i < userSelectedTags.length; i++) {
            let tag = {
                tagType: `${userSelectedTags[i].dataset.tagType}`,
                tagValue: `${userSelectedTags[i].dataset.tagValue}`
            }
            userSelectedTagsValue.push(tag) ;
        }

        return userSelectedTagsValue ;
    }

    displayUserSearchedTags(userSearch, tagType){

        if (tagType === "ingredient"){
            let allIngredients = document.querySelectorAll(`[data-tag-type="ingredient"]`) ;

            for (let i = 0; i < allIngredients.length; i++) {
                let ingredient = cleanText(allIngredients[i].dataset.value) ;
                /*console.log(userSearch, ingredient) ;*/

                if(!searchTextPatternAlgorithm(ingredient, userSearch)){
                    allIngredients[i].dataset.visible = "false" ;
                } else {
                    allIngredients[i].dataset.visible = "true" ;
                }
            }
        } else if (tagType === "device"){
            let devices = document.querySelectorAll(`[data-tag-type="device"]`) ;

            for (let i = 0; i < devices.length; i++) {
                let ingredient = cleanText(devices[i].dataset.value) ;
                /*console.log(userSearch, ingredient) ;*/

                if(!searchTextPatternAlgorithm(ingredient, userSearch)){
                    devices[i].dataset.visible = "false" ;
                } else {
                    devices[i].dataset.visible = "true" ;
                }
            }
        } else if (tagType === "utensil"){

            let utensil = document.querySelectorAll(`[data-tag-type="utensil"]`) ;

            for (let i = 0; i < utensil.length; i++) {
                let ingredient = cleanText(utensil[i].dataset.value) ;
                /*console.log(userSearch, ingredient) ;*/

                if(!searchTextPatternAlgorithm(ingredient, userSearch)){
                    utensil[i].dataset.visible = "false" ;
                } else {
                    utensil[i].dataset.visible = "true" ;
                }
            }
        }
    }

   onSearchBar(searchRecipesFromApi){ //TODO merger this with onSubmitButton in onSearch method
        searchBar.addEventListener("input", event => {
            event.preventDefault() ;

            let userInput = event.target.value ;

            if (userInput.length >= 3){
                let userSearch = splitText(cleanText(userInput)) ;
                searchRecipesFromApi(userSearch, "global") ;
            }
        }) ;
    }

    onSubmitButton(searchRecipesFromApi){
        submitSearchButton.addEventListener("click", event => {
            event.preventDefault() ;
            let userInput = searchBar.value ;
            let userSearch = splitText(cleanText(userInput)) ;

            searchRecipesFromApi(userSearch, "global") ;
        }) ;
    }

    onTags(filterRecipesByTag){
        for (let i = 0; i < allTags.length; i++) {
            allTags[i].addEventListener("click", event => {
                let tagType = cleanText(event.target.dataset.tagType) ;
                let userTag = cleanText(event.target.dataset.value) ;

                this.displayUserSelectedTag(userTag, tagType) ;

                filterRecipesByTag() ;
            })
        }
    }

    onFilterTagsIcon(filterRecipesByTag){
        for (let i = 0; i < allTagsIcon.length; i++) {
            allTagsIcon[i].addEventListener("click", event => { //TODO fix bug
                let parentNode = event.target.parentNode.parentNode ;
                let childNode = event.target.parentNode ;
                parentNode.removeChild(childNode) ;

                filterRecipesByTag() ;
            }) ;
        }
    }

    onFiltersInput(searchRecipes){
        ingredientsInput
            .addEventListener("click", event => {
                ingredientsInput.placeholder = "" ;
            }) ;

        ingredientsInput
            .addEventListener("input", event => {
                event.preventDefault() ; //TODO remove if useless
                let userInput = ingredientsInput.value ;
                let userSearch = splitText(cleanText(userInput)) ;

                searchRecipes(userSearch, "ingredient") ;
                this.displayUserSearchedTags(cleanText(userInput), "ingredient") ;
            }) ;

        devicesInput
            .addEventListener("click", event => {
                devicesInput.placeholder = "" ;
            }) ;

        devicesInput
            .addEventListener("input", event => {
                let userInput = devicesInput.value ;
                let userSearch = splitText(cleanText(userInput)) ;

                searchRecipes(userSearch, "device") ;
                this.displayUserSearchedTags(cleanText(userInput), "device") ;
            }) ;

        utensilsInput
            .addEventListener("click", event => {
                utensilsInput.placeholder = "" ;
            }) ;

        utensilsInput
            .addEventListener("input", event => {
                let userInput = utensilsInput.value ;
                let userSearch = splitText(cleanText(userInput)) ;

                searchRecipes(userSearch, "utensil") ;
                this.displayUserSearchedTags(cleanText(userInput), "utensil") ;
            }) ;
    }
}