"use strict"

export class Controller{
    constructor(model, view) {
        this._model = model ;
        this._view = view ;
    }

    displayHomePage(){
        let allRecipes = this._model.getAllRecipes() ;
        this._view.displayAllRecipes(allRecipes) ;
    }

}