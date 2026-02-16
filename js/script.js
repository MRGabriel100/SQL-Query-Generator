//LOAD OPERATORS LIST
window.onload = loadOperators();

//CONNECT WITH THE DB AND PREVENT THE PAGE FROM RELOADING

const connect = document.getElementById('connection');

connect.addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(connect);

    fetch('./php/connect.php', {

        method: "POST",
        body: formData
    })
    .then(result => result.json())
    .then(data => tableList(data));
});

//CONTROL THE DRAGGABLE OBJECTS
const list = document.getElementById("blockList");

let draggedItem = null;

list.addEventListener("dragstart", (e) => {
    draggedItem = e.target;
    e.target.classList.add("dragging");
});

list.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(list, e.clientX);
    
    if (afterElement == null) {
        list.appendChild(draggedItem);
    } else {
        list.insertBefore(draggedItem, afterElement);
    }

});

list.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    draggedItem = null;
    textQuery();
});

//TEST THE QUERY AND PREVENT THE PAGE FROM RELOADING
