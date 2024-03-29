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
    utensilsInput, searchPatternAlgorithm
} from "./helpers.js";

export class View{
    constructor() {
    }

    displayRecipes(recipesObjectsList){
        gallery.innerHTML = `` ;

        let htmlAllRecipes = `` ;
        for (let i = 0; i < recipesObjectsList.length; i++) {
            htmlAllRecipes += this.createHTMLRecipeCard(recipesObjectsList[i]) ;
        }
        gallery.innerHTML = htmlAllRecipes ;
    }

    displayTagsList(matchedTags, tagType){
        let htmlList = `` ;
        let liElement = `` ;
        let ulElement = `` ;

        for (let i = 0; i < matchedTags.length; i++) {
            liElement += this.createHTMLTagForList(matchedTags[i], tagType)
        }

        ulElement =
            `<ul class="filter__list">
                ${liElement}
             </ul>`

        htmlList += ulElement ;

        if (tagType === "ingredient"){
            ingredientsList.innerHTML = htmlList ;
        } else if (tagType === "device"){
            devicesList.innerHTML = htmlList ;
        } else if (tagType === "utensil"){
            utensilsList.innerHTML = htmlList ;
        }

    }

    displayTag(tag, tagType){
        let alreadyDisplayedTags = this.getDisplayedUserSelectedTags() ;

        for (let i = 0; i < alreadyDisplayedTags.length; i++) {
            if (alreadyDisplayedTags[i].tagValue === tag){
                return false
            }
        }

        let htmlTag = this.createHTMLTagForSelection(tag, tagType) ;

        userSelectedTags.innerHTML += htmlTag ;
    }

    filterTagsByUserSearch(userSearch, tagType){
        let allTags = document.querySelectorAll(`[data-tag-type="${tagType}"]:not(.filter--selected)`);
        for (let i = 0; i < allTags.length; i++) {

            let tag = cleanText(allTags[i].dataset.value);

            if (!searchPatternAlgorithm(tag, userSearch)) {
                allTags[i].dataset.visible = "false";
            } else {
                allTags[i].dataset.visible = "true";
            }
        }
    }

    filterRecipesBySelectedTags(allRecipesId, recipesIDToEnable, recipesIDToDisable){
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

    enableNoSearchResultsMessage(){

        gallery.innerHTML = "" ;

        document
            .getElementById("no-search-results").dataset.visible = "true" ;
    }

    disableNoSearchResultsMessage(){
        document
            .getElementById("no-search-results").dataset.visible = "false" ;
    }

    createHTMLRecipeCard(recipeObject){
        let htmlRecipe = `` ;
        let htmlIngredientsList = this.createHTMLIngredientsList(recipeObject.ingredients) ;

        htmlRecipe =
            `<div class="card" aria-label="Recette de cuisine" data-recipe-id="${recipeObject.id}" tabindex="0">
                <div class="card__media">

                </div>
                
                <div class="card__data">
                    <div class="card__header">
                        <h2 class="card__title" aria-label="Nom de la recette" tabindex="0">
                            ${recipeObject.name}
                        </h2>

                        <div class="card__time" aria-label="Durée de préparation de la recette" tabindex="0">
                            ${recipeObject.time}
                        </div>
                    </div>

                    <div class="card__cols-box">
                        <ul class="card__col card__col--col-1" aria-label="Liste des ingrédients de la recette">
                            ${htmlIngredientsList}
                        </ul>

                        <div class="card__col card__col--col-2" aria-label="Description de la recette">
                            <p class="card__description" tabindex="0">
                                ${recipeObject.description}
                            </p>
                        </div>

                    </div>
                </div>
            </div>` ;

        return htmlRecipe ;
    }

    createHTMLIngredientsList(ingredients){
        let htmlIngredients = `` ;

        for (let i = 0; i < ingredients.length; i++) {
            htmlIngredients +=
                `<li class="card__ingredient" aria-label="Ingrédient" tabindex="0">
                    ${ingredients[i].quantity ? `<h3 class="card__ingredient-title" aria-label="Nom de l'ingrédient">${ingredients[i].ingredient}</h3>:` : `<span class="card__ingredient-title">${ingredients[i].ingredient}</span>`}
                    ${ingredients[i].quantity ? `<span className="card__ingredient-value" aria-label="Quantité de l'ingrédient">${ingredients[i].quantity}</span>` : `<span className="card__ingredient-value"></span>` }
                    ${ingredients[i].unit ? `<span class="card__ingredient-unit" aria-label="Unité de mesure de la quantité">${ingredients[i].unit}</span>` : `<span class="card__ingredient-unit"></span>` }
                </li>` ;
        }
        return htmlIngredients ;
    }

    createHTMLTagForList(oneTag, tagType){
        let htmlTag =
            `<li data-tag-name="${oneTag}">
                <span data-tag-type="${tagType}" data-value="${oneTag}" class="filter__tag">${oneTag}</span>
            </li>` ;

        return htmlTag ;
    }

    createHTMLTagForSelection(oneTag, tagType){
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

    onSearch(searchRecipesFromApi){
        searchBar
            .addEventListener("input", event => {
                event.preventDefault() ;
                let userInput = event.target.value ;
                let userSearch = splitText(cleanText(userInput)) ;

                searchRecipesFromApi(userSearch, "global") ;

            }) ;

        submitSearchButton
            .addEventListener("click", event => {
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

                this.displayTag(userTag, tagType) ;

                filterRecipesByTag() ;
            })
        }
    }

    onFilterTagsIcon(filterRecipesByTag){
        for (let i = 0; i < allTagsIcon.length; i++) {
            allTagsIcon[i].addEventListener("click", event => {

                let parentNode = event.target.parentNode.parentNode ;
                let childNode = event.target.parentNode ;

                if(parentNode !== null){
                    parentNode.removeChild(childNode) ;
                }
                filterRecipesByTag() ;
            }) ;
        }
    }

    onFiltersInput(){

        ingredientsInput
            .addEventListener("input", event => {
                let userInput = ingredientsInput.value ;

                /*let userSearch = splitText(cleanText(userInput)) ; //enable to activate search recipes by Tag (cf Model also)
                searchRecipes(userSearch, "ingredient") ;*/

                let userSearch = cleanText(userInput) ;
                this.filterTagsByUserSearch(userSearch, "ingredient") ;
            }) ;

        devicesInput
            .addEventListener("input", event => {
                let userInput = devicesInput.value ;

                /*let userSearch = splitText(cleanText(userInput)) ; //enable to activate search recipes by Tag (cf Model also)
                searchRecipes(userSearch, "device") ;*/

                let userSearch = cleanText(userInput) ;
                this.filterTagsByUserSearch(userSearch, "device") ;
            }) ;

        utensilsInput
            .addEventListener("input", event => {
                let userInput = utensilsInput.value ;

                /*let userSearch = splitText(cleanText(userInput)) ; //enable to activate search recipes by Tag (cf Model also)
                searchRecipes(userSearch, "utensil") ;*/

                let userSearch = cleanText(userInput) ;
                this.filterTagsByUserSearch(userSearch, "utensil") ;
            }) ;

        let allFiltersInputs = document.querySelectorAll(".filter__interaction input") ;
            for (let i = 0; i < allFiltersInputs.length; i++) {
                allFiltersInputs[i].addEventListener("focusout", event => {
                    allFiltersInputs[i].value = "" ;
                })
            }
    }
}
