//SK: Importovanie tried so systémovými metódami 
//EN: Importing classes with system methods 
import {System} from "../../srcRoot/system.js";
import {DBController} from "../../srcRoot/dbController.js";  
//SK: Importovanie triedy pre zobrazenie formulára
//EN: Import a class to display a form
import {MsppForm} from "../../srcLibrary/msppForm.js";  



export class Mspp {

    //SK: V rámci konštruktora naèítame parametre pre aktuálnu triedu
    //EN: Within the constructor, we load the parameters for the current class
    constructor(data, container, otherParams) { 
        this.doConstruct(data, container, otherParams);
    }
    
    //SK: Metóda triedy pre naèítanie všeobecných parametrov
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

    //SK: Priame zobrazenie šablóny
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
                                    
        //SK: Naèítanie obsahu šablóny bez použitia Contoller, nepotrebujeme dáta alebo iné údaje zo servera  
        //EN: Loading the contents of the template without using Contoller, we do not need data or other data from the server
        dbController.read(new MsppForm(), container);
    }
}
