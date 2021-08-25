"use strict"

import {Recipe} from "./Recipe.js";
import {arrayMatch, cleanText, splitText} from "../helpers.js";

export class Model{

    constructor(db) {
        this._db = db ;
    }

    getAllRecipes(){
        let allRecipes = [] ;

        for (let i = 0; i < this._db.length; i++) {
            let recipe = new Recipe(
                                this._db[i].id,
                                this._db[i].name,
                                this._db[i].servings,
                                this._db[i].ingredients,
                                this._db[i].time,
                                this._db[i].description,
                                this._db[i].appliance,
                                this._db[i].ustensils)

            allRecipes.push(recipe) ;
        }
        return allRecipes ;
    }

    getNormalizedNameFromRecipe(recipe){
        let name = splitText(cleanText(recipe._name)) ;

        return name ;
    }

    getNormalizedIngredientsFromRecipe(recipe) {
        let allIngredients = [];

        for (let i = 0; i < recipe.ingredients.length; i++) {
            let ingredient = splitText(cleanText(recipe.ingredients[i].ingredient)) ;
            for (let j = 0; j < ingredient.length; j++) {
                allIngredients.push(ingredient[j]) ;
            }
        }

        return allIngredients;
    }

    getNormalizedDescriptionFromRecipe(recipe){
        let description = splitText(cleanText(recipe.description)) ;

        return description ;
    }


    getRecipeMatchScore(userInput, recipe){
        let recipeScore = 0 ;
        let recipeName = this.getNormalizedNameFromRecipe(recipe) ;
        let recipeIngredients = this.getNormalizedIngredientsFromRecipe(recipe) ;
        let recipeDescription = this.getNormalizedDescriptionFromRecipe(recipe) ;

        let nameScore = arrayMatch(recipeName, userInput) ;
        let ingredientScore = arrayMatch(recipeIngredients, userInput) ;
        let descriptionScore = arrayMatch(recipeDescription, userInput) ;

        recipeScore =  nameScore + ingredientScore + descriptionScore ;

        return recipeScore ;
    }

    getMatchedRecipes(userInput){
        let matchedRecipes = [] ;
        let allRecipes = this.getAllRecipes() ;

        for (let i = 0; i < allRecipes.length; i++) {
            let recipeScore = this.getRecipeMatchScore(userInput, allRecipes[i]) ;
            if (recipeScore >= 1){
                matchedRecipes.push(allRecipes[i]) ;
            }
        }

        return matchedRecipes ;
    }
}