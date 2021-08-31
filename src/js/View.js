"use strict"

import {
    cleanText,
    gallery,
    search,
    splitText,
    submit,
    ingredientsList,
    devicesList,
    utensilsList,
    ingredientsInput, allTags, displayedRecipes, userSelectedTags
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

    displayTagsList(matchedElements, tagType){
        let htmlLists = `` ;

        while (matchedElements.length){
            let elementsBatch = matchedElements.splice(0, 10) ;
            let liElement = `` ;
            let ulElement = `` ;

            for (let i = 0; i < elementsBatch.length; i++) {
                liElement += this.createHTMLTagForHTMLTagList(elementsBatch[i], tagType)
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

    displayUserSelectedTag(tag){
        userSelectedTags.innerHTML += tag ;
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

    createHTMLTagForHTMLTagList(oneTag, tagType){
        let htmlTag =
            `<li data-tag-name="${oneTag}">
                <span data-tag-type="${tagType}" data-value="${oneTag}" class="filter__element">${oneTag}</span>
            </li>` ;

        return htmlTag ;
    }

    createHTMLUserSelectedTag(oneTag, tagType){
        let htmlUserSelectedTag = `` ;

        htmlUserSelectedTag =
            `<div class="filter filter--option-one filter--selected" data-tag-type="${tagType}", data-tag-value="${oneTag}">
                ${oneTag}
                <span class="filter__icon"></span>
             </div>`
    }

    getDisplayedRecipesId(){
        let displayedRecipesId = [] ;

        for (let i = 0; i < displayedRecipes.length; i++) {
            displayedRecipesId.push(Number(displayedRecipes[i].dataset.recipeId)) ;
        }

        return displayedRecipesId ;
    }

   onSearchBar(handlerOnSearch){ //TODO merger this with onSubmitButton in onSearch method
        search.addEventListener("input", event => {
            event.preventDefault() ;

            let userInput = event.target.value ;
            let userSearch = splitText(cleanText(userInput)) ;

            handlerOnSearch(userSearch) ;
        }) ;

    }

    onSubmitButton(handlerOnSearch){
        submit.addEventListener("click", event => {
            event.preventDefault() ;
            let userInput = search.value ;
            let userSearch = splitText(cleanText(userInput)) ;

            handlerOnSearch(userSearch) ;
        }) ;
    }

    onTags(handlerTags){
        for (let i = 0; i < allTags.length; i++) {
            allTags[i].addEventListener("click", event => {
                let tagType = cleanText(event.target.dataset.tagType) ;
                let userTag = cleanText(event.target.dataset.value) ;

                handlerTags(tagType, userTag) ;
            })
        }
    }
}