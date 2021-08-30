"use strict"

export class Controller{
    constructor(model, view) {
        this._model = model ;
        this._view = view ;
    }

    displayHomePage(){
        let recipesList = this._model.getAllRecipes() ;

        /*let matchedIngredients = this._model.getAllIngredients(recipesList) ; //TODO ask if it's good to see all tags in default homePage
        let matchedDevices = this._model.getAllDevices(recipesList) ;*/

        this._view.displayRecipes(recipesList) ;

        this._view.onSearchBar(this.handleSearchRecipe) ;
        this._view.onSubmitButton(this.handleSearchRecipe) ;
        this._view.onIngredientsInput(this.handleSearchByIngredient) ;

    }

    handleSearchRecipe = (userSearch) => {

        let matchedRecipes = this._model.getMatchedRecipes(userSearch) ;
        let matchedIngredients = this._model.getAllIngredients(matchedRecipes) ;
        let matchedDevices = this._model.getAllDevices(matchedRecipes) ;
        let matchedUtensils = this._model.getAllUtensils(matchedRecipes) ;

        this._view.displayRecipes(matchedRecipes) ;

        this._view.displayTagsList(matchedIngredients, "ingredients") ;
        this._view.displayTagsList(matchedDevices, "devices") ;
        this._view.displayTagsList(matchedUtensils, "utensils") ;

    }

    handleSearchByIngredient = (userSearch) => {
        let matchedRecipesByIngredient = this._model.getMatchedRecipesByIngredient(userSearch) ;

        this._view.displayRecipes(matchedRecipesByIngredient) ;
    }
}