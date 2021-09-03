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

        this._view.onSearchBar(this.searchRecipes) ;
        this._view.onSubmitButton(this.searchRecipes) ;
        this._view.onTags(this.filterRecipesByTag) ;

        this._view.onFiltersInput() ;


    }

    searchRecipes = (userSearch) => {
        let matchedRecipesWithSearch = this._model.searchRecipesOnApi(userSearch) ;
        let matchedIngredientsWithRecipes = this._model.getAllIngredients(matchedRecipesWithSearch) ;
        let matchedDevicesWithRecipes = this._model.getAllDevices(matchedRecipesWithSearch) ;
        let matchedUtensilsWithRecipes = this._model.getAllUtensils(matchedRecipesWithSearch) ;

        this._view.displayRecipes(matchedRecipesWithSearch) ;

        this._view.displayTagsList(matchedIngredientsWithRecipes, "ingredient") ;
        this._view.displayTagsList(matchedDevicesWithRecipes, "device") ;
        this._view.displayTagsList(matchedUtensilsWithRecipes, "utensil") ;
        this._view.onTags(this.filterRecipesByTag) ;

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


        this._view.filterRecipesByTags(allRecipesId, recipesIDToEnable, recipesIDToDisable) ;

        this._view.displayTagsList(matchedIngredientsWithRecipes, "ingredient") ;
        this._view.displayTagsList(matchedDevicesWithRecipes, "device") ;
        this._view.displayTagsList(matchedUtensilsWithRecipes, "utensil") ;

        this._view.onFilterTagsIcon(this.filterRecipesByTag) ;
        this._view.onTags(this.filterRecipesByTag) ;
    }
}