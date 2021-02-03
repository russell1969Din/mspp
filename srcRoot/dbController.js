

export class DBController {  
    constructor(dbTables, otherParams, joinDbTables='') {
        
        this.dbTables =  dbTables;  
        this.otherParams = otherParams;
        this.joinDbTables = joinDbTables;

        this.pathJSON = otherParams.pathJSON;
        this.noCache = otherParams.methodName;
    }
    
    read(classObject=null, container={}, fetchJSON=false, id=0, whereDb='' ) {

        this.methodName = 'execRender';
        if(typeof container.methodName != 'undefined') this.methodName = container.methodName;
        
        this.createJSON(    classObject,
                            this.methodName, 
                            id,   
                            whereDb,      
                            this.dbTables, 
                            container,
                            this.otherParams,
                            this.pathJSON,
                            fetchJSON,
                            this.joinDbTables,
                            this.noCache); 
    }
    
    createJSON( classObject,
                methodName, 
                id, 
                whereDb,
                dbTables, 
                container,
                otherParams,
                pathJSON,
                fetchJSON,
                joinDbTables,
                noCache) {
        /// to do: doriešiť no-cache pri aktualizácii tabuľky
        
        $.ajax({
            url:"../jsonReader.php",
            method:'POST',
            data:{
                protection:     "ABNet",
                dbTables:       dbTables,
                dbJoin:         joinDbTables,
                dbID:           id,
                dbWhere:        whereDb,
                pathJSON:       this.pathJSON
            },
            success:function(data)  {
                //console.log(data);    
                (async () => {  
        
                    //console.log('JSON :: ' + pathJSON  + ' :: ' + joinDbTables);
                    

                    if(pathJSON.length>0 && joinDbTables.length>0 && fetchJSON) {
                        let jsonPlusID = '';
                        if(id>0 && whereDb.length==0)  {jsonPlusID = '_' + id;}
                        
                        
                        
                        if(whereDb.length>0) {
                            let forAscWhere = whereDb.split(' ').join('');
                            let asc = getSumAscii(forAscWhere);
                            jsonPlusID = '_ASC_' + asc;
                        }
                        let aDbTable = dbTables.split('~');
                        let tablesJSON = '';
                        let comma = '';
                        for(let table of aDbTable) {
                            tablesJSON += comma + table.substr(0,3);
                            comma = '~';
                        }
    
                        let fileNameJSON =  $('#webURL').html() + '/'+pathJSON + tablesJSON + jsonPlusID + '.json';
                        let methods = {};
                        let methodsFetch = {};
                        if(this.noCache) { methodsFetch = {cache: "no-cache"};}
                        let response = await fetch(fileNameJSON, methodsFetch); 
    
                        let jsonData = await response.json();
                        
                        
                        if(jsonData.length>0) {
                            if(classObject != null) {
        
                                eval('classObject.' + methodName + '(jsonData, container, otherParams);');
                            } else {
        
                                // to do temporary
                                //let fillContainers = new FillContainers(jsonData, container, otherParams); 
                                //eval('fillContainers.' + methodName + '();');
                            }
                        }
                    }  else {   
                        eval('classObject.' + methodName + '({}, container, otherParams);');
                    }    
                })();
            }                                                       
        });       
    }
}