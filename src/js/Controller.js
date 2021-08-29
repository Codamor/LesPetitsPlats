"use strict"

export class Controller{
    constructor(model, view) {
        this._model = model ;
        this._view = view ;
    }

    displayHomePage(){
        let recipesList = this._model.getAllRecipes() ;

        let matchedIngredients = this._model.getAllIngredients(recipesList) ;
        let matchedDevices = this._model.getAllDevices(recipesList) ;

        this._view.displayRecipes(recipesList) ;

        this._view.onSearch(this.handleSearchRecipe) ;
        this._view.onSubmit(this.handleSearchRecipe) ;
    }

    handleSearchRecipe = (userInput) => {

        let matchedRecipes = this._model.getMatchedRecipes(userInput) ;
        let matchedIngredients = this._model.getAllIngredients(matchedRecipes) ;
        let matchedDevices = this._model.getAllDevices(matchedRecipes) ;
        let matchedUstensils = this._model.getAllUstensils(matchedRecipes) ;

        this._view.displayRecipes(matchedRecipes) ;

        this._view.displayTagsList(matchedIngredients, "ingredients") ;
        this._view.displayTagsList(matchedDevices, "devices") ;
        this._view.displayTagsList(matchedUstensils, "ustensils") ;
    }
}