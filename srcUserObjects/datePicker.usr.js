//SK Objekt triedy DPicker s u��vate�sk�mi funkciami 
//EN DPicker class object with custom functions  
export class DPickerUser  { 

    constructor() {}   
    
    //SK O�etrenie tag input v ramci datepicker vo formul�ri
    //EN Treat the input tag within the datepicker in the form  
    inputValid(tagID) {
        //SK Nastavenie regul�rneho v�razu pre o�etrenie d�tumov�ho vstupu 
        //EN Set a regular expression to handle date input  
        let regDate = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
        //SK Ak form�t vstupu s�hlas� s regul�rnym v�razom 
        //EN If the input format matches a regular expression  
        if(regDate.test($('#'+tagID).val())) 
            //SK Pozadie tag input sa sfarb� na p�vodn� farbu
            //EN The background of the input tag is colored to the original color  
            $('#'+tagID).css('background-color','#fff');
        else
            //SK Pozadie sa sfarb� na in� farbu, aby bolo zrejm� �e sa jedn� o chybu 
            //EN The background is colored in a different color to indicate that this is a mistake  
            $('#'+tagID).css('background-color','#ffbbc4');
    }
    
}


