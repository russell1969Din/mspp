//SK: Importovanie tried so syst�mov�mi met�dami
//EN: Importing classes with system methods 
import {DomLevels} from "../srcRoot/domLevels.js";
import {System} from "../srcRoot/system.js";
//SK: Import triedy s u��vate�sk�mi funkciami pre tag input
//EN: Import a class with custom functions for the input tag 
import {InputTextUsr} from "../srcUserObjects/inputText.usr.js";

//SK: Na��tanie pr�slu�n�ho kask�dov�ho �t�lu  pre tag input 
//EN: Load the appropriate cascading style for the input tag 
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/inputText.css" />');   
    
export class InputText  {  

    //SK: V r�mci kon�truktora na��tame parametre pre aktu�lnu triedu
    //EN: Within the constructor, we load the parameters for the current class 
    constructor(data={}, container={}, otherParams={}) {
         this.doConstruct(data, container, otherParams);    
    }

    //SK: Met�da triedy pre na��tanie v�eobecn�ch parametrov
    //EN: Class method for retrieving general parameters 
    doConstruct(data={}, container={}, otherParams={}) {
        if( Object.keys(container).length > 0) {
            for(let key of Object.keys(container)) {eval('this.' + key + ' = container.' + key + ';')}
        }
        this.container = container; 
    }
    
    //SK: Zobrazenie  vstupu s pr�slu�enstvom tag input
    //EN: Display input with the tag input accessory
    execRender() {
        //SK: Priprava unik�tneho ID pre vstup a u��vate�skej funckcie pre kontrolu vstupu
        //EN: Preparation of a unique ID for entry and user function for access control 
        var userFun = this.userFun;
        var tagID = this.tagID;
        var bgColor = this.bgColor;
        //SK: Zobrazenie tag input 
        //EN: Display the input tag 
        $('#mspp-workbanch').append('<div id="dateText">'+this.titleForInput+'</div>');
        $('#mspp-workbanch').append('<div id="spaceInput"><input type="text" id="'+this.tagID+'"  /></div>');        
        //SK Ak vst�pime do v�eobecneho tag input a vyp��ame ho ...
        //EN If we enter the general input tag and fill it in ...  
        $('#'+this.tagID).keyup(function() {
            //SK Zist�me �i tag input m� deklarovan� u��vate�sk� funkciu ...
            //EN We will find out whether the input tag has a declared user function ... 
            if(typeof InputTextUsr == 'function') {
                //SK Zist�me �i n�zov u��vate�skej funkcie pre tag input nie je pr�zdny re�azec ...
                //EN We will determine if the user function name for the input tag is not an empty string ...  
                if(undefinedIs(userFun).length>0)  {
                    let inputTextUsr = new InputTextUsr();
                    //SK Zavol�me u��vate�sk� funkciu pre tag input 
                    //EN We call the user function for the input tag  
                    eval('inputTextUsr.'+userFun+'("'+tagID+'")');
                }
            }
        });        
    } 
    
}    