//SK: Importovanie tried so syst�mov�mi met�dami 
//EN: Importing classes with system methods 
import {System} from "../../srcRoot/system.js";
import {DBController} from "../../srcRoot/dbController.js";  
//SK: Importovanie triedy pre zobrazenie formul�ra
//EN: Import a class to display a form
import {MsppForm} from "../../srcLibrary/msppForm.js";  



export class Mspp {

    //SK: V r�mci kon�truktora na��tame parametre pre aktu�lnu triedu
    //EN: Within the constructor, we load the parameters for the current class
    constructor(data, container, otherParams) { 
        this.doConstruct(data, container, otherParams);
    }
    
    //SK: Met�da triedy pre na��tanie v�eobecn�ch parametrov
    //EN: Class method for retrieving general parameters   
    doConstruct(data={}, container={}, otherParams={}) {
        this.data = data;
        if( Object.keys(container).length > 0) {
            for(let key of Object.keys(container)) {eval('this.' + key + ' = container.' + key + ';');}
        }

        if( Object.keys(otherParams).length > 0) {
            for(let key of Object.keys(otherParams)) eval('this.' + key + ' = otherParams.' + key + ';');
        }
    }

    //SK: Priame zobrazenie �abl�ny
    //EN: Direct view of the template
    renderTemplate() {
    
        let system = new System();
        system.cssFileRead('srcTemp/mspp', 'mspp'); //, '', true
        
        let otherParams = {'pathJSON': 'json/', 'tester':true, 'noCache':true};    
        let dbController = new DBController(    'general',
                                                otherParams);

        let container = {   'parentID':'mspp-workbanch',
                            'ID':'msppForm'
                        };
                                    
        //SK: Na��tanie obsahu �abl�ny bez pou�itia Contoller, nepotrebujeme d�ta alebo in� �daje zo servera  
        //EN: Loading the contents of the template without using Contoller, we do not need data or other data from the server
        dbController.read(new MsppForm(), container);
    }
}
