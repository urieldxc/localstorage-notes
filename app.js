const activeBall = document.querySelector("#nueva-nota");
const colorBalls = document.querySelectorAll(".bolas-colores");
const noteContainer = document.querySelector(".note-grid");
const hiddenDiv = document.querySelector(".hiddenDiv")

getNotes().forEach(note =>{
    const noteElement = createNoteElement(note.id, note.title,note.text, note.noteColor, note.dateCreated);
    noteContainer.insertBefore(noteElement, hiddenDiv)
})

colorBalls.forEach(element => {
    element.addEventListener("click", ()=>{
        addNote(element.dataset.color);
    })
})

activeBall.addEventListener("click", ()=>{
    activeBall.classList.toggle("active");
    colorBalls.forEach(element => {
        element.classList.toggle("hidden")
    })
})

function getNotes(){
    const allNotes = JSON.parse(localStorage.getItem("notes") || "[]")
    return allNotes;
}

function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(id, title, text, color, data){
    const element = document.createElement("div");
    const div = document.createElement("div");
    const createdTitle = document.createElement("textarea");
    const createdText = document.createElement("textarea");
    const dateP = document.createElement("p")
    const deleteNote = document.createElement("img")

    element.classList.add("note");

    createChildElements(element, div, createdText, dateP, deleteNote,createdTitle);
    setColors(element, color);
    setChild(createdTitle, title, createdText, text, dateP, data)

    element.addEventListener("change", ()=>{
        updateNote(id, createdTitle.value, createdText.value)
    })
    
    deleteNote.addEventListener("click", ()=>{
        const doDelete = confirm("Seguro que quieres borrar la nota?")
            if(doDelete){
                eraseNote(id, element)
            }
    })
    return element;
}

function createChildElements(element, div, createdText, dateP, deleteNote, createdTitle){
    element.appendChild(div)
    element.appendChild(createdText);
    element.appendChild(dateP);
    element.appendChild(deleteNote)
    element.firstChild.classList.add("title-and-delete")
    element.firstChild.appendChild(createdTitle).id = "note-title"
    element.firstChild.appendChild(deleteNote)
    deleteNote.src= "public/delete-icon.svg";
    deleteNote.classList.add("deleteButton")
}

function setChild(createdTitle, title, createdText, text, dateP, data){
    createdTitle.placeholder = "Título"
    createdTitle.value = title;
    createdTitle.cols ="25"
    createdTitle.rows ="1"
    createdText.value= text;
    createdText.placeholder = "Añade texto..."
    createdText.cols = "30"
    createdText.rows = "10"
    dateP.textContent = `${data}`
}

function updateNote(id, title, text){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];
    targetNote.title = title;
    targetNote.text = text;
    saveNotes(notes);
}

function addNote(color){
    const notes = getNotes();
    const date = obtainDate();
    const noteObject = {
        id: Math.floor(Math.random()*100000),
        title: "",
        text: "",
        noteColor: color,
        dateCreated: date
    }
    const noteElement = createNoteElement(noteObject.id, noteObject.title, noteObject.text, color, noteObject.dateCreated);
    noteContainer.insertBefore(noteElement, hiddenDiv)
    notes.push(noteObject);
    saveNotes(notes)
}

function setColors(element, color){
    if(color == "yellow") element.classList.add("yellow")
    if(color == "pink") element.classList.add("pink")
    if(color == "blue") element.classList.add("blue")
    if(color == "green") element.classList.add("green")
    if(color == "orange") element.classList.add("orange")
    if(color == "violet") element.classList.add("violet")
    if(color == "red") element.classList.add("red")
}

function obtainDate(){
    const date = new Date();
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let stringDate = "";

    if(month < 10) stringDate = `${day}-0${month}-${year}`;
    return stringDate;
}

function eraseNote(id, element){
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    noteContainer.removeChild(element);
}