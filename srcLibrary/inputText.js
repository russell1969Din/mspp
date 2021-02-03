//SK: Importovanie tried so systémovými metódami
//EN: Importing classes with system methods 
import {DomLevels} from "../srcRoot/domLevels.js";
import {System} from "../srcRoot/system.js";
//SK: Import triedy s užívate¾skými funkciami pre tag input
//EN: Import a class with custom functions for the input tag 
import {InputTextUsr} from "../srcUserObjects/inputText.usr.js";

//SK: Naèítanie príslušného kaskádového štýlu  pre tag input 
//EN: Load the appropriate cascading style for the input tag 
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/inputText.css" />');   
    
export class InputText  {  

    //SK: V rámci konštruktora naèítame parametre pre aktuálnu triedu
    //EN: Within the constructor, we load the parameters for the current class 
    constructor(data={}, container={}, otherParams={}) {
         this.doConstruct(data, container, otherParams);    
    }

    //SK: Metóda triedy pre naèítanie všeobecných parametrov
    //EN: Class method for retrieving general parameters 
    doConstruct(data={}, container={}, otherParams={}) {
        if( Object.keys(container).length > 0) {
            for(let key of Object.keys(container)) {eval('this.' + key + ' = container.' + key + ';')}
        }
        this.container = container; 
    }
    
    //SK: Zobrazenie  vstupu s príslušenstvom tag input
    //EN: Display input with the tag input accessory
    execRender() {
        //SK: Priprava unikátneho ID pre vstup a užívate¾skej funckcie pre kontrolu vstupu
        //EN: Preparation of a unique ID for entry and user function for access control 
        var userFun = this.userFun;
        var tagID = this.tagID;
        var bgColor = this.bgColor;
        //SK: Zobrazenie tag input 
        //EN: Display the input tag 
        $('#mspp-workbanch').append('<div id="dateText">'+this.titleForInput+'</div>');
        $('#mspp-workbanch').append('<div id="spaceInput"><input type="text" id="'+this.tagID+'"  /></div>');        
        //SK Ak vstúpime do všeobecneho tag input a vypåòame ho ...
        //EN If we enter the general input tag and fill it in ...  
        $('#'+this.tagID).keyup(function() {
            //SK Zistíme èi tag input má deklarovanú užívate¾skú funkciu ...
            //EN We will find out whether the input tag has a declared user function ... 
            if(typeof InputTextUsr == 'function') {
                //SK Zistíme èi názov užívate¾skej funkcie pre tag input nie je prázdny reazec ...
                //EN We will determine if the user function name for the input tag is not an empty string ...  
                if(undefinedIs(userFun).length>0)  {
                    let inputTextUsr = new InputTextUsr();
                    //SK Zavoláme užívate¾skú funkciu pre tag input 
                    //EN We call the user function for the input tag  
                    eval('inputTextUsr.'+userFun+'("'+tagID+'")');
                }
            }
        });        
    } 
    
}    