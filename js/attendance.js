var url;

if (window.location.pathname.includes("senate")) {
    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else if (window.location.pathname.includes("house")) {
    url = "https://api.propublica.org/congress/v1/113/house/members.json"
}
if (localStorage.getItem(url)) {
    var members = JSON.parse(localStorage.getItem(url));
    partyNumber(members);
    leastVotes(members);
    mostVotes(members);
    document.getElementById("loading").style.display = "none";
} else {
    callFetch(url);
}


function callFetch(url) {
    fetch(url, {
            method: "GET",
            headers: {
                "X-API-Key": "CXbw1umHPCTbBYJjWJOToNhWKGQTfTONlxNaFo7i"
            }
        })
        .then(function (response) {

            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (json) {

            var members = json.results[0].members;

            localStorage.setItem(url, JSON.stringify(members));
            console.log(members)
            // LLAMADA DE FUNCIONES
            partyNumber(members);
            leastVotes(members);
            mostVotes(members);
            console.log(members);

            document.getElementById("loading").style.display = "none";
        })
        .catch(function (error) {
            // called when an error occurs anywhere in the chain
            console.log("Request failed: " + error.message);
        });
}


function partyNumber(array) {

    var democrat = [];
    var republican = [];
    var independent = [];
    var democrat_percenatatge = 0;
    var independent_percenatatge = 0;
    var republican_percentatge = 0;


    var stadistic = {
        "Number_of_Democrats": 0,
        "Number_of_Republicans": 0,
        "Number_of_Independents": 0,
        "Total": 0,
        "Democrat_percentatge_votes": 0,
        "Republican_percentatge_votes": 0,
        "Independent_percentatge_votes": 0,
        "Total_percentatge": 0,
    }


    for (var i = 0; i < array.length; i++) {
        if (array[i].party == "R") {
            republican.push("R")
            republican_percentatge += +array[i].votes_with_party_pct
        } else if (array[i].party == "D") {
            democrat.push("D")
            democrat_percenatatge += +array[i].votes_with_party_pct
        } else {
            independent.push("I")
            independent_percenatatge += +array[i].votes_with_party_pct
        }

    }


    stadistic.Number_of_Democrats = democrat.length;
    stadistic.Number_of_Republicans = republican.length;
    stadistic.Number_of_Independents = independent.length;
    stadistic.Total = democrat.length + republican.length + independent.length;
    stadistic.Democrat_percentatge_votes = democrat_percenatatge / democrat.length;
    stadistic.Republican_percentatge_votes = republican_percentatge / republican.length;
    stadistic.Independent_percentatge_votes = independent_percenatatge / independent.length;
    stadistic.Total_percentatge = (democrat_percenatatge + republican_percentatge + independent_percenatatge) / array.length;


    printTableAll(stadistic);

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
        } else if (most[most.length - 1].missed_votes_pct == newarray[i].missed_votes_pct) {
            most.push(newarray[i])
        } else {
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
        } else if (least[least.length - 1].missed_votes_pct == newarray[i].missed_votes_pct) {
            least.push(newarray[i])
        } else {
            break;
        }
    }
    printTableLeast(least);

}

function printTableLeast(array) {
    var tbl = document.getElementById("table-least");
    for (var i = 0; i < array.length; i++) {

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td")
        var td3 = document.createElement("td");
        if (array[i].middle_name == null) {
            td1.append(array[i].last_name + " " + array[i].first_name);
        } else {
            td1.append(array[i].last_name + " " + array[i].first_name + " " + array[i].middle_name);
        }
        td2.append(array[i].missed_votes);
        td3.append(array[i].missed_votes_pct + " %");
        tr.append(td1, td2, td3);
        tbl.append(tr);
    }
}

function printTableMost(array) {
    var tbl = document.getElementById("table-most");
    for (var i = 0; i < array.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td")
        var td3 = document.createElement("td");
        if (array[i].middle_name == null) {
            td1.append(array[i].last_name + " " + array[i].first_name);
        } else {
            td1.append(array[i].last_name + " " + array[i].first_name + " " + array[i].middle_name);
        }
        td2.append(array[i].missed_votes);
        td3.append(array[i].missed_votes_pct + " %");
        tr.append(td1, td2, td3);
        tbl.append(tr);
    }
}

function printTableAll(object) {
    var tr1 = document.getElementById("democrat-all");
    var tr2 = document.getElementById("republican-all")
    var tr3 = document.getElementById("independent-all")
    var tr4 = document.getElementById("total-all")
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td1.append(object.Number_of_Democrats);
    td2.append(object.Democrat_percentatge_votes.toFixed(2) + " %");
    tr1.append(td1, td2);
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    td3.append(object.Number_of_Republicans);
    td4.append(object.Republican_percentatge_votes.toFixed(2) + " %");
    tr2.append(td3, td4);
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    td5.append(object.Number_of_Independents);
    if (object.Number_of_Independents == 0) {
        object.Independent_percentatge_votes = 0
    }
    td6.append(object.Independent_percentatge_votes.toFixed(2) + " %");
    tr3.append(td5, td6);
    var td7 = document.createElement("td");
    var td8 = document.createElement("td");
    td7.append(object.Total);
    td8.append(object.Total_percentatge.toFixed(2) + " %");
    tr4.append(td7, td8);
}
