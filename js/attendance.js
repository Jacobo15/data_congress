var data;

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
  method: "GET",
  headers: {
    "X-API-Key": "ZGBdCoe2rjT0VqtlcYLj6oTzWnhd6N6Fzx1A14rX"
  }
})
  .then(function(response) {
    
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(function(json) {
    data = json;
    var members = data.results[0].members;
var democrat = [];
var republican = [];
var independent = [];
var democrat_percenatatge = 0;
var independent_percenatatge = 0;
var republican_percentatge = 0;
 
// LLAMADA DE FUNCIONES
partyNumber(members);
percentatgeNumber(members);
leastVotes(members);
mostVotes(members);

var stadistic = {
    "Number_of_Democrats": democrat.length,
    "Number_of_Republicans": republican.length,
    "Number_of_Independents": independent.length,
    "Total": democrat.length + republican.length + independent.length,
    "Democrat_percentatge_votes": democrat_percenatatge/democrat.length,
    "Republican_percentatge_votes": republican_percentatge/republican.length,
    "Independent_percentatge_votes": independent_percenatatge/independent.length,
    "Total_percentatge": (democrat_percenatatge + republican_percentatge + independent_percenatatge) / members.length,          
        }

function partyNumber(array) {

    for (var i = 0; i < array.length; i++) {
        if (array[i].party == "R") {
            republican.push("R")
        } else if (array[i].party == "D") {
            democrat.push("D")
        } else {
            independent.push("I")
        }
    }

}


function percentatgeNumber(array) {

    for (var i = 0; i < array.length; i++) {
        if (array[i].party == "R") {
            republican_percentatge += + array[i].votes_with_party_pct;
        } else if (array[i].party == "D") {
            democrat_percenatatge += +array[i].votes_with_party_pct;
        } else {
            independent_percenatatge += +array[i].votes_with_party_pct;
        }
    }
}


function mostVotes(array) {
    var pct = 0.1;
    var most = [];
    var newarray = Array.from(array);

    function compare(a, b) {
        if (a.missed_votes_pct < b.missed_votes_pct) {
            return -1;
        }
        if (a.missed_votes_pct > b.missed_votes_pct) {
            return 1;
        }
        return 0;
    }

    newarray.sort(compare);

    var pctRounded = Math.round(newarray.length * pct)
    for (var i = 0; i < newarray.length; i++) {
        if (i < pctRounded) {
            most.push(newarray[i])
        }
        else if(most[most.length-1].missed_votes_pct == newarray[i].missed_votes_pct ){
                most.push(newarray[i])
                }
                else{
                break;
                }
    }
    
    printTableMost(most);

}

function leastVotes(array) {
    var pct = 0.1;
    var least = [];
    var newarray = Array.from(array);

    function compare(a, b) {
        if (a.missed_votes_pct > b.missed_votes_pct) {
            return -1;
        }
        if (a.missed_votes_pct < b.missed_votes_pct) {
            return 1;
        }
        return 0;
    }

    newarray.sort(compare);

var pctRounded = Math.round(newarray.length * pct)
    for (var i = 0; i < newarray.length; i++) {
        if (i < pctRounded) {
            least.push(newarray[i])
        }
        else if(least[least.length-1].missed_votes_pct == newarray[i].missed_votes_pct ){
                least.push(newarray[i])
                }
                else{
                break;
                }
    }
    printTableLeast(least);

}

function printTableLeast(array) {
    var tbl = document.getElementById("table-least");
    for (var i = 0; i < array.length; i++) {
        if (array[i].middle_name == null) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td")
            var td3 = document.createElement("td");
            td1.append(array[i].last_name + " " + array[i].first_name);
            td2.append(array[i].missed_votes);
            td3.append(array[i].missed_votes_pct + " %");
            tr.append(td1, td2, td3);
            tbl.append(tr);
        } 
        else {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            td1.append(array[i].last_name + " " + array[i].first_name + " " + array[i].middle_name);
            td2.append(array[i].missed_votes);
            td3.append(array[i].missed_votes_pct + " %");
            tr.append(td1, td2, td3);
            tbl.append(tr);
        }    
    }
}

function printTableMost(array) {
    var tbl = document.getElementById("table-most");
    for (var i = 0; i < array.length; i++) {
        if (array[i].middle_name == null) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td")
            var td3 = document.createElement("td");
            td1.append(array[i].last_name + " " + array[i].first_name);
            td2.append(array[i].missed_votes);
            td3.append(array[i].missed_votes_pct + " %");
            tr.append(td1, td2, td3);
            tbl.append(tr);
        } 
        else {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            td1.append(array[i].last_name + " " + array[i].first_name + " " + array[i].middle_name);
            td2.append(array[i].missed_votes);
            td3.append(array[i].missed_votes_pct + " %");
            tr.append(td1, td2, td3);
            tbl.append(tr);
        }    
    }
}

function printTableAll(object){
    if(object.Number_of_Independents == 0){
    var tr1 = document.getElementById("democrat-all");
    var tr2 = document.getElementById("republican-all")
    var tr3 = document.getElementById("independent-all")
    var tr4 = document.getElementById("total-all")
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td1.append(object.Number_of_Democrats);
    td2.append(object.Democrat_percentatge_votes.toFixed(2) +" %");
    tr1.append(td1,td2);
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    td3.append(object.Number_of_Republicans);
    td4.append(object.Republican_percentatge_votes.toFixed(2) + " %");
    tr2.append(td3,td4);
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    td5.append(object.Number_of_Independents);
    td6.append(0 + " %");
    tr3.append(td5,td6);
    var td7 = document.createElement("td");
    var td8 = document.createElement("td");
    td7.append(object.Total);
    td8.append(object.Total_percentatge.toFixed(2) + " %");
    tr4.append(td7,td8);
    }
    else{
      var tr1 = document.getElementById("democrat-all");
    var tr2 = document.getElementById("republican-all")
    var tr3 = document.getElementById("independent-all")
    var tr4 = document.getElementById("total-all")
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td1.append(object.Number_of_Democrats);
    td2.append(object.Democrat_percentatge_votes.toFixed(2) +" %");
    tr1.append(td1,td2);
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    td3.append(object.Number_of_Republicans);
    td4.append(object.Republican_percentatge_votes.toFixed(2) + " %");
    tr2.append(td3,td4);
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    td5.append(object.Number_of_Independents);
    td6.append(object.Independent_percentatge_votes.toFixed(2) + " %");
    tr3.append(td5,td6);
    var td7 = document.createElement("td");
    var td8 = document.createElement("td");
    td7.append(object.Total);
    td8.append(object.Total_percentatge.toFixed(2) + " %");
    tr4.append(td7,td8);   
    }
}
printTableAll(stadistic);
  })
  .catch(function(error) {
    // called when an error occurs anywhere in the chain
    console.log("Request failed: " + error.message);
  });

console.log(data);