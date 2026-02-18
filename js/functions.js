
//FUNCTION RESPONSIBLE FOR GENERATING THE VISUAL LIST
function tableList(data){

    const listEl = document.getElementById('tableList');
    listEl.innerHTML = '';

    Object.keys(data).forEach(tableName => {

        const li = document.createElement('li');
        li.innerText = tableName;
        li.classList.add("menu-item");

        li.addEventListener('click', ()=> {
            createBlock(tableName);
        })

        const ul = document.createElement('ul');
        ul.classList.add('columnList', "submenu");

        data[tableName].columns.forEach(column => {

            const colLi = document.createElement('li');
            colLi.innerText = column;

              colLi.addEventListener('click', (e)=>{
                e.stopPropagation();
            createBlock(column);
        })

            ul.appendChild(colLi);
        });

        li.appendChild(ul);
        listEl.appendChild(li);
    });
}

function loadOperators(){

    fetch("./js/operators.json")
    .then(response => response.json())
    .then(data => createComponent(data));
}
//FUNCTION RESPONSIBLE FOR CREATING THE VISUAL COMPONENTS
function createComponent(component){

    const main = document.getElementById('componentList');
    main.innerHTML = "";

    Object.keys(component).forEach(category => {

        const categoryLi = document.createElement('li');
        categoryLi.innerText = category;
        categoryLi.classList.add('menu-item');

        const ul = document.createElement('ul');
        ul.classList.add("submenu");
        
        component[category].forEach(fun => {

            const functionLi = document.createElement('li');
            functionLi.innerText = fun.name;
            functionLi.addEventListener('click', () => {
                createBlock(fun.template, fun.name);
            })
            ul.appendChild(functionLi);
        });

        categoryLi.appendChild(ul);
        main.appendChild(categoryLi);
    });
}


//FUNCITION RESPONSIBLE FOR CREATING THE COMPONENTS BLOCKS
const canva = document.getElementById("blockList");

function createBlock(block, name){
const container = document.createElement('li');
      container.id = `${name}_id`;
      container.draggable = 'true';
      const regex = /(\{.*?\}|\(\))/g;

      
        //GONNA BE NECESSARY TO  BUILD A CHECKER TO PREVENT DUPLICATED IDS
        const x = document.createElement('button');
        x.addEventListener("click", () => {removeBlock(`${name}_id`)});
        x.innerText = "X";

    const parts = block.split(regex);

    parts.forEach(part => {
        if(part === ""){
            return
        }
        
        const input = document.createElement('input');
        input.classList.add('blockItem')
        // Placeholder {}
        if(part.startsWith("{") && part.endsWith("}")){

            input.placeholder = part.replace(/[{}]/g, '');

        }
        else if(part === "()"){

            input.value = "( )";

        }
        else{

            input.value = part;

        }

            container.appendChild(input);
    });

    container.appendChild(x);
    canva.appendChild(container);

    textQuery();
}

//THE NAME IS SELF-EXPLANATORY
function removeBlock(blockId){
    const block = document.getElementById(blockId);

    block.remove();
    textQuery();

}

//CREATE THE COPYABLE QUERY
function textQuery(){

    const queryCopy = document.getElementById("textQuery");
    const blockList = [...document.querySelectorAll(".blockItem")];

    const query = blockList.reduce((query, input) => {
        
        return `${query} ${input.value}`;
    }, "");

    queryCopy.value = query;
}

function copy(value){

    navigator.clipboard.writeText(value);


}

//ORGANIZE THE DRAGGED ELEMENT

function getDragAfterElement(container, x) {
    const draggableElements = [
        ...container.querySelectorAll("li:not(.dragging)")
    ];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

//CREATES THE TABLES
function createTable(values) {


    const table = document.getElementById('queryResults');
    table.innerHTML = "";

    const resultMsg = document.getElementById('resultMsg');


        //CHECKS IF THE VALUES IS A OBJECT, IF NOT INPUTS THE MESSAGE
    if(typeof values != "object"){

        resultMsg.innerText = values;

        return
    }
    resultMsg.innerText = "";

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');

    const columns = Object.keys(values);

    // Create the header
    columns.forEach(column => {
        const th = document.createElement('th');
        th.innerText = column;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    
    const rowCount = values[columns[0]].length;

    // Create Rows
    for (let i = 0; i < rowCount; i++) {

        const tr = document.createElement('tr');

        columns.forEach(column => {
            const td = document.createElement('td');
            td.innerText = values[column][i];
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
}
