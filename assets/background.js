const optionBtns=document.querySelectorAll('.btn-option'); // all action btn list
const notebox = document.querySelector('#notes_box'); // note box 
const selection=window.getSelection(); // slected text

const getHighlightedText=()=> {
    let selectedText = "";
    if (selection) {
        selectedText = selection.toString();
    } else if (document.selection && document.selection.type !== "Control") {
        selectedText = document.selection.createRange().text;
    }
    return selectedText;
}


optionBtns.forEach((button)=>{
    button.addEventListener("click",()=>{
        const cmd = button.getAttribute('data-cmd');
       btnActionExc(cmd);
    });
});

const btnActionExc=(cmd)=>{
    let newElm='';
    if(cmd=='bold'){
        newElm='strong';
    }
    if(cmd=='italic'){
        newElm='i';
    }
    let text = getHighlightedText();
    let createElement = document.createElement(newElm);
    createElement.appendChild(document.createTextNode(text));
    var range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(createElement);

    setNotesLocalStorage(); //update notes 
}


//after dom load
document.addEventListener("DOMContentLoaded", function() {
    let notes =localStorage.getItem("daily_note");
    notebox.innerHTML=notes;
});

// 
notebox.addEventListener('input', function() {
    setNotesLocalStorage();
});


//set notes in local storage 
const setNotesLocalStorage=()=>{
   let notes = notebox.innerHTML;
    localStorage.setItem("daily_note",notes);
}


