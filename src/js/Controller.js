"use strict"

import {userSelectedTags} from "./helpers.js";

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

        this._view.onSearch(this.displaySearchResults)
        this._view.onTags(this.filterRecipesByTag) ;
        this._view.onFiltersInput() ;

    }

    displaySearchResults = (userSearch, searchType) => {
        userSelectedTags.innerHTML = "" ;

        let userSearchLength = userSearch.join("").length

        if (userSearchLength < 3 ){
            this.displayDefaultsResults() ;

        } else {
            this.searchRecipes(userSearch, searchType) ;
        }

        this._view.onTags(this.filterRecipesByTag) ;
        this._view.onFiltersInput() ;
    }

    displayDefaultsResults(){
        let allRecipes = this._model.getAllRecipesFromAPI() ;
        let matchedIngredientsWithRecipes = this._model.getAllIngredients(allRecipes) ;
        let matchedDevicesWithRecipes = this._model.getAllDevices(allRecipes) ;
        let matchedUtensilsWithRecipes = this._model.getAllUtensils(allRecipes) ;

        this._view.displayRecipes(allRecipes) ;
        this._view.displayTagsList(matchedIngredientsWithRecipes, "ingredient") ;
        this._view.displayTagsList(matchedDevicesWithRecipes, "device") ;
        this._view.displayTagsList(matchedUtensilsWithRecipes, "utensil") ;
    }

    searchRecipes(userSearch, searchType){
        let matchedRecipesWithUserSearch = this._model.searchRecipesOnApi(userSearch, searchType) ;

        if (matchedRecipesWithUserSearch.length === 0){
            this._view.enableNoSearchResultsMessage() ;

        } else {
            let matchedIngredientsWithRecipes = this._model.getAllIngredients(matchedRecipesWithUserSearch) ;
            let matchedDevicesWithRecipes = this._model.getAllDevices(matchedRecipesWithUserSearch) ;
            let matchedUtensilsWithRecipes = this._model.getAllUtensils(matchedRecipesWithUserSearch) ;

            this._view.disableNoSearchResultsMessage() ;
            this._view.displayRecipes(matchedRecipesWithUserSearch) ;
            this._view.displayTagsList(matchedIngredientsWithRecipes, "ingredient") ;
            this._view.displayTagsList(matchedDevicesWithRecipes, "device") ;
            this._view.displayTagsList(matchedUtensilsWithRecipes, "utensil") ;
        }
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

        this._view.filterRecipesBySelectedTags(allRecipesId, recipesIDToEnable, recipesIDToDisable) ;

        this._view.displayTagsList(matchedIngredientsWithRecipes, "ingredient") ;
        this._view.displayTagsList(matchedDevicesWithRecipes, "device") ;
        this._view.displayTagsList(matchedUtensilsWithRecipes, "utensil") ;

        this._view.onTags(this.filterRecipesByTag) ;
        this._view.onFilterTagsIcon(this.filterRecipesByTag) ;
    }
}