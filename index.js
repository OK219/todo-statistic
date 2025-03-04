const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

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
    const TODOobj = {text : TODO, name : null, date : null};
    TODO = TODO.replace("// TODO ","");
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

// TODO you can do it!
