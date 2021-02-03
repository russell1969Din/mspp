//SK: Import tried pre všeobecnú prácu s modelom
//EN: Import classes for general model work 
import {DomLevels} from "../srcRoot/domLevels.js";
import {System} from "../srcRoot/system.js";
//SK: Import triedy s užívateľskými funkciami pre datePicker
//EN: Import a class with custom functions for datePicker 
import {DPickerUser} from "../srcUserObjects/datePicker.usr.js";

//SK: Načítanie príslušného kaskádového štýlu  pre datePicker
//EN: Load the appropriate cascading style sheet for the datePicker 
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/datePicker.css" />');   

export class DPicker  {  
    
    //SK: V rámci konštruktora načítame parametre pre aktuálnu triedu       
    //EN: Within the constructor, we load the parameters for the current class 
    constructor(data={}, container={}, otherParams={}) {
         this.doConstruct(data, container, otherParams);    
    }

    //SK: Metóda triedy pre načítanie všeobecných parametrov
    //EN: Class method for retrieving general parameters 
    doConstruct(data={}, container={}, otherParams={}) {
        if( Object.keys(container).length > 0) {
            for(let key of Object.keys(container)) {eval('this.' + key + ' = container.' + key + ';')}
        }
        this.container = container; 
    }
    
    //SK: Načítanie SK volných dní cez  JSON / Veľká noc sa poćíta pomocou vzorca
    //EN: Loading SK free days via JSON / Easter is calculated using a formula 
    execRender(data={}, container={}, otherParams={}) {
        let url = '../../json/param-callendar-SK.json';    
        fetch(url)
            .then(response => response.json())
            .then(result => this.execRenderPicker(result));        
    }    
    
    //SK: Zobrazenie dátumového vstupu s príslušenstvom datePicker
    //EN: Date entry display with datePicker accessory 
    execRenderPicker(freeDays)    {
        //SK: Priprava unikátneho ID pre dátum a užívateľskej funckcie pre kontrolu vstupu  
        //EN: Preparation of a unique ID for the date and user function for access control 
        var userFun = this.userFun;
        var dateTagID = this.dateTagID;
              
        //SK: Načítame voľné dni do DOM sme ich mali prístupné aj nižších hierarchiách
        //EN: We load free days into the DOM, we also had them accessible to lower hierarchies 
        $('#mspp-workbanch').append('<span id="freeDays" style="display:none;">'+this.month+'</span>');
        let  freeDaysString = '';
        for(let i=0;i<freeDays.length;++i) {
            freeDaysString += '|' + freeDays[i];
        }    
        $('#freeDays').html(freeDaysString + '|');
        
        //SK: Načítame parametre do DOM sme ich mali prístupné aj nižších hierarchiách
        //EN: We load parameters into the DOM, we also had them accessible to lower hierarchies 
        $('#mspp-workbanch').append('<span id="month" style="display:none;">'+this.month+'</span>');
        $('#mspp-workbanch').append('<span id="year" style="display:none;">'+this.year+'</span>');
        
        $('#mspp-workbanch').append('<span id="dateTagID" style="display:none;">'+this.dateTagID+'</span>');
        $('#mspp-workbanch').append('<span id="bgColor" style="display:none;">'+this.bgColor+'</span>');
        
        $('#mspp-workbanch').append('<span id="datePlusDay" style="display:none;">'+this.datePlusDay+'</span>');
        $('#mspp-workbanch').append('<span id="onlyWorkDay" style="display:none;">'+this.onlyWorkDay+'</span>');
        $('#mspp-workbanch').append('<span id="clickFreeDay" style="display:none;">'+this.clickFreeDay+'</span>');
        
        
        //SK: Zobrazenie tag input pre dátum
        //EN: Display the input tag for the date 
        $('#mspp-workbanch').append('<div id="dateText">'+this.titleForInput+'</div>');
        $('#mspp-workbanch').append('<div id="spaceInput"><input type="text" id="'+this.dateTagID+'" maxlength="10" /></div>');
        //SK Ak vstúpime do dátumového tag input a vypĺňame ho ...
        //EN If we enter the date tag input and fill it in ... 
        $('#'+this.dateTagID).keyup(function() {
            //SK Zistíme či datePicker má deklarovanú užívateľskú funkciu ...
            //EN We will find out if datePicker has a declared user function ...  
            if(typeof DPickerUser == 'function') {
                //SK Zistíme či názov užívateľskej funkcie pre datePicker nie je prázdny reťazec ...
                //EN We will determine if the user function name for datePicker is not an empty string ...  
                if(undefinedIs(userFun).length>0)  {
                    //SK Zavoláme užívateľskú funkciu pre datePicker 
                    //EN We call the user function for datePicker  
                    let pickerUser = new DPickerUser();
                    eval('pickerUser.'+userFun+'("'+dateTagID+'")');
                }
            }
        });

        //SK Vykreslenie datepicker v prípade požiadavky na obrazovku 
        //EN Render a datepicker when a screen is requested  
        $('#mspp-workbanch').append('<div id="datePicker" ></div>');
        $('#datePicker').append('<div id="dateHead" ></div>');
        
        //SK Zobrazovanie datepicker ON / OFF podľa situácie
        //EN Datepicker ON / OFF display according to the situation  
        $('#'+this.dateTagID).focusin(function() {$('#datePicker').show();});
        $('#'+this.dateTagID).focusout(function() {if(!$('#datePicker').is(':hover')) $('#datePicker').hide();});
        $('#'+this.dateTagID).click(function() {$('#datePicker').show()});

        //SK Zobrazenie hlavičky datepicker
        //EN Display the datepicker header  
        $('#dateHead').append('<div id="headLeft" ><i class="fas fa-chevron-circle-left getLeft"></i></div>');
        this.getLeft(this.aDayNames);
        $('#dateHead').append('<div id="headTitle" >Február 2021</div>');
        $('#dateHead').append('<div id="headRight" ><i class="fas fa-chevron-circle-right getRight"></i></i></div>');
        this.getRight(this.aDayNames);
        $('#datePicker').append('<div id="dateSpace" ></div>');      
        
        //SK Volanie metódy - zobrazenie hlavičky so skratkami dní v týždni pre datepicker
        //EN Method call - display header with abbreviations of days of the week for datepicker  
        this.dateTitleIn(this.aDayNames);
        //SK Volanie metódy - zobrazenie buniek jednotlivých dní v aktuálnom nesiaci pre datepicker
        //EN Method call - display of cells of individual days in the current month for the datepicker  
        this.dateSpaceFill(this.aDayNames);
    }
    
