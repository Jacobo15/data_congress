var url;

if(window.location.pathname.includes("senate")){
    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else if (window.location.pathname.includes("house")) {
    url = "https://api.propublica.org/congress/v1/113/house/members.json"
}
    if (localStorage.getItem(url)) {
    var members = JSON.parse(localStorage.getItem(url));
     printTable(members);
    dropdown(members);
     document.getElementById("loading").style.display = "none"; 
    document.getElementById("republican-checkbox").addEventListener("click", function () {
            filterByParty(members);
        });

        document.getElementById("democrat-checkbox").addEventListener("click", function () {
            filterByParty(members);

        });

        document.getElementById("independent-checkbox").addEventListener("click", function () {
            filterByParty(members);
        });

        document.getElementById("create-option").addEventListener("change", function () {
            filterByParty(members);
        });
}
else{
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
        // LLAMADA DE FUNCIONES
        printTable(members);
        dropdown(members);

        document.getElementById("loading").style.display = "none";

        document.getElementById("republican-checkbox").addEventListener("click", function () {
            filterByParty(members);
        });

        document.getElementById("democrat-checkbox").addEventListener("click", function () {
            filterByParty(members);

        });

        document.getElementById("independent-checkbox").addEventListener("click", function () {
            filterByParty(members);
        });

        document.getElementById("create-option").addEventListener("change", function () {
            filterByParty(members);
        });




    })
    .catch(function (error) {
        // called when an error occurs anywhere in the chain
        console.log("Request failed: " + error.message);
    });
}


// FUNCIONES
function printTable(array) {
    document.getElementById("senate-data").innerHTML = ""
    var content = "";
    if (array.length != 0) {
        document.getElementById("nothing").style.display = "none";
        for (var i = 0; i < array.length; i++) {
            if (array[i].middle_name == null) {
                content += "<tr><td><a href=" + array[i].url + ">" + array[i].last_name + ", " + array[i].first_name + " " + "</a></td><td>" + array[i].party + "</td><td>" + array[i].state + "</td><td>" + array[i].seniority + "</td><td>" + array[i].votes_with_party_pct + " %" + "</td></tr>";
            } else {
                content += "<tr><td><a href=" + array[i].url + ">" + array[i].last_name + ", " + array[i].first_name + " " + array[i].middle_name + "</a></td><td>" + array[i].party + "</td><td>" + array[i].state + "</td><td>" + array[i].seniority + "</td><td>" + array[i].votes_with_party_pct + " %" + "</td></tr>";
            }
            document.getElementById("senate-data").innerHTML = content;
        }
    } else {
       document.getElementById("nothing").style.display = "block"; 
    }

}


function filterByParty(array) {
    var partycheck = document.querySelectorAll('input[name=party]:checked');
    var newParty = Array.from(partycheck);
    var newPartyCheck = newParty.map(input => input.value);
    var parties = []
    if (partycheck.length == 0) {
        filterByState(array);
    } else {
        for (var i = 0; i < array.length; i++) {
            if (newPartyCheck.includes(array[i].party)) {
                parties.push(array[i])
            }
        }
        filterByState(parties);
    }

}



function dropdown(array) {
    var states = [];
    for (var i = 0; i < array.length; i++) {
        if (!states.includes(array[i].state)) {
            states.push(array[i].state)
        }
        states.sort();
    }

    createOption(states);
}

function createOption(array) {
    var dropdown = document.getElementById("create-option");
    for (var i = 0; i < array.length; i++) {
        var opt = document.createElement("option");
        opt.setAttribute("value", array[i]);
        opt.append(array[i]);
        dropdown.append(opt);
    }
}

function filterByState(array) {
    var state = [];

    if (document.getElementById("create-option").value == "all") {
        printTable(array);
    } else {
        for (let i = 0; i < array.length; i++) {
            if (document.getElementById("create-option").value == array[i].state) {
                state.push(array[i])
            }

        }
        printTable(state);
    }

}
