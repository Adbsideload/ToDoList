console.log("working!")
showNotes();

// Clearing local storage
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function clearClick(notes) {
    localStorage.clear();
    showNotes();
});


// Adding notes to localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let titleTxt = document.getElementById("titleTxt");
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj={
        title:titleTxt.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    titleTxt.value = "";
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    // notesObj.forEach(function (element, index,TitleVal) {
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h4 class="card-title">${index+1 + ") " + element.title}</h4>
                        <p class="card-text"> ${element.text}</p>
                        
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                        </div>
                        </div>`;
                        
                        // <h2>${TitleVal}</h2>
                        // <button id="${index}"onclick="style='background-color:red'" class="btn btn-success">Mark Important</button>
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<span style='color: red;'><b>Nothing to show! Use "Add a Note" section above to add notes.</b></span>`;

    }


}
// Function to delete a note
function deleteNote(index) {
    console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
// Adding search function
let search = document.getElementById("searchTxt")
search.addEventListener("input", function () {
    InputVal = search.value.toLowerCase();
    console.log("Input event fired", InputVal)
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(InputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
});

// Adding Title
// let title = document.getElementById("titleTxt")
// title.addEventListener("input", function () {
//     TitleVal = title.value.toUpperCase();
//     TitleVal.value = "";
//     console.log("Inputing Title", TitleVal)
//     let noteCards = document.getElementsByClassName('noteCard');
//     Array.from(noteCards).forEach(function (element) {
//         let titleTxt = element.getElementsByTagName("h2")[0].innerText;
//     })
    
// });