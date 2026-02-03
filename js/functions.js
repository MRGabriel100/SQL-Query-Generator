const connect = document.getElementById('connection');

connect.addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(connect);

    fetch('./php/connect.php', {

        method: "POST",
        body: formData
    })
    .then(result => result.json())
    .then(data => console.log(data));
})