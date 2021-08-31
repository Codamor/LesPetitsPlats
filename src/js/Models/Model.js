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

    getRecipes(userSearch){ //TODO refactor userSearch
        let matchedRecipes = [] ;
        let allRecipes = this.getAllRecipes() ;

        for (let i = 0; i < allRecipes.length; i++) {
            let recipeScore = this.defineRecipeScore(userSearch, allRecipes[i]) ;
            if (recipeScore.recipeScore > 0){
                matchedRecipes.push(allRecipes[i]) ;
            }
        }

        return this.sortRecipesByScore(matchedRecipes) ;
    }

    getRecipesByTag(userTag, tagType){

        console.log(userTag)

        let allRecipes = this.getAllRecipes() ;

        if (tagType ==="ingredient"){
            return this.getRecipesByIngredient(userTag) ;

        } else if (tagType === "device"){
            return this.getRecipesByDevice(userTag) ;

        } else if (tagType === "utensil"){
            return this.getRecipesByUtensil(userTag) ;
        }
    }

    getRecipesByIngredient(ingredient){
        let allRecipes = this.getAllRecipes() ;
        let matchRecipesByTag = [] ;

        for (let i = 0; i < allRecipes.length; i++) {
            for (let j = 0; j < allRecipes[i].ingredients.length; j++) {
                let recipeIngredient = cleanText(allRecipes[i].ingredients[j].ingredient) ;

                if (searchTextPattern(recipeIngredient, ingredient)){
                    if (!matchRecipesByTag.includes(allRecipes[i])){
                        matchRecipesByTag.push(allRecipes[i]) ;
                    }
                }
            }
        }
        return matchRecipesByTag ;
    }

    getRecipesByDevice(device){
        let allRecipes = this.getAllRecipes() ;
        let matchedRecipes = [] ;

        for (let i = 0; i < allRecipes.length; i++) {
            let recipeDevice = cleanText(allRecipes[i].appliance) ;
            if (searchTextPattern(recipeDevice, device)){
                if (!matchedRecipes.includes(allRecipes[i])){
                    matchedRecipes.push(allRecipes[i]) ;
                }
            }
        }
        return matchedRecipes ;
    }

    getRecipesByUtensil(utensil){
        let allRecipes = this.getAllRecipes() ;
        let matchedRecipes = [] ;

        for (let i = 0; i < allRecipes.length; i++) {
            for (let j = 0; j < allRecipes[i].utensils.length; j++) {
                let recipeUtensil = cleanText(allRecipes[i].utensils[j]) ;
                if (searchTextPattern(recipeUtensil, utensil)){
                    if (!matchedRecipes.includes(allRecipes[i])){
                        matchedRecipes.push(allRecipes[i]) ;
                    }
                }
            }
        }
        return matchedRecipes ;
    }

    getRecipesId(recipesList){
        let recipesId = [] ;

        for (let i = 0; i < recipesList.length; i++) {
            recipesId.push(recipesList[i].id) ;
        }
        return recipesId ;
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

    defineRecipeScore(userSearch, oneRecipe){
        let recipeScore = 0 ;
        let recipeName = this.formatName(oneRecipe) ;
        let recipeIngredients = this.formatIngredients(oneRecipe) ;
        let recipeDescription = this.formatDescription(oneRecipe) ;

        let nameScore = arrayMatch(recipeName, userSearch) * 3 ;
        let ingredientScore = arrayMatch(recipeIngredients, userSearch) * 0.2  ;
        let descriptionScore = arrayMatch(recipeDescription, userSearch) ;

        recipeScore =  nameScore + ingredientScore  ;

        oneRecipe.recipeScore = recipeScore ;

        return oneRecipe ;
    }

    sortRecipesByScore(recipesArray){
        recipesArray.sort((a,b) => {
            return b.recipeScore - a.recipeScore ;
        }) ;

        return recipesArray ;
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

        return allMatchedIngredientsWithoutDuplicates.sort() ;
    }

    getAllDevices(allMatchedRecipes){
        let matchedDevices = [] ;

        for (let i = 0; i < allMatchedRecipes.length; i++) {
            matchedDevices.push(allMatchedRecipes[i].appliance) ;
        }

        let allMatchedDevicesWithoutDuplicates = removeDuplicatesFromArray(matchedDevices) ;

        return allMatchedDevicesWithoutDuplicates.sort() ;
    }

    getAllUtensils(allMatchedRecipes){
        let allUtensils = [] ;

        for (let i = 0; i < allMatchedRecipes.length; i++) {
            for (let j = 0; j < allMatchedRecipes[i].utensils.length; j++) {
                allUtensils.push(allMatchedRecipes[i].utensils[j]) ;
            }
        }

        let allUtensilsWithoutDuplicates = removeDuplicatesFromArray(allUtensils) ;

        return allUtensilsWithoutDuplicates.sort() ;
    }
}