"use strict"

import {Recipe} from "./Recipe.js";
import {cleanText, splitText} from "../helpers.js";

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
        let name = [] ;
        name.push(splitText(cleanText(recipe._name))) ;

        return name ;
    }

    getNormalizedIngredientsFromRecipe(recipe) {

        let allIngredients = [];

        for (let i = 0; i < recipe.ingredients.length; i++) {
            allIngredients.push(cleanText(recipe.ingredients[i].ingredient)) ;
        }

        return allIngredients;
    }

    getNormalizedDescriptionFromRecipe(recipe){
        let description = [] ;
        description.push(splitText(cleanText(recipe.description))) ;

        return description ;
    }
}