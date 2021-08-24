"use strict"



import {gallery, search, submit} from "./helpers.js";

export class View{
    constructor() {
    }

    displayOneRecipeIngredients(ingredients){

        let htmlIngredients = `` ;

        for (let i = 0; i < ingredients.length; i++) {
            htmlIngredients +=
                `<div class="card__ingredient">
                    ${ingredients[i].quantity ? `<span class="card__ingredient-title">${ingredients[i].ingredient}</span>:` : `<span class="card__ingredient-title">${ingredients[i].ingredient}</span>`}
                    ${ingredients[i].quantity ? `<span className="card__ingredient-value">${ingredients[i].quantity}</span>` : `<span className="card__ingredient-value"></span>` }
                    ${ingredients[i].unit ? `<span class="card__ingredient-unit">${ingredients[i].unit}</span>` : `<span class="card__ingredient-unit"></span>` }
                </div>` ;
        }
        return htmlIngredients ;
    }

    displayOneRecipe(recipeObject){

        let htmlRecipe = `` ;
        let htmlIngredientsList = this.displayOneRecipeIngredients(recipeObject.ingredients) ;

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
                        <div class="card__col card__col--col-1">
                            ${htmlIngredientsList}
                        </div>

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

    displayAllRecipes(allRecipesObjectList){

        let htmlAllRecipes = `` ;
        for (let i = 0; i < allRecipesObjectList.length; i++) {
            htmlAllRecipes += this.displayOneRecipe(allRecipesObjectList[i]) ;
        }
    gallery.innerHTML = htmlAllRecipes ;
    }

    onSearch(){
        search.addEventListener("keydown", event => {
            if (event.key === "Enter"){
                event.preventDefault() ;
                let userSearch = event.target.value ;
            }
        }) ;

    }

    onSubmit(){
        submit.addEventListener("click", event => {
            event.preventDefault() ;
            let userSearch = search.value ;
        }) ;
    }
}