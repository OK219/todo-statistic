const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');
const { Console } = require('console');

const files = getFiles().filter(x => !x.includes('index.js'));

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    const args = command.split(" ");
    switch (args[0]) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            showTODO();
            break;
        case 'important':
            showImportantTODO();
            break;
        case 'user':
            showUserTODO(args[1]);
            break;
        case 'sort':
            showSortedTODO(args[1]);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function getAllTODOs() {
    const todos = [];
    files.forEach(file => {
        const lines = file.split('\n');
        lines.forEach(line => {
            if (line.includes('// TODO')) {
            
                todos.push(parseTODO(line.trim()));
            }
        });
    });
    return todos;
}

function parseTODO(TODO) {
    const TODOobj = {text : null, name : null, date : null};
    TODO = TODO.split("// TODO ")[1];
    TODOobj.text = "// TODO " + TODO;
    const data = TODO.split(";");
    if (data.length == 3) {
        TODOobj["name"] = data[0];
        TODOobj["date"] = data[1].trim();
    }
    return TODOobj;
}

function showTODO() {
    const todos = getAllTODOs();
    todos.forEach(todo => console.log(todo["text"]));
}

function showImportantTODO() {
    const todos = getAllTODOs();
    const importantTodos = todos.filter(todo => todo["text"].includes('!'));
    importantTodos.forEach(todo => console.log(todo["text"]));
}

function showUserTODO(user) {
    const todos = getAllTODOs();
    const userTODOS = todos.filter(todo => todo["name"] == user);
    userTODOS.forEach(todo => console.log(todo["text"]))
}

function showSortedTODO(sortBy) {
    const todos = getAllTODOs();
    switch(sortBy) {
        case "important":
            todos.sort((todo1,todo2) => {
                const has1 = todo1["text"].includes("!");
                const has2 = todo2["text"].includes("!");
                if (has1 && has2) return 0;
                if (has1) return -1;
                return 1;
            })
            break;
        case "user":
            todos.sort((todo1,todo2) => {
                    if (todo1["name"] == "Anonymous Developer") return 1;
                    if (todo2["name"] == "Anonymous Developer") return -1;
                    return todo1["name"] > todo2["name"];
                })
        case "date":
            todos.sort((todo1,todo2) => {
                date1 = Date.parse(todo1["date"]);
                date2 = Date.parse(todo2["date"]);
                if (date1 > date2) return -1;
                if (date1 == date2) return 0;
                return 1;
            })
        default:
            todos.forEach(todo => console.log(todo["text"]));
            break;
    }
}

// TODO you can do it!
