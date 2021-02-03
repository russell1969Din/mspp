//SK Objekt triedy InputText s užívate¾skými funkciami
//EN An InputText object with custom functions  
export class InputTextUsr  { 
    constructor() {}
    
    //SK Ošetrenie všeobecného tag input vo formulári
    //EN Treatment of general tag input in the form 
    mailValid(tagID) {
        //SK Nastavenie regulárneho výrazu pre ošetrenie vstupu s formátom e-mail adresy
        //EN Set a regular expression to handle e-mail address format input  
        let regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
        //SK Ak formát vstupu súhlasí s regulárnym výrazom
        //EN If the input format matches a regular expression  
        if(regMail.test($('#'+tagID).val())) 
            //SK Pozadie tag input sa sfarbí na pôvodnú farbu
            //EN The background of the input tag is colored to the original color  
            $('#'+tagID).css('background-color','#fff');
        else
            //SK Pozadie sa sfarbí na inú farbu, aby bolo zrejmé že sa jedná o chybu
            //EN The background is colored in a different color to indicate that this is a mistake  
            $('#'+tagID).css('background-color','#ffbbc4');
    }
}