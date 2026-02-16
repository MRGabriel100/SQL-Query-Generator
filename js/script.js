//LOAD OPERATORS LIST
window.onload = loadOperators();

//CONNECT WITH THE DB AND PREVENT THE PAGE FROM RELOADING


const handlers = {
    connect: async (responseData) => {
      tableList(responseData);
    },
    testQuery: async (responseData) => {
        console.log("Test Query:", responseData);
    },
}
document.addEventListener('submit',async e => {

    e.preventDefault();
    const form = e.target;
    const url = form.action;
    const method = form.method;
    const handlerName = form.dataset.handler;

    try {

        const response = await fetch(url,{
            method,
            body: new FormData(form)
        });

        const data = await response.json();

        handlers[handlerName](data);
         
    } catch (error) {
        console.error(error);
    }
  
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
