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

        li.addEventListener('click', ()=> {
            createBlock(tableName);
        })

        const ul = document.createElement('ul');
        ul.classList.add('columnList');

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

//FUNCTION RESPONSIBLE FOR CREATING THE VISUAL BLOCKS
function createBlock(block){

    console.log(block);
}