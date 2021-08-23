"use strict"


import {Model} from "./src/js/Models/Model.js";
import {View} from "./src/js/View.js";
import {Controller} from "./src/js/Controller.js";

let model = new Model("/src/api/recipes.js") ;
let view = new View() ;


let app = new Controller(model, view) ;





