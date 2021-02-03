//SK Importovanie objektu triedy DomLevels pre prácu s DOM
//EN Importing a DomLevels object to work with the DOM 
import {DomLevels} from "./domLevels.js";
//SK Importovanie objektu triedy s riešením zadania od MSPP
//EN Importing a class object with an assignment solution from MSPP 
import {Mspp} from "../srcTemp/mspp/mspp.src.js";

let domLevels = new DomLevels();
//SK Naèítame šablónu so službami za úèelom zobrazenia zadania od MSPP 
//EN We are loading a service template to display the input from MSPP 
domLevels.loadTemplate('mspp', 'workSpace_general', new Mspp());     

