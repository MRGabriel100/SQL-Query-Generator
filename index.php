<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Query Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <header>

        <form action="">

        <input type="text" name="bdName" placeholder="Database Name">
        <input type="number" name="bdIp"  placeholder="IP">
        <input type="number" name="bdPort"  placeholder="Port">
        <input type="text" name="bdUser"  placeholder="User">
        <input type="text" name="bdPass" placeholder="Password">
        <button>Connect DataBase</button>
        </form>
    </header>

    <section>

        <section id="Tables">
            <ul></ul>
        </section>

        <section id="Canva">

            <ul id="componentList">
                <li>Components V</li>
            </ul>
        </section>

        <section id="Queries">

            <input type="text" name="queryTxt" id="queryText">
        </section>

        <section id="result">

        <table id="queryResults"></table>
        </section>
    </section>
</body>

<script src="/js/components.js"></script>
<script src="/js/functions.js"></script>
<script src="/js/script.js"></script>
</html>