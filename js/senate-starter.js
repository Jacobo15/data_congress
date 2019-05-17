// VARIABLES GLOBALES
var members = data.results[0].members;


// LLAMADA DE FUNCIONES
printTable(members);
dropdown(members);



document.getElementById("republican-checkbox").addEventListener("click", filterByParty);

document.getElementById("democrat-checkbox").addEventListener("click", filterByParty);

document.getElementById("independent-checkbox").addEventListener("click", filterByParty);

document.getElementById("create-option").addEventListener("change", filterByParty);



// FUNCIONES
function printTable(array) {
    document.getElementById("senate-data").innerHTML = ""
    var content = "";
    for (var i = 0; i < array.length; i++) {
        if (array[i].middle_name == null) {
            content += "<tr><td><a href=" + array[i].url + ">" + array[i].last_name + ", " + array[i].first_name + " " + "</a></td><td>" + array[i].party + "</td><td>" + array[i].state + "</td><td>" + array[i].seniority + "</td><td>" + array[i].votes_with_party_pct + "</td></tr>";
        } else {
            content += "<tr><td><a href=" + array[i].url + ">" + array[i].last_name + ", " + array[i].first_name + " " + array[i].middle_name + "</a></td><td>" + array[i].party + "</td><td>" + array[i].state + "</td><td>" + array[i].seniority + "</td><td>" + array[i].votes_with_party_pct + "</td></tr>";
        }
        document.getElementById("senate-data").innerHTML = content;
    }

}


function filterByParty() {
    var partycheck = document.querySelectorAll('input[name=party]:checked');
    var newParty = Array.from(partycheck);
    var newPartyCheck = newParty.map(input => input.value);
    var parties = []
    if (partycheck.length == 0) {
        filterByState(members);
    } else {
        for (var i = 0; i < members.length; i++) {
            if (newPartyCheck.includes(members[i].party)) {
                parties.push(members[i])
            }
        }
    filterByState(parties);
    }
   
}



function dropdown(array) {
    var states = [];
    for(var i=0; i < members.length; i++){
        if(!states.includes(array[i].state)){
            states.push(array[i].state)
        }
        states.sort();
        }
       
     createOption(states);    
}

function createOption(array){
var dropdown = document.getElementById("create-option");
    for(var i=0; i < array.length; i++){
        var opt = document.createElement("option");
        opt.setAttribute("value",array[i]);
        opt.append(array[i]);
        dropdown.append(opt);
    }    
}

function filterByState(array){
    var state =[]; 
    
    if(document.getElementById("create-option").value == "all"){
       printTable(array);  
    }
    else{
        for(let i=0; i < array.length;i++){
            if( document.getElementById("create-option").value == array[i].state){
                state.push(array[i])
            }
            
        }
        printTable(state);        
    }
        
}