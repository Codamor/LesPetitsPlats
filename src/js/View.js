"use strict"



import {cleanText, gallery, search, splitText, submit} from "./helpers.js";

export class View{
    constructor() {
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
            `<div class="card" aria-label="Recette de cuisine">
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

    createHTMLTagsList(tagsList){
        let htmlTagsList = `` ;

        for (let i = 0; i < tagsList.length; i++) {
            htmlTagsList +=
                `<li class="filter__element">
                    ${tagsList[i]}
                </li>` ;
        }

        return htmlTagsList ;
    }

    displayRecipes(recipesObjectsList){

        gallery.innerHTML = `` ;

        let htmlAllRecipes = `` ;
        for (let i = 0; i < recipesObjectsList.length; i++) {
            htmlAllRecipes += this.createHTMLRecipe(recipesObjectsList[i]) ;
        }
    gallery.innerHTML = htmlAllRecipes ;
    }

    onSearch(handlerOnSearch){
        search.addEventListener("keydown", event => {
            if (event.key === "Enter"){
                event.preventDefault() ;

                let userInput = event.target.value ;
                let userSearch = splitText(cleanText(userInput)) ;

                handlerOnSearch(userSearch) ;
            }
        }) ;

    }

    onSubmit(handlerOnSearch){
        submit.addEventListener("click", event => {
            event.preventDefault() ;
            let userInput = search.value ;
            let userSearch = splitText(cleanText(userInput)) ;

            handlerOnSearch(userSearch) ;
        }) ;
    }
}