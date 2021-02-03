export class System {
    constructor() {}
    
    //======    Metóda pre vytvorenie poľa s klúčmi pre výber dát z tabuľky (cez JSON)
    getArrayFromData(fieldsAndTitle, objData, tester=false) {
        //======    Deklarácia návratového poľa
        let fromDB;
        //======    Deklarácia čísla riadku vo vytáranom poli
        let record   = 1; 
        
        let logicalIn;
        
        //======    Príprava reťazca pre javascript evaluation
        let eCode   = 'fromDB = {';
        for(let dbField of Object.values(fieldsAndTitle) ) {
            //Zistí či s aktuálnou položkou (dbField.field) nemá ďalej pracovať ako s logickou položkou (napr. Áno/Nie)
            logicalIn = undefinedIs(dbField.logical);
            if(logicalIn.length == 0) {logicalIn = 0;}
            eCode       +=  '"' + dbField.field + 'Logical": "' + logicalIn + '",';
            //======    Do kľúča key s číslom riadku vloží názov poľa tabuľky
            eCode       +=  '"key' + record + '": "' + dbField.field + '",';
            //======    Do kľúča s názvom stĺpca v tabuľke vloží hodnotu tohto poľa z tabuľky
            eCode       +=  '"' + dbField.field + '": objData.' + dbField.field + ',';
            //======    Ak má hotnota v tabuľke DB (JSON) tituľku načíta ju do klúča s názvom stĺpca v tabuľke + Title
            eCode       +=  '"' + dbField.field + 'Title": "' + dbField.title + '",';
            //======    Niektoré métódy tried spracuvávají položky výsledného objektu tejto metódy podľa fyzického poradia
            //          položiek v parametri. Aby bola táto požiadavka spracovateľná vytvorí sa aj položka na takéto indexovanie 
            eCode       +=  '"index_'+ record +'": "' + record + '~' + dbField.field + '",';
            //======    Inkrementuje číslo riadku vo vytáranom poli
            ++record;
        }
        //======    Uzatvára reťazec pre javascript evaluation
        eCode       +=  '};';
        if(tester) {'getArrayFromData/eCode ::' + console.log(eCode);}
        //console.log('objData.gen_note :: ' + objData.gen_title);
        //======    Spustí javascript evaluation
        eval(eCode);    
        //======    Vráti vytvorené pole s key..1, hotnotou a titulkou v rámci záznamov tohto poľa
        return fromDB;
    }
    
    getRecordFromIndex(aFromDB, index) {
        
        if(typeof aFromDB['index_' + index] != 'string') return null;
        let aIndex = aFromDB['index_' + index].split('~');
        
        let returnArray;
        let eCode = 'returnArray = {"' + aIndex[1] + '": "' + aFromDB[aIndex[1]] + '", ';
        eCode += '"' + aIndex[1] + 'Logical": "' + aFromDB[aIndex[1]+ 'Logical'] + '", ';
        eCode += '"' + aIndex[1] + 'Title": "' + aFromDB[aIndex[1]+ 'Title'] + '", ';
        eCode += '"fieldName": "' + aIndex[1] + '", ';
        eCode += '"index": ' + index;
        eCode +=  '};';
        eval(eCode);
        return returnArray;
    }

    cssFileRead(path='', scriptName='', cssPrivateFile='', consoleLog=false) {

        let basePath = $('#webURL').html();         // + '/' + path + '/'
        let cssPrivatePath = 'css-user';

        if(scriptName.lastIndexOf('.css')!=(scriptName.length-4)) {scriptName += '.css';}
        let scriptPathName = basePath + '/' + scriptName;
        if(cssPrivateFile.lastIndexOf('.css')!=(cssPrivateFile.length-4)) {cssPrivateFile += '.css';}

        cssPrivateFile = undefinedIs(cssPrivateFile);
        let cssPathFile; 
        if(cssPrivateFile.length > 4) {
            cssPathFile = basePath + '/' + cssPrivatePath + '/' + cssPrivateFile;
        } else {
            cssPathFile = basePath + '/' + path + '/' + scriptName;
        }
        
        if($('#workSpace_css').html().indexOf(cssPathFile) == (-1) ) {
            $('#workSpace_css').append('<link id="original"  rel="stylesheet" href="' + cssPathFile + '" />');
            if(consoleLog) console.log('CSS load :: ' + cssPathFile);
        }
        return true;
    }
    
    isFileNameWithVideoFormat(content='') {
        if(content.toLowerCase().indexOf('my.matterport.com')!=(-1)) return true;
        
        let returnValue = false;
        
        if(content.trim().length == 0) return returnValue;

        let dot = content.lastIndexOf('.');
        let length = content.length;
        if(dot != (length-4) && dot != (length-5)) return returnValue;
        
        let aExtension = ['.avi', '.ogg', '.mp4', '.mpeg', '.mpg', '.wmv', '.mov'];
        for(let ext of Object.values(aExtension)) {
            if(content.toLowerCase().indexOf(ext)!=(-1)) {
                if(content.toLowerCase().indexOf(ext) == content.length - (ext.length)) {
                    returnValue = true;
                    break;
                }
            }
        }            
        return returnValue;
    }

 }
