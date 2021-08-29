"use strict"
export class Recipe{
    constructor(id, name, servings, ingredients, time,
                description, appliance, utensils) {

        this._id = id ;
        this._name = name ;
        this._servings = servings ;
        this._ingredients = ingredients ;
        this._time = time ;
        this._description = description ;
        this._appliance = appliance ;
        this._utensils = utensils ;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get servings() {
        return this._servings;
    }

    set servings(value) {
        this._servings = value;
    }

    get ingredients() {
        return this._ingredients;
    }

    set ingredients(value) {
        this._ingredients = value;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get appliance() {
        return this._appliance;
    }

    set appliance(value) {
        this._appliance = value;
    }

    get utensils() {
        return this._utensils;
    }

    set utensils(value) {
        this._utensils = value;
    }
}


