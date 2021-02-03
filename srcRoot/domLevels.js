
export class DomLevels {
    //======    Konštruktor nevytvára žiadne lokálne premenné
    constructor() {}
    
    //======    Funkcia vytvárajúca nový HTML element do akuálneho DOM
    //======    parent = ID rodičovského elementu, do ktorého má byť element vložený
    //======    type = typ vytváraného elementu
    //======    id = unikátne ID noovytváraného elementu
    //======    ak tester = true do titulky elementu vloží identidikáčne informácie (napr. ID)
    createDivElement(parent, id, tester = false) {
        var cnt = document.createElement('div'); 
        if(document.getElementById(parent)) {
            document.getElementById(parent).appendChild(cnt); 
            cnt.setAttribute("id", id); 
            if(tester) cnt.setAttribute("title", id);
            
            // Vrati objekt typu element pre prípadne ďalšie použitie
            return cnt;
        } else {
            console.log('Kontajner == ' + parent + ' == treba vložiť do šablóny !');
            return null;
        }
    }
    
    loadTemplate(fileToLoad='', workSpace='', classObject=null, methodName=null) {
        if(methodName == null) {methodName = 'renderTemplate'}
        
        if(fileToLoad.trim().length==0 || workSpace.trim().length==0) return null;
        $('#'+workSpace).html('');
        $.ajax({
            url:'../srcTemp/' + fileToLoad + '/' + fileToLoad + '.tmp.php',
            method:'POST',
            data:{
                param:       0
            },
            success:function(data)  {
                //console.log(data);
                $('#'+workSpace).html(data);                    
                if(classObject!=null && methodName!=null) {
                    eval('classObject.' + methodName + '();');
                }
            }                                                       
        });
    }
    
  
    
    newHistoryPushState(newHref='', top=false) {
        //======    Ak niektorý z parametrov nie je riadne definovaný, metóda sa predčasne ukončí
        if(newHref.trim().length==0) return null;
        //======    Appka nastaví nové URL
        var stateObj = {foo:'bar'};
        history.pushState(stateObj, "page 2", "/" + newHref);
        //======    Nastaví zobrazenie šablón na úplný vrch hore ak parameter top sa rovná true
        //if(top) $(window).scrollTop(0); $('body').scrollTop(0);
    
    }
    
    linkTemplate(hrefLink='', WEBPath='') {
        //======    Ak niektorý z parametrov nie je riadne definovaný, metóda sa predčasne ukončí
        if(hrefLink.trim().length==0 || WEBPath.trim().length==0) return null;
        
        //======    Do kontajnera pre predchádzajuce URL adresy sa načíta aktuálne adresa   
        $('#lastURL').html($('#currentURL').html());
            
        //======    Fyzicky nastaví cestu ku šablóne, do ktorej bude ďalej nasmerovaný
        this.newHistoryPushState(hrefLink);
        
        //======    Do kontajnera pre aktuálne URL adresy sa načíta adresa vyskladaná z parametrov metódy
        $('#currentURL').html(WEBPath + '/' + hrefLink);
        //======    Resetne posledne načítanú šablónu z generálneho kontajnera 
        $('#workSpace_general').html('');  
        //======    Do gerálneho kontajnera načíta šablónu prevzatú z parametra #currentURL / funkciou getFragmentPath(1) 
        this.loadTemplate(getFragmentPath(1), 'workSpace_general');
    }
    
    returnFrom(toTemplate='', toObjTemplate={}) {
        if(toTemplate.trim().length==0) return null;
        
        //======    Načíta šablónu do ktorej sa následne vráti
        this.loadTemplate(toTemplate, 'workSpace_general');

        //======    Do kontajnera pre predchádzajuce URL adresy sa načíta aktuálne adresa   
        $('#lastURL').html($('#currentURL').html());
        $('#currentURL').html($('#webURL').html() + '/' + toTemplate);
        
        //======    Fyzicky nastaví cestu ku šablón, do ktorej sa vráti
        this.newHistoryPushState(toTemplate);
        
        //======    Do objektu šablóny do ktorej sa vracia, prevzatého z parametra spustí metódu pre načítanie controller
        toObjTemplate.controller();
    }
}


