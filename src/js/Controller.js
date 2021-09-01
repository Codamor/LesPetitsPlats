"use strict"

export class Controller{
    constructor(model, view) {
        this._model = model ;
        this._view = view ;
    }

    displayHomePage(){
        let allRecipes = this._model.getAllRecipes() ;
        let matchedIngredients = this._model.getAllIngredients(allRecipes) ;
        let matchedDevices = this._model.getAllDevices(allRecipes) ;
        let matchedUtensils = this._model.getAllUtensils(allRecipes) ;

        this._view.displayRecipes(allRecipes) ;
        this._view.displayTagsList(matchedIngredients, "ingredient") ;
        this._view.displayTagsList(matchedDevices, "device") ;
        this._view.displayTagsList(matchedUtensils, "utensil") ;

        this._view.onSearchBar(this.handleSearchRecipe) ;
        this._view.onSubmitButton(this.handleSearchRecipe) ;
        this._view.onTags(this.handlerTags) ;


    }

    handleSearchRecipe = (userSearch) => {
        let matchedRecipes = this._model.getRecipes(userSearch) ;
        let matchedIngredients = this._model.getAllIngredients(matchedRecipes) ;
        let matchedDevices = this._model.getAllDevices(matchedRecipes) ;
        let matchedUtensils = this._model.getAllUtensils(matchedRecipes) ;

        this._view.displayRecipes(matchedRecipes) ;

        this._view.displayTagsList(matchedIngredients, "ingredient") ;
        this._view.displayTagsList(matchedDevices, "device") ;
        this._view.displayTagsList(matchedUtensils, "utensil") ;

        this._view.onTags(this.handlerTags) ;

    }

    handlerTags = () => {

        let allUserSelectedTags = this._view.getDisplayedUserSelectedTags() ;
        let allRecipesId = this._view.getDisplayedRecipesId() ;
        let recipesToEnable = this._model.getRecipesIDMatchedWithAllTags(allUserSelectedTags, allRecipesId) ;
        let recipesToDisable = [] ;

        for (let i = 0; i < allRecipesId.length; i++) {
            if(!recipesToEnable.includes(allRecipesId[i])){
                recipesToDisable.push(allRecipesId[i]) ;
            }
        }

        for (let i = 0; i < recipesToEnable.length; i++) {
            this._view.enableRecipe(recipesToEnable[i]) ;
        }

        for (let i = 0; i < recipesToDisable.length; i++) {
            this._view.disableRecipe(recipesToDisable[i]) ;
        }

        this._view.onFilterTagsIcon(this.handlerTags) ;
    }
}