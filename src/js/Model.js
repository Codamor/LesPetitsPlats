"use strict"

import {Recipe} from "./Entity/Recipe.js";
import {
    cleanText,
    removeDuplicatesFromArray,
    splitText, compareUserSearchWithDataTwo
} from "./helpers.js";

export class Model{

    constructor(db) {
        this._db = db ;
    }

    getAllRecipesFromAPI(){
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

    getRecipeById(recipeId){
        let allRecipes = this.getAllRecipesFromAPI() ;

        for (let i = 0; i < allRecipes.length; i++) {
            if (allRecipes[i].id === recipeId){
                return allRecipes[i] ;
            }
        }
    }

    getRecipesByIdList(idList){
        let allRecipes = this.getAllRecipesFromAPI() ;
        let recipesByIdList = [] ;

        for (let i = 0; i < allRecipes.length; i++) {
            for (let j = 0; j < idList.length; j++) {
                if (Number(allRecipes[i].id) === idList[j]){
                    recipesByIdList.push(allRecipes[i]) ;
                }
            }
        }
        return recipesByIdList ;
    }

    searchRecipesOnApi(userSearch, searchType){ //TODO refactor userSearch
        let matchedRecipes = [] ;
        let allRecipes = this.getAllRecipesFromAPI() ;

        for (let i = 0; i < allRecipes.length; i++) {
            let recipeScore = this.defineRecipeScore(userSearch, searchType, allRecipes[i]) ;
            if (recipeScore.recipeScore > 0){
                matchedRecipes.push(allRecipes[i]) ;
            }
        }

        return this.sortRecipes("score", matchedRecipes) ;
    }

    defineRecipeScore(userSearch, searchType, oneRecipe){
        if (searchType === "global"){

            return this.defineRecipeGlobalScore(userSearch, oneRecipe) ;

        } else if (searchType === "ingredient"){  //see View onFilters input listener to activate search by Tag

            return this.defineRecipeIngredientScore(userSearch, oneRecipe) ;

        } else if (searchType === "device"){

            return this.defineRecipeDeviceScore(userSearch, oneRecipe) ;

        } else if (searchType === "utensil"){

            return this.defineRecipeUtensilScore(userSearch, oneRecipe) ;
        }
    }

    defineRecipeGlobalScore(userSearch, oneRecipe){
        let recipeScore = 0 ;
        let recipeName = this.formatName(oneRecipe) ;
        let recipeIngredients = this.formatIngredients(oneRecipe) ;
        let recipeDescription = this.formatDescription(oneRecipe) ;

        let nameScore = compareUserSearchWithDataTwo(recipeName, userSearch) ;
        let ingredientScore = compareUserSearchWithDataTwo(recipeIngredients, userSearch) ;
        let descriptionScore = compareUserSearchWithDataTwo(recipeDescription, userSearch) ;

        recipeScore =  nameScore + ingredientScore  ;

        oneRecipe.recipeScore = recipeScore ;

        return oneRecipe ;
    }

    defineRecipeIngredientScore(userSearch, oneRecipe){
        let recipeIngredients = this.formatIngredients(oneRecipe) ;
        let ingredientScore = compareUserSearchWithDataTwo(recipeIngredients, userSearch) ;

        oneRecipe.recipeScore = ingredientScore ;

        return oneRecipe ;
    }

    defineRecipeDeviceScore(userSearch, oneRecipe){
        let recipeDevice = this.formatDevice(oneRecipe) ;
        let deviceScore = compareUserSearchWithDataTwo(recipeDevice, userSearch) ;

        oneRecipe.recipeScore = deviceScore ;

        return oneRecipe ;
    }

    defineRecipeUtensilScore(userSearch, oneRecipe){
        let recipeUtensils = this.formatUtensils(oneRecipe) ;
        let utensilScore = compareUserSearchWithDataTwo(recipeUtensils, userSearch) ;

        oneRecipe.recipeScore = utensilScore ;

        return oneRecipe ;
    }

    sortRecipes(sortType, recipesArray){
        if(sortType === "score"){
            recipesArray.sort((a,b) => {
                return b.recipeScore - a.recipeScore ;
            }) ;

            return recipesArray ;
        }
    }

    getRecipesIDMatchedWithAllTags(allUserSelectedTags, displayedRecipesId){
        let matchedRecipesId = [] ;

        for (let i = 0; i < displayedRecipesId.length; i++) {

            if (this.isRecipeHasAllTags(displayedRecipesId[i], allUserSelectedTags) === true){
                matchedRecipesId.push(displayedRecipesId[i]) ;
            };
        }

        return matchedRecipesId ;
    }


    isRecipeHasAllTags(recipeId, allUserSelectedTags){
        for (let i = 0; i < allUserSelectedTags.length; i++) {
            let tagType = allUserSelectedTags[i].tagType ;
            let tagValue = allUserSelectedTags[i].tagValue ;

            if (!this.isRecipeHasTag(recipeId, tagType, tagValue)) {
                return false;
            }
        }
        return true ;
    }

    isRecipeHasTag(recipeId, tagType, oneUserSelectedTag){
        let recipe = this.getRecipeById(recipeId) ;

        if (tagType === "ingredient"){
            for (let i = 0; i < recipe.ingredients.length; i++) {
                let recipeIngredient = cleanText(recipe.ingredients[i].ingredient) ; //TODO rename cleanText => formatText
                if (recipeIngredient === oneUserSelectedTag){
                    return true ;
                }
            }

        } else if (tagType === "device"){
            let recipeDevice = cleanText(recipe.appliance) ;
            if (recipeDevice === oneUserSelectedTag){
                return true ;
            }

        } else if (tagType === "utensil"){
            for (let i = 0; i < recipe.utensils.length; i++) {
                let recipeUtensil = cleanText(recipe.utensils[i]) ;
                if (recipeUtensil === oneUserSelectedTag){
                    return true ;
                }
            }
        }

        return false ;
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


    formatName(oneRecipe){
        let name = cleanText(oneRecipe._name) ;

        return name ;
    }

    formatIngredients(oneRecipe) {
        let allIngredients = "";

        for (let i = 0; i < oneRecipe.ingredients.length; i++) {
            let ingredient = cleanText(oneRecipe.ingredients[i].ingredient) ;
            allIngredients += `${ingredient} ` ;
        }

        return allIngredients;
    }

    formatDescription(oneRecipe){
        let description = cleanText(oneRecipe.description) ;

        return description ;
    }

    formatDevice(oneRecipe){
        let device = splitText(cleanText(oneRecipe.appliance)) ;

        return device ;
    }

    formatUtensils(oneRecipe){
        let allUtensils = [] ;

        for (let i = 0; i < oneRecipe.utensils.length; i++) {
            let utensil = splitText(cleanText(oneRecipe.utensils[i])) ;
            allUtensils.push(utensil) ;
        }

        return allUtensils ;
    }
}