"use strict"

import {Recipe} from "../Entity/Recipe.js";
import {arrayMatch, cleanText, removeDuplicatesFromArray, searchTextPattern, splitText} from "../helpers.js";

export class Model{

    constructor(db, search) {
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
                                this._db[i].utensils)

            allRecipes.push(recipe) ;
        }
        return allRecipes ;
    }

    formatName(oneRecipe){
        let name = splitText(cleanText(oneRecipe._name)) ;

        return name ;
    }

    formatIngredients(oneRecipe) {
        let allIngredients = [];

        for (let i = 0; i < oneRecipe.ingredients.length; i++) {
            let ingredient = splitText(cleanText(oneRecipe.ingredients[i].ingredient)) ;
            for (let j = 0; j < ingredient.length; j++) {
                allIngredients.push(ingredient[j]) ;
            }
        }

        return allIngredients;
    }

    formatDescription(oneRecipe){
        let description = splitText(cleanText(oneRecipe.description)) ;

        return description ;
    }

    defineScore(userSearch, oneRecipe){
        let recipeScore = 0 ;
        let recipeName = this.formatName(oneRecipe) ;
        let recipeIngredients = this.formatIngredients(oneRecipe) ;
        let recipeDescription = this.formatDescription(oneRecipe) ;

        let nameScore = arrayMatch(recipeName, userSearch) * 5 ;
        /*if (nameScore > 0){console.log(recipeName, "name score", nameScore)}*/
        let ingredientScore = arrayMatch(recipeIngredients, userSearch) * 0.2  ;
        /*if (ingredientScore > 0){console.log(recipeName, "ingredient score", ingredientScore)}*/
        let descriptionScore = arrayMatch(recipeDescription, userSearch) * 0 ;
        /*if (descriptionScore > 0){console.log(recipeName, "description score", descriptionScore)}*/

        recipeScore =  nameScore + ingredientScore + descriptionScore ;

        oneRecipe.recipeScore = recipeScore ;

        /*if (oneRecipe.recipeScore > 0){console.log("recipeTotal score", oneRecipe.recipeScore)}*/

        return oneRecipe ;
    }

    getMatchedRecipes(userInput){
        let matchedRecipes = [] ;
        let allRecipes = this.getAllRecipes() ;

        for (let i = 0; i < allRecipes.length; i++) {
            let recipeScore = this.defineScore(userInput, allRecipes[i]) ;
            if (recipeScore.recipeScore >= 1){
                matchedRecipes.push(allRecipes[i]) ;
            }
        }

        return matchedRecipes.sort((a,b) => {
            return b.recipeScore - a.recipeScore ;
        }) ;
    }

    getMatchedRecipesByIngredient(userSearch){

        let matchRecipesByIngredient = [] ;
        let allRecipes = this.getAllRecipes() ;

        for (let i = 0; i < allRecipes.length; i++) {
            for (let j = 0; j < allRecipes[i].ingredients.length; j++) {
                let ingredient = cleanText(allRecipes[i].ingredients[j].ingredient) ;

                if (searchTextPattern(ingredient, userSearch)){
                    if (!matchRecipesByIngredient.includes(allRecipes[i])){
                        matchRecipesByIngredient.push(allRecipes[i]) ;
                    }
                }
            }
        }

        return matchRecipesByIngredient ;
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

    getAllUtensils(allMatchedRecipes){
        let allUtensils = [] ;

        for (let i = 0; i < allMatchedRecipes.length; i++) {
            for (let j = 0; j < allMatchedRecipes[i].utensils.length; j++) {
                allUtensils.push(allMatchedRecipes[i].utensils[j]) ;
            }
        }

        let allUtensilsWithoutDuplicates = removeDuplicatesFromArray(allUtensils) ;

        return allUtensilsWithoutDuplicates ;
    }
}