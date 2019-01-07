let homePage = document.getElementById("home");
let aboutPage = document.getElementById("about");
aboutPage.style.display = "none";
function showHomePage() {
    var x = document.getElementById("home");
    var y = document.getElementById("about");
    if (homePage.style.display === "none") {
        homePage.style.display = "block";
        aboutPage.style.display = "none";
    } else {
        homePage.style.display = "none";
        aboutPage.style.display = "none";
    }
}

function showAboutPage() {
    var aboutPage = document.getElementById("about");
    var homePage = document.getElementById("home");
    if (aboutPage.style.display === "none") {
        aboutPage.style.display = "block";
        homePage.style.display = "none";
    } else {
        aboutPage.style.display = "none";
        homePage.style.display = "none";
    }
}

var trainsArray = [{
	name: 'Shinkansen 500 Series',
	speed: '220 mph',
	weigth: '1324 kg'
}, {
	name: 'Shanghai Maglev',
	speed: '267 mph',
	weigth: '1000 kg'
}];

function displayTable(trains)
{   // variabila table pe care vom adauga randuri
    var table = document.getElementById('trains');
    // ciclam prin vectorul de trenuri pentru a lua fiecare tren in parte
    for (var i = 0; i < trains.length; ++i)
    {   // pastram o referinta pentru fiecare tren in parte
        var train = trains[i];

        // cream randul
        var row = document.createElement('tr');

        // salvam proprietatile randului
        var properties = ['name', 'speed', 'weigth'];

        // le inseram pe fiecare in parte in rand
        for (var j = 0; j < properties.length; ++j)
        {
            var cell = document.createElement('td');

            cell.innerHTML = train[properties[j]];
            // adaugam pentru a termina randul
            row.appendChild(cell);
        }
        var cell = document.createElement('td');
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.className = "button";
        cell.appendChild(button);
        row.appendChild(cell);
        button.addEventListener ("click", function(btn) {
            btn.composedPath()[3].removeChild(btn.composedPath()[2]);
        } )
        // adaugam un nou rand in tabela
        table.appendChild(row);
    }
}

function saveTrain()
{
    var name = document.getElementById("name").value;
    var speed = document.getElementById("speed").value;
    var weigth = document.getElementById("weigth").value;
    var train = [{
        name: name,
        speed: speed,
        weigth: weigth
    }];
    trainsArray.push(train);
    displayTable(train);
}

displayTable(trainsArray);