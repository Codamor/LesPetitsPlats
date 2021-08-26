"use strict"

import {Recipe} from "./Recipe.js";
import {arrayMatch, cleanText, removeDuplicatesFromArray, splitText} from "../helpers.js";

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

    getNormalizedName(oneRecipe){
        let name = splitText(cleanText(oneRecipe._name)) ;

        return name ;
    }

    getNormalizedIngredients(oneRecipe) {
        let allIngredients = [];

        for (let i = 0; i < oneRecipe.ingredients.length; i++) {
            let ingredient = splitText(cleanText(oneRecipe.ingredients[i].ingredient)) ;
            for (let j = 0; j < ingredient.length; j++) {
                allIngredients.push(ingredient[j]) ;
            }
        }

        return allIngredients;
    }

    getNormalizedDescription(oneRecipe){
        let description = splitText(cleanText(oneRecipe.description)) ;

        return description ;
    }


    defineRecipeMatchScore(userInput, oneRecipe){
        let recipeScore = 0 ;
        let recipeName = this.getNormalizedName(oneRecipe) ;
        let recipeIngredients = this.getNormalizedIngredients(oneRecipe) ;
        let recipeDescription = this.getNormalizedDescription(oneRecipe) ;

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
            let recipeScore = this.defineRecipeMatchScore(userInput, allRecipes[i]) ;
            if (recipeScore >= 1){
                matchedRecipes.push(allRecipes[i]) ;
            }
        }

        return matchedRecipes ;
    }

    getIngredients(oneMatchedRecipe){
        let matchedIngredients = [] ;

        for (let i = 0; i < oneMatchedRecipe.ingredients.length; i++) {
            matchedIngredients.push(oneMatchedRecipe.ingredients[i].ingredient) ;
        }

        return matchedIngredients ;
    }

    getAllIngredients(allMatchedRecipes){
        let matchedIngredients = [] ;

        for (let i = 0; i < allMatchedRecipes.length; i++) {
            let thisRecipeIngredientsList = this.getIngredients(allMatchedRecipes[i]) ;

            for (let j = 0; j < thisRecipeIngredientsList.length; j++) {
                matchedIngredients.push(thisRecipeIngredientsList[j]) ;
            }
        }

        let allMatchedIngredientsWithoutDuplicates = removeDuplicatesFromArray(matchedIngredients) ;

        return allMatchedIngredientsWithoutDuplicates ;
    }

    getAllDevices(allMatchedRecipes){
        let matchedDevices = [] ;

        for (let i = 0; i < allMatchedRecipes.length; i++) {
            matchedDevices.push(allMatchedRecipes[i].appliance) ;
        }

        let allMatchedDevicesWithoutDuplicates = removeDuplicatesFromArray(matchedDevices) ;

        return allMatchedDevicesWithoutDuplicates ;
    }

}