    //SK Metóda so všeobecnou deklaráciou objektu pre prácu s dátumom podľa aktálneho nastavenia
    //EN Method with general object declaration for working with date according to the current setting  
    daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    } 
    
    //SK Metóda pre zistenie v akom poradí v týždni sa v parametri definovaný dátum nachádza
    //EN Method for finding out in which order of the week the date defined in the parameter is located  
    dayOfWeek(day, month, year) {
        let firstDay = new Date(this.getMonthEN(month) + ' ' +day+', ' + year);
        return this.dayOfWeekSK(firstDay.getDay());
    }   
    
    //SK Vytvorenie zakladného zobrazenia datePicker
    //EN Create a basic datePicker view  
    dateSpaceFill(aDayNames) {
        //SK Inicializácia dátumových údajov pre datepicker
        //EN Initialize date data for datepicker  
        let dateCurrent = new Date();
        let current = dateCurrent.toLocaleString();
        current = current.split(','); current = current[0];
        current = current.split('.'); 
        let dayCurrent = current[0];
        let monthCurrent = current[1];
        let yearCurrent = current[2];
        
        let month = parseInt($('#month').html()); 
        let year = parseInt($('#year').html());

        const inWeek = this.dayOfWeek(1, month, year);
        let daysCount = this.daysInMonth (month, year)

        let cellNum = 1;
        let dayInDate = 1;
        let isBreak;      
        let inLine = 1;
        
        //SK Inicializácia / vyprázdnenie datepicker
        //EN Initialize / empty datepicker  
        $('#dateSpace').html('');
        this.dateTitleIn(aDayNames);
        for(let line=1;line<7;++line) {
            $('#dateSpace').append('<div id="line-'+line+'"></div>')
            isBreak = false;
            //SK Zobrazovanie dní v datepicker po jednotlivých riadkoch
            //EN Display of days in the datepicker line by line 
            for(let i=1;i<8;++i) {
                $('#line-'+line).append('<div id="cell-'+cellNum+'" class="cell"></div>');
                if(i<inWeek && line==1) {$('#cell-'+cellNum).addClass('cellEmpty');} else {
                    $('#cell-'+cellNum).html(dayInDate); 
                    if(i>5 || this.isFreeDay(dayInDate, month, year)) $('#cell-'+cellNum).addClass('cellFree');
                    //SK Ak sa jedná o volný deň vyznačí sa podľa CSS šablóny a nastavení v parametroch
                    //EN If it is a free day, it will be marked according to the CSS template and settings in the parameters  
                    if($('#clickFreeDay').html()==1 && (i>5 || this.isFreeDay(dayInDate, month, year))) {
                        $('#cell-'+cellNum).removeClass('cellFree');
                        $('#cell-'+cellNum).addClass('cellFreeClick');
                    } 
            
                    //SK Ak sa zobrazuje aktualny deň vyznačí sa podľa CSS šablóny
                    //EN If the current day is displayed, it will be marked according to the CSS template  
                    if( dayCurrent==dayInDate && 
                        monthCurrent==month &&
                        yearCurrent==year) {$('#cell-'+cellNum).addClass('cellCurrent');} 
                    ++dayInDate;
                }
                //SK Inkrement čísla bunky pre konkrétny deň z dôvodu unikátnosti jej ID
                //EN Increment the cell number for a particular day due to the uniqueness of its ID  
                ++cellNum;
                //SK Ak  je koniec mesiaca ukončíme zobrazovanie
                //EN If the end of the month, we will end the display  
                if(dayInDate>daysCount) {isBreak = !isBreak; break;}
            }
            //SK Ak sme ukončili zobrazovanie dní opustíme aj túto metódu
            //EN If we have stopped showing days, we will also leave this method  
            if(isBreak) {break;}
            //SK Inak inkrement indexu pre ďalší riadok / unikátnu identifikáciu v zobrazovaní datepicker
            //EN Otherwise, increment the index for the next row / unique identification in the datepicker display  
            ++inLine;
        }
        
        //SK Volanie metódy zabezpečujúce služby ak sa kurzor myšky  nachádza nad niektorou bunku s dňom v mesiaci
        //EN Calling a service method if the mouse cursor is over a cell with the day of the month  
        this.onMouseOver();
        
        //SK Modulacia výšky datepicker podľa počtu obrazovaných riadkov v konkrétnom mesiaci
        //EN Modulation of the height of the datepicker according to the number of displayed lines in a specific month  
        $('#dateSpace').css('height', (inLine*39) + 'px');
        $('#datePicker').css('height', 90+(inLine*39) + 'px');
    };

    //SK Metóda na zobrazenie skratiek dní v týždni ako boli deklarované pri volaní triedy datePicker
    //EN Method for displaying the abbreviations of the days of the week as declared when calling the datePicker class  
    dateTitleIn(aDayNames)   {
        //let aDayNames = aDayNames;
        
        let cell = 1
        $('#dateSpace').append('<div id="line-title" ></div>')
        for(let x=0;x<7;++x) {
            $('#line-title').append('<div id="cell-title'+cell+'" class="cell-title">'+aDayNames[x]+'</div>')
            ++cell;
        }
      
    }

    //SK Metóda zabezpečujúca služby keď sa kliknutím myšky vrátime o mesiac späť
    //EN A method of providing services when we return a month back by clicking the mouse  
    getLeft(aDayNames) {
        //SK Inicializujeme potvrdenie ikony
        //EN Initializing the icon confirmation  
        $('.getLeft').unbind();
        //SK Inicializujeme sfarbenie ikony podľa situácie
        //EN We initialize the color of the icon according to the situation 
        $('.getLeft').mouseover(function() {$('.getLeft').css('color','#cc0000');});
        $('.getLeft').mouseout(function() {$('.getLeft').css('color','#000');});
        var monthNames = this.monthNames;
        //SK Ak potvrdíme že chceme ísť v rámci datepicker o mesiac späť....
        //EN If we confirm that we want to go a month back within the datepicker ....  
        $('.getLeft').click(function() {
            //SK Zistíme aktuálny mesiac a rok v rámci datepicker a prevedieme do typu celé číslo
            //EN We will find out the current month and year within the datepicker and convert it to the integer type  
            let month = parseInt($('#month').html()); 
            let year = parseInt($('#year').html());
            //SK Ak je mesiac viac ako 1 nasleduje jeho dekrement
            //EN If the month is more than 1, its decrement follows  
            if(month>1) {$('#month').html(month-=1);} else    {
                //SK Inak mesiac je 12 (december) a dekrement pre rok
                //EN Otherwise the month is 12 (December) and the decrement for the year  
                $('#month').html(12);
                $('#year').html(--year); 
            } 
            //SK V hlavičke datepicker aktualizujeme mesiac aj rok
            //EN We update the month and year in the datepicker header  
            $('#headTitle').html(monthNames[parseInt($('#month').html())-1] + '&nbsp;' + $('#year').html());
            let dPicker  = new DPicker(); 
            //SK Následne aktualizujeme obsah v datepicker 
            //EN Then we update the content in the datepicker 
            dPicker.dateSpaceFill(aDayNames);
        });
    }

    //SK Metóda zabezpečujúca služby keď sa kliknutím myšky posunieme na ďalší mesiac 
    //EN A method of providing services when we move to the next month by clicking the mouse  
    getRight(aDayNames) {
        //SK Inicializujeme potvrdenie ikony
        //EN Initializing the icon confirmation 
        $('.getRight').unbind();
        //SK Inicializujeme sfarbenie ikony podľa situácie
        //EN We initialize the color of the icon according to the situation  
        $('.getRight').mouseover(function() {$('.getRight').css('color','#cc0000');});
        $('.getRight').mouseout(function() {$('.getRight').css('color','#000');});
        var monthNames = this.monthNames;
        //SK Ak potvrdíme že chceme ísť v rámci datepicker na ďalší mesiac ....
        //EN If we confirm that we want to go within the datepicker for the next month ....  
        $('.getRight').click(function() {
            //SK Zistíme aktuálny mesiac a rok v rámci datepicker a prevedieme do typu celé číslo
            //EN We will find out the current month and year within the datepicker and convert it to the integer type  
            let month = parseInt($('#month').html()); 
            let year = parseInt($('#year').html());
            //SK Ak je mesiac menej ako 12 nasleduje jeho inkrement
            //EN If the month is less than 12, its increment follows 
            if(month<12) $('#month').html(month+=1); else    {
                //SK Ak je mesiac 12 (december) nastavíme ho na 1 (január) a inkrement pre rok
                //EN If the month is 12 (December) we set it to 1 (January) and increment for the year  
                $('#month').html(1);
                $('#year').html(++year); 
            } 
            //SK V hlavičke datepicker aktualizujeme mesiac aj rok
            //EN We update the month and year in the datepicker header  
            $('#headTitle').html(monthNames[parseInt($('#month').html())-1] + '&nbsp;' + $('#year').html());
            let dPicker  = new DPicker(); 
            //SK Aktualizujeme obsah v datepicker 
            //EN We update the content in the datepicker  
            dPicker.dateSpaceFill(aDayNames);
        });
    }

    //SK Úprava zisteného čísla dňa v týždni podľa praxe na území SR 
    //EN Adjustment of the determined number of the day of the week according to practice in the territory of the SR 
    dayOfWeekSK(ofWeek) {
        if(ofWeek==0) return 7;
        return ofWeek;
    }
    
    //SK Pre účely formátovania dátumov v ECMA6+ potrebujeme aj angilcké názvy mesiacov
    //EN For the purpose of formatting dates in ECMA6 +, we also need English names of months  
    getMonthEN(monthIndex) {
        let aMonthEN = [    '',
                            'January',
                            'February',
                            'March ',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                        ];
        return(aMonthEN[monthIndex])
    }

    //SK Metóda so služami ako ich jednotlivé bunky s dňami poskytujú ak sa nad bunku nastavíme myškou
    //EN The method with services as their individual cells with days are provided if we set the mouse over the cell  
    onMouseOver() {
        //SK Zistíme mesia a rok aktuálne nastavený v datepicker - prevo do celočíselného typu
        //EN Find out the month and year currently set in the datepicker - convert to integer type  
        let month = parseInt($('#month').html()); 
        let year = parseInt($('#year').html());
        let day;
        //SK Listujeme všetky plochy na ktorých sa môžu nachádzať bunky s jednotlivými dňami v rámci datepicker 
        //EN We list all areas on which cells with individual days can be located within the datepicker 
        for(let c=1;c<40;++c) {
            //SK Ak je na konkrétnom mieste bunka s dňom vytvorená... 
            //EN If a day cell is created at a specific location ...  
            if(typeof $('#cell-'+c).html()!='undefined') {   
                //SK Ak bunka nie je prázdna, jej obsahom je deň v mesiaci...
                //EN If the cell is not empty, its content is the day of the month ...  
                if($('#cell-'+c).html().trim().length>0) {
                    //SK Ak sa jedná o pracovný deň, alebo akceotujeme aj voľné dni / sviatky
                    //EN If it is a working day or we also offer free days / holidays  
                    if($('#clickFreeDay').html()==1 || (this.dayOfWeek($('#cell-'+c).html(), month, year) <6 && !this.isFreeDay($('#cell-'+c).html(), month, year))) {    
                        //SK Ak Vyznačíme bunku podľa nastavenío v CSS 
                        //EN If we select a cell according to the settings in CSS  
                        $('#cell-'+c).mouseover( function() {$('#cell-'+c).css('background-color','#fffecd');} );
                        $('#cell-'+c).mouseout( function() {$('#cell-'+c).css('background-color','#f1f1f1');} );    
                        //SK Ak aktuálnu bunku potvrdíme myškou
                        //EN If we confirm the current cell with the mouse  
                        $('#cell-'+c).click(function() {
                            //SK V internej instancií redeklarujeme objekt triedy datePicker
                            //EN In the internal instance, we declare an object of class datePicker  
                            let dPicker = new DPicker();
                            let dateNext = new Date(dPicker.getMonthEN(month) + ' ' +$('#cell-'+c).html()+', ' + year);
                            //SK Zapamätame si potvrdený deň v rámci týždňa
                            //EN We will remember the confirmed day within the week  
                            let lastDay = dateNext.toLocaleString();
                            lastDay = lastDay.split(','); lastDay = lastDay[0];
                            lastDay = lastDay.split('.'); lastDay = lastDay[0];
                            let nextDay;
                            let endYear = false;
                            //SK Spustíme cyklus s konštantný opakovaním 5x, nepredpokladáme viac voľných dní priamo za sebou
                            //EN We run a cycle with constant repetition 5 times, we do not assume more free days directly in a row  
                            for(let x=0;x<5;++x) {
                                let plus = 0;
                                //SK Budeme do tag input jeden deň pripočítavať
                                //EN We will add one day to the input tag 
                                if($('#datePlusDay').html()==1) plus = 1;
                                dateNext.setDate(dateNext.getDate() + plus);
                                //SK Zistíme dátum nasledujúceho dňa
                                //EN We will find out the date of the next day  
                                nextDay = dateNext.toLocaleString();
                                nextDay = nextDay.split(','); nextDay = nextDay[0];
                                nextDay = nextDay.split('.'); nextDay = nextDay[0];
                                //SK Ak potvrdený deň v bunke je vyšší ako nasledujúci...
                                //EN If the confirmed day in the cell is higher than the following ...  
                                if(lastDay>nextDay) {
                                    //SK Aktualizuje sa aj mesiac v akom sa nasledujúci deň nachádza
                                    //EN The month of the next day is also updated  
                                    if(month<12) {if(!endYear) ++month;} else {month=1;++year; endYear = true;}
                                }
                                //SK Ak nie je nastavené ze robíme iba s pracovnými dňami opustíme cyklus
                                //EN If it is not set that we do only with working days we leave the cycle  
                                if($('#onlyWorkDay').html()!=1) {break;} 
                                //SK Alebo listujeme nasledujúce dni, kým aktuálny deň nie je pracovný
                                //EN Or we browse the following days until the current day is working  
                                if( dPicker.dayOfWeek(nextDay, month, year)<6 &&
                                    !dPicker.isFreeDay(nextDay, month, year))   break;
                            }
                            
                            //SK Vyskladáme dátum ako návratovú hodnotu v požadovanom formáte zobrazenia
                            //EN We compose the date as a return value in the desired display format  
                            let returnDate =    nextDay.toString().padStart(2, "0") + '-' +
                                                month.toString().padStart(2, "0") + '-' + year;
                            //SK Vložíme výsledný dátum do tag input
                            //EN We insert the resulting date into the input tag  
                            $('#'+$('#dateTagID').html()).val(returnDate);
                            //SK Pozadie tag input zafarbíme základnou farbou ako bola nastavená v parametri
                            //EN We will color the background of the input tag with the basic color as set in the parameter  
                            $('#'+$('#dateTagID').html()).css('background-color',$('#bgColor').html());
                            //SK Zobrazenie datePicker bude zrušené
                            //EN The datePicker display will be canceled  
                            $('#datePicker').hide();
                        });
                    }
                }
            }
        }
    }

    //SK Metóda na zistenie sviatkov a voľných dní
    //EN Method for detecting holidays and days off  
    isFreeDay(day, month, year) {
        
        //SK Deklarujeme objekt triedy dátum s dátumom vyskladám z parametrov metódy
        //EN We declare an object of class date with a date I compile from the parameters of the method  
        let date = new Date(this.getMonthEN(month) + ' ' +day+', ' + year);

        //SK Ak zistíme že v dátume sa nachádza voľný deň alebo sviatok metóda vráti true
        //EN If we find that there is a day off or a holiday on the date, the method returns true  
        if($('#freeDays').html().indexOf('|'+day+'~'+month+'~X|')>(-1)) return true;
        if($('#freeDays').html().indexOf('|'+day+'~'+month+'~'+year+'|')>(-1)) return true;
    
        //SK Ak zistíme že v dátume je mesiac marec alebo apríl
        //EN If we find that the date is March or April  
        if(month==3 || month==4) {
            //SK Zisťujeme či na dátum sa nevzťahuje veľký piatok alebo veľkonočný pondelok
            //EN We are finding out if the date is not covered by Good Friday or Easter Monday  
            let a = year%19; let b = year%4; let c = year%7;
            let m = 24; let n = 5; 
            let d = (19*a+m)%30; let e = (n + 2*b + 4*c + 6*d)%7;
            let March = 22 + d + e;
            let April = d + e - 9;
    
            let aDate;
            //SK Ak veľkonočňá nedeľa je v marci
            //EN If Easter Sunday is in March  
            if(month==3 && (March>0 && March<32)) {
                //SK Vypočítame veľký piatok a veľkonocný pondelok
                //EN We calculate Good Friday and Easter Monday  
                let dateA = new Date(this.getMonthEN(month) + ' ' +March+', ' + year);
                dateA.setDate(dateA.getDate() - 2);
                let Friday = dateA.toLocaleString();
                dateA.setDate(dateA.getDate() + 3);
                let Monday = dateA.toLocaleString();
                //SK Ak sa na dátum vzťahuje sviatok veľkej noci vráti sa true
                //EN If the date is covered by a Easter holiday, true is returned 
                aDate = Friday.split(','); aDate = aDate[0].split('.');
                if(aDate[0]==day && aDate[1]==month && aDate[2]==year) return true;
                aDate = Monday.split(','); aDate = aDate[0].split('.');
                if(aDate[0]==day && aDate[1]==month && aDate[2]==year) return true;
            }
            //SK Ak veľkonočná nedeľa je v apríli
            //EN If Easter Sunday is in April  
            if(month==4 && (April>0 && April<31)) {
                //SK Vypočítame veľký piatok a veľkonocný pondelok
                //EN We calculate Good Friday and Easter Monday We calculate Good Friday and Easter Monday  
                let dateA = new Date(this.getMonthEN(month) + ' ' +April+', ' + year);
                dateA.setDate(dateA.getDate() - 2);
                let Friday = dateA.toLocaleString();
                dateA.setDate(dateA.getDate() + 3);
                let Monday = dateA.toLocaleString();
                //SK Ak sa na dátum vzťahuje sviatok veľkej noci vráti sa true
                //EN If the date is covered by a Easter holiday, true is returned  
                aDate = Friday.split(','); aDate = aDate[0].split('.');
                if(aDate[0]==day && aDate[1]==month && aDate[2]==year) return true;
                aDate = Monday.split(','); aDate = aDate[0].split('.');
                if(aDate[0]==day && aDate[1]==month && aDate[2]==year) return true;
            }        
        }
        //SK Inak sa vráti false, dátum je pracovný deň
        //EN Otherwise, false is returned, the date is a business day  
        return false;
    }
}