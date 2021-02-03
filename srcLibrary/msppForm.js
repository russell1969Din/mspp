//SK: Import tried pre zobrazenie požadovaných HTML elementov
//EN: Import classes to display the required HTML elements 
import {InputText} from "./inputText.js";
import {DPicker} from "./datePicker.js";  

export class MsppForm {

    constructor(data, container, otherParams) {}
    
    //SK: Vykreslenie celého formulára
    //EN: Render of the entire form 
    execRender(data={}, container={}, otherParams={}) {
    
        //SK: Deklarácia objektu s patrametrami pre tag input
        //EN: Object declaration with parameters for the input tag 
        container = {
                        //SK: Deklarácia názvu ID pre tag input
                        //EN: Declaration of the ID name for the input tag 
                        'tagID':'mailInput',
                        //SK: Výzva čo sa má do tag input vloziť
                        //EN: Prompt what to insert into the input tag 
                        'titleForInput':'Zadajte e-mail:&nbsp;',
                        //SK: Deklarácia užívateľskej funkcie pre tag input 
                        //EN: Declaration of user function for input tag 
                        'userFun':'mailValid',
                        //SK: Deklarácia základne farby pozadia pre tag input
                        //EN: Declaration of base background color for the input tag 
                        'bgColor':'#fff'};
        let inputText = new InputText({}, container);
        //SK: Volanie metódy pre vykreslenie tag input
        //EN: Call a method to render the input tag 
        inputText.execRender();
        
        //SK: Deklarácia objektu s patrametrami pre tag datePicker
        //EN: Object declaration with parameters for the datePicker tag 
        let date = new Date();
        container = {
            //SK: Deklarácia názvu ID pre tag input s datepicker
            //EN: Declaration of the ID name for the input tag with the datepicker
            'dateTagID':'dateInput',
            //SK: Výzva čo sa má do tag input v rámci datePicker vloziť
            //EN: Prompt what to insert into the input tag within the datePicker 
            'titleForInput':'Zadajte dátum:&nbsp;',
            //SK: Deklarácia užívateľskej funkcie pre tag input 
            //EN: Declaration of user function for input tag 
            'userFun':'inputValid',
            //SK: Deklarácia základne farby pozadia pre tag input
            //EN: Declaration of base background color for the input tag 
            'bgColor':'#fff',
            //SK: Deklarácia či sa má pripočítať ďalší nasledujúci pracovný deň
            //EN: Declaration whether to add the next working day 
            'datePlusDay':1,
            //SK: Deklarácia či sa má datepicker akceptovať len pracovné dni
            //EN: Declaration of whether the datepicker should only be accepted on working days 
            'onlyWorkDay':1,
            //SK: Deklarácia či sa má datepicker ďalej spracovávať aj voľné dni
            //EN: Declaration of whether the datepicker should be further processed on days off 
            'clickFreeDay':0,
            //SK: Skratky dní ako sa majú v datepicker zobrazovať
            //EN: Abbreviations of the days as they should appear in the datepicker 
            'aDayNames':['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'],
            //SK: Aktuálny dátum pre inicializáciu datePicker
            //EN: Current date for initializing datePicker 
            'day':date.getDate(),
            //SK: Inicializácia mesiaca pre datePicker
            //EN: Month initialization for datePicker 
            'month':(date.getMonth()+1),
            //SK: Inicializácia roka pre datePicker
            //EN: Initialize year for datePicker 
            'year':date.getFullYear(),
            //SK: Inicializácia pre datePicker v akom poradí v týždni je vyššie inicializovaný dátum
            //EN: Initialization for datePicker in the order in which the week is the higher initialized date 
            'ofWeek':date.getDay(),
            //SK: Inicializácia pre datePicker ako sa majú zobrazovať mesiace
            //EN: Initialization for datePicker as months should be displayed 
            'monthNames':[  'Január',
                            'Február',
                            'Marec',
                            'Apríl',
                            'Máj',
                            'Jún',
                            'Júl',
                            'August',
                            'September',
                            'Október',
                            'November',
                            'December']
        }
        let dPicker = new DPicker({}, container);
        //SK: Volanie metódy pre vykreslenie tag datePicker
        //EN: Call the method to render the datePicker tag 
        dPicker.execRender();
    }   
    
}
