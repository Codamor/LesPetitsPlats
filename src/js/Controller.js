"use strict"

export class Controller{
    constructor(model, view) {
        this._model = model ;
        this._view = view ;
    }

    displayHomePage(){
        let allRecipes = this._model.getAllRecipesFromAPI() ;
        let matchedIngredientsWithRecipes = this._model.getAllIngredients(allRecipes) ;
        let matchedDevicesWithRecipes = this._model.getAllDevices(allRecipes) ;
        let matchedUtensilsWithRecipes = this._model.getAllUtensils(allRecipes) ;

        this._view.displayRecipes(allRecipes) ;
        this._view.displayTagsList(matchedIngredientsWithRecipes, "ingredient") ;
        this._view.displayTagsList(matchedDevicesWithRecipes, "device") ;
        this._view.displayTagsList(matchedUtensilsWithRecipes, "utensil") ;

        this._view.onSearch(this.searchRecipes) ;
        this._view.onTags(this.filterRecipesByTag) ;
        this._view.onFilterTagsIcon(this.filterRecipesByTag) ;
    }

    searchRecipes = (userSearch, searchType) => {
        let matchedRecipesWithUserSearch = this._model.searchRecipesOnApi(userSearch, searchType) ;

        if (matchedRecipesWithUserSearch.length === 0){
            this._view.enableNoSearchResultsMessage() ;
        } else {
            this._view.disableNoSearchResultsMessage() ;
        }

        this._view.displayRecipes(matchedRecipesWithUserSearch) ;

        let matchedIngredientsWithRecipes = this._model.getAllIngredients(matchedRecipesWithUserSearch) ;
        let matchedDevicesWithRecipes = this._model.getAllDevices(matchedRecipesWithUserSearch) ;
        let matchedUtensilsWithRecipes = this._model.getAllUtensils(matchedRecipesWithUserSearch) ;

        this._view.displayTagsList(matchedIngredientsWithRecipes, "ingredient") ;
        this._view.displayTagsList(matchedDevicesWithRecipes, "device") ;
        this._view.displayTagsList(matchedUtensilsWithRecipes, "utensil") ;

        this._view.onTags(this.filterRecipesByTag) ;
        this._view.onFilterTagsIcon(this.filterRecipesByTag) ;

    }

    filterRecipesByTag = () => {

        let allUserSelectedTags = this._view.getDisplayedUserSelectedTags() ;
        let allRecipesId = this._view.getDisplayedRecipesId() ;

        let recipesIDToEnable = this._model.getRecipesIDMatchedWithAllTags(allUserSelectedTags, allRecipesId) ;
        let recipesIDToDisable = [] ;

        let recipesToDisplay = this._model.getRecipesByIdList(recipesIDToEnable) ;
        let matchedIngredientsWithRecipes = this._model.getAllIngredients(recipesToDisplay) ;
        let matchedDevicesWithRecipes = this._model.getAllDevices(recipesToDisplay) ;
        let matchedUtensilsWithRecipes = this._model.getAllUtensils(recipesToDisplay) ;

        this._view.filterDisplayedRecipesBySelectedTags(allRecipesId, recipesIDToEnable, recipesIDToDisable) ;

        this._view.displayTagsList(matchedIngredientsWithRecipes, "ingredient") ;
        this._view.displayTagsList(matchedDevicesWithRecipes, "device") ;
        this._view.displayTagsList(matchedUtensilsWithRecipes, "utensil") ;

        this._view.onTags(this.filterRecipesByTag) ;
        this._view.onFilterTagsIcon(this.filterRecipesByTag) ;
    }
}