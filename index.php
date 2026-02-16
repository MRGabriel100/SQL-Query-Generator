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

        <form action="" id="connection">

        <input type="text" name="dbName" placeholder="Database Name">
        <input type="text" name="dbIp"  placeholder="IP">
        <input type="number" name="dbPort"  placeholder="Port">
        <input type="text" name="dbUser"  placeholder="User">
        <input type="text" name="dbPass" placeholder="Password">
        <button>Connect DataBase</button>
        </form>
    </header>

    <section>

        <section id="Tables">
            <p>Tables</p>
            <ul id="tableList"></ul>
        </section>

        <section id="Canva">
            <ul id="blockList">

            </ul>
        </section>

        <section id="components">


            <ul id="componentList">
                <li>Components V</li>
            </ul>
        </section>
        
        <section id="queryCopy">
            <form action="POST">
            <textarea name="queryReady" id="textQuery"></textarea>
            <button type="submit">Test Query</button>
            <button type="button" onclick="copy(textQuery.value)">Copy Query</button>
            </form>
        </section>

        <section id="result">

        <table id="queryResults"></table>
        </section>
    </section>
</body>

<script src="./js/components.js"></script>
<script src="./js/functions.js"></script>
<script src="./js/script.js"></script>
</html>