let homePage = document.getElementById("home");
let aboutPage = document.getElementById("about");
aboutPage.style.display = "none";
var disableAddButton = false;
var disableUpdateButton = true;
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

function getTrains() {
    fetch('http://localhost:3000/trains')
        .then(function (response) {
            // Trasform server response to get the trains
            response.json().then(function (trains) {
                displayTable(trains);
            });
        });
};

function postTrain() {
    // create post object
    if(!inputName.value || !inputSpeed.value || !inputWeigth.value) {
        window.alert("Toate campurile trebuiesc completate!");
        return false;
    }
    const postObject = {
        name: inputName.value,
        speed: inputSpeed.value,
        weigth: inputWeigth.value
    }
    // post dog
    fetch('http://localhost:3000/trains', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        // Get the new dogs list
        getTrains();
        // Reset Form
        resetForm();
    });
}

function deleteTrain(id) {
    // delete train
    fetch(`http://localhost:3000/trains/${id}`, {
        method: 'DELETE',
    }).then(function () {
       getTrains();
    });
}

// copy edited train information to form and add event listener on update button
function editTrain(train) {
    // copy train information to form
    inputName.value = train.name;
    inputSpeed.value = train.speed;
    inputWeigth.value = train.weigth;
    
    // disable add button
    addButton.disabled = true;
    clearUpdateButtonEvents();
    // enable and add event on update button
    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateTrain(train.id)
    });

}

function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}

function updateTrain(id) {
    // creat put object
    const putObject = {
        name: inputName.value,
        speed: inputSpeed.value,
        weigth: inputWeigth.value
    }
    // update dog
    fetch(`http://localhost:3000/trains/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        // Get the new trains table
        
        getTrains();

        // change button event from update to add
        addButton.disabled = false;
        updateButton.disabled = true;

        // Reset Form
        resetForm();
    });
}

function resetForm() {
    inputName.value = '';
    inputSpeed.value = '';
    inputWeigth.value = '';
}

function displayTable(trainsArray)
{   // variabila table pe care vom adauga randuri
    while (trains.firstChild) {
        trains.removeChild(trains.firstChild);
    }

    var table = document.getElementById('trains');

    var rowName = document.createElement('tr');
    var cellRowName = document.createElement('th');
    cellRowName.innerHTML = 'Name';
    rowName.appendChild(cellRowName);
    var cellRowSpeed = document.createElement('th');
    cellRowSpeed.innerHTML = 'Speed';
    rowName.appendChild(cellRowSpeed);
    var cellRowWeigth = document.createElement('th');
    cellRowWeigth.innerHTML = 'Weigth';
    rowName.appendChild(cellRowWeigth);
    var cellRowDelete = document.createElement('th');
    cellRowDelete.innerHTML = 'Delete';
    rowName.appendChild(cellRowDelete);
    var cellRowEdit = document.createElement('th');
    cellRowEdit.innerHTML = 'Edit';
    rowName.appendChild(cellRowEdit);

    table.appendChild(rowName);
    
    // ciclam prin vectorul de trenuri pentru a lua fiecare tren in parte
    for (var i = 0; i < trainsArray.length; ++i)
    {   // pastram o referinta pentru fiecare tren in parte
        var train = trainsArray[i];

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
            deleteTrain(train.id);
        } )
        var cell = document.createElement('td');
        var button = document.createElement("button");
        button.innerHTML = "Edit";
        button.className = "button";
        cell.appendChild(button);
        row.appendChild(cell);
        button.addEventListener ("click", function(btn) {
            editTrain(train);
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
    displayTable(train);
}

getTrains();