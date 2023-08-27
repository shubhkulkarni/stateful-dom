export const err = (name: string,msg:string,stack:string) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            margin: 0;
            padding: 0;
        }
        .appError{
            background: #151515;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            padding: 0px 10%;
        }
        .errorCtr{
            background-color: #343434;
            padding: 15px;
            border-radius: 8px;
            color: #ffa5a5;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }
        .errHeader{
            font-size: 1.2em;
            font-weight: bold;
            color: #ff3939;
        }
        .errBodyStack{
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: start;
            align-items: center;
        }

        .errType{
            color: #ff3939;
        }

        .errContent, .errBody{
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="appError">

        <div class="errorCtr">
            <div class="errHeader">
                Stateful-Dom ${name ?? 'Error'}!
            </div>
            <code class="errBody">
                ${msg}
            </code>
            <div class="errBodyStack">
                <div class="errType">
                    Stack trace
                </div>
                <pre class="errContent">
                    ${stack}
                </pre>
            </div>

        </div>
    </div>
</body>
</html>`
}