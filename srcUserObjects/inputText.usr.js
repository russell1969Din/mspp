//SK Objekt triedy InputText s u��vate�sk�mi funkciami
//EN An InputText object with custom functions  
export class InputTextUsr  { 
    constructor() {}
    
    //SK O�etrenie v�eobecn�ho tag input vo formul�ri
    //EN Treatment of general tag input in the form 
    mailValid(tagID) {
        //SK Nastavenie regul�rneho v�razu pre o�etrenie vstupu s form�tom e-mail adresy
        //EN Set a regular expression to handle e-mail address format input  
        let regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
        //SK Ak form�t vstupu s�hlas� s regul�rnym v�razom
        //EN If the input format matches a regular expression  
        if(regMail.test($('#'+tagID).val())) 
            //SK Pozadie tag input sa sfarb� na p�vodn� farbu
            //EN The background of the input tag is colored to the original color  
            $('#'+tagID).css('background-color','#fff');
        else
            //SK Pozadie sa sfarb� na in� farbu, aby bolo zrejm� �e sa jedn� o chybu
            //EN The background is colored in a different color to indicate that this is a mistake  
            $('#'+tagID).css('background-color','#ffbbc4');
    }
}