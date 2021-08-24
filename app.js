"use strict"

import {recipes} from "./src/api/recipes.js";
import {Model} from "./src/js/Models/Model.js";
import {View} from "./src/js/View.js";
import {Controller} from "./src/js/Controller.js";

let model = new Model(recipes) ;
let view = new View() ;
let controller = new Controller(model, view) ;


let app = controller ;

app.displayHomePage()



