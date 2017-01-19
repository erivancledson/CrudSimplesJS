//array com objetos

var list = [
    {"desc":"rice","amount":"1","value":"5.40"},
    {"desc":"beer","amount":"12","value":"1.99"},
    {"desc":"meat","amount":"1","value":"15.40"}
];

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
   
}


//listando dados
function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Action</td></tr></thead>';
//pegar os valores 
 for(var key in list){
     table += ' <tr><td>'+formatDesc(list[key].desc)+'</td><td>'+formatAmount(list[key].amount)+'</td><td>'+formatValue(list[key].value)+'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Edit </button> <button class="btn btn-default" onclick="deleteData('+key+');">Delete </button></td></tr>';
 }
 
 table +='</tbody>';
 document.getElementById("listTable").innerHTML = table;
 getTotal(list);
 saveListStorage(list);
}
// fim do listar dados


function formatDesc(desc){
    //tudo minusculo
    var str = desc.toLowerCase();
    //pego a primeira letra e primeira maiuscula 
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}
function formatAmount(amount){
    return parseInt(amount);
}

function formatValue(value){
    //dois numero depois do . | "" vira string novamente
    var str = parseFloat(value).toFixed(2) + "";
    //aonde é . vire ,
    str = str.replace(".", ",");
    //colocando o cifrão
    str = "$ " + str;
    return str;
}

// do botão de add
    function addData(){
        if(!validation()){
             return;
         }
         
        var desc = document.getElementById("desc").value;
        var amount = document.getElementById("amount").value;
        var value = document.getElementById("value").value;
        //fica em primeiro quando add na lista
        list.unshift({"desc":desc, "amount":amount, "value":value});
   
        setList(list);
    }


    function setUpdate(id){
        var obj = list[id];
        document.getElementById("desc").value = obj.desc;
        document.getElementById("amount").value = obj.amount;
        document.getElementById("value").value = obj.value;
        document.getElementById("btnUpdate").style.display = "inline-block";
         document.getElementById("btnAdd").style.display = "none";
        //pegando id para atualizar
          document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
    }
    
    function resetForm(){
        document.getElementById("desc").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("value").value = "";
        document.getElementById("btnUpdate").style.display = "none";
         document.getElementById("btnAdd").style.display = "inline-block";
         document.getElementById("inputIDUpdate").innerHTML = "";
         
         document.getElementById("errors").style.display = "none";
    }
     function updateData(){
         
         if(!validation()){
             return;
         }
         var id = document.getElementById("idUpdate").value;
         var desc =  document.getElementById("desc").value;
         var amount = document.getElementById("amount").value ;
         var value = document.getElementById("value").value;
         //atualizando valor
         list[id] = {"desc":desc, "amount": amount, "value":value};
         resetForm();
         setList(list);

     }
     
     function deleteData(id){
         if(confirm("Deseja deletar?")){
             //limpa o ultimo registro
             if(id == list.length - 1){
                 list.pop();
             }else if(id == 0){
                 //limpa o primeiro registro
                 list.shift();
             }else{
                 //limpa o do meio 
                 //pega do zero até o id
                var arrAuxIni = list.slice(0, id);
                //pega do id até o final da lista
                var arraAuxEnd = list.slice(id + 1);
                //formando a  lista novamente
                list = arrAuxIni.concat(arraAuxEnd);
             }
             setList(list);
         }
     }
     
     //validar
     function validation(){
         
         
         var desc = document.getElementById("desc").value;
         var amount = document.getElementById("amount").value;
         var value = document.getElementById("value").value;
         var errors = "";
         
         document.getElementById("errors").style.display = "none";
         
         if(desc === ""){
             errors += '<p>Digite uma descricao</p>';
         }
         
         if(amount === ""){
             errors += '<p>Digite uma quantidade</p>';
         }else if(amount != parseInt(amount)){
             errors += '<p>Digite uma quantidade valida</p>';
         }
         
           if(value === ""){
             errors += '<p>Digite um valor valido</p>';
         }else if(value != parseFloat(value)){
             errors += '<p>Digite um valor valido</p>';
         }
         
         if (errors != ""){
              document.getElementById("errors").style.display = "block";
             
             document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
             
             return 0;
         }else{
             return 1;
         }
     }
     
     function deleteList(){
         if(confirm("Quer deletar a lista?")){
             list = [];
             setList(list);
         }
     }
     
     
     function saveListStorage(list){
         //transfoma o array em string json
         var jsonStr = JSON.stringify(list);
         localStorage.setItem("list", jsonStr);
     }
     
     function initListStorage(){
     
     var testList = localStorage.getItem("list");
     if(testList){
         list = JSON.parse(testList);
     }
     setList(list);
     }
     
initListStorage();




