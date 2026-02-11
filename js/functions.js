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
                createBlock(fun.template)
            })
            ul.appendChild(functionLi);
        });

        categoryLi.appendChild(ul);
        main.appendChild(categoryLi);
    });
}


//FUNCITION RESPONSIBLE FOR CREATING THE COMPONENTS BLOCKS
const canva = document.getElementById("canvaList");

function createBlock(block){
const container = document.createElement('li');

     const regex = /(\{.*?\}|\(\))/g;

    const parts = block.split(regex);

    parts.forEach(part => {
        if(part === ""){
            return
        }
        // Placeholder {}
        if(part.startsWith("{") && part.endsWith("}")){

            const input = document.createElement('input');
            input.placeholder = part.replace(/[{}]/g, '');

            container.appendChild(input);

        }
        // Função ()
        else if(part === "()"){

            const input = document.createElement('input');
            input.value = "( )";

            container.appendChild(input);

        }
        // Texto normal
        else{

            const input = document.createElement('input');
            input.value = part;

            container.appendChild(input);
        }

    });

canva.appendChild(container);
}