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
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            showTODO();
            break;
        case 'important':
            showImportantTODO();
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
                todos.push(line.trim());
            }
        });
    });
    return todos;
}

function showTODO() {
    const todos = getAllTODOs();
    todos.forEach(todo => console.log(todo));
}

function showImportantTODO() {
    const todos = getAllTODOs();
    const importantTodos = todos.filter(todo => todo.includes('!'));
    importantTodos.forEach(todo => console.log(todo));
}

// TODO you can do it!
