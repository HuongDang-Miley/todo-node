// require code to read csv file
const fs = require('fs')
const loadTodos = fs.readFileSync('./todos.csv', 'utf8')

// require code to use readline function
const readline = require('readline')
const interface = readline.createInterface({ input: process.stdin, output: process.stdout })

// Create an array from csv file. 
const toDos = loadTodos.split('\n')
// console.log({toDos})

// Add number in front of each string in csv array, follow a comma
let addNumToToDos = function (arr) {
    let result = []
    let count = 1
    for (const sub of arr) {
        let str = ''
        str += `${String(count)},${sub}`
        count++
        result.push(str)
    }
    return result
}
let toDosAddedNum = addNumToToDos(toDos)
// console.log({toDosAddedNum})

// Convert csv array to a 2D array
let twoDArr = function (arr) {
    let result = []
    for (const row of arr) {
        result.push(row.split(','))
    }
    return result
}

let new2DArr = twoDArr(toDosAddedNum)
// console.log({new2D})

// Display 2D arr
const displayTodos = function (mulTiDArr) {
    let result = ''
    for (const row of mulTiDArr) {
        if (row[2] === 'unComplete' || row[2] === 'uncomplete') {
            result += `${row[0]} ${row[1]} - ❌\n`
        } else if (row[2] === 'complete') {
            result += `${row[0]} ${row[1]} - ✅\n`
        }
    }
    return result
}

let display = displayTodos(new2DArr)
// console.log(display)

const menu = `Your options are:
1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.`

const question1 = 'Add task'
const question2 = `\nHere're you current todos: \n${display} \nPick a todo to remove: `
const question3 = 'Type the number of task to mark it completed'
const question4 = 'Type  the number of task to mark it uncompleted'


const userInput = process.argv[2]

const saveTodos = function (arr) {
    // convert the 1d array to string as csv file
    let str = arr.join('\n')
    // rewrite this string on the exit todos.csv
    fs.writeFileSync('./todos.csv', str)
}

// Function remove use userInput
function remove(userInput) {
    console.log({ userInput })
    // display cu
    // let toDosAddedNum = addNumToToDos(toDos)
    let result = []
    let removedTask = ''
    let theRestTask = ''
    for (task of toDosAddedNum) {
        if (task[0] === userInput) {
            removedTask = `${task[0]} ${task[1]} ${task[2]}`
        } else if (task[0] !== userInput) {
            // theRestTask = `${task[1]} ${task[2]}`
            result.push(task.slice(2))
        }
    }
    console.log({theRestTask})
    console.log({result})
    console.log({removedTask})
    // console.log(`you removed ${removedTask} \n ${result}`)
    // save to csv file
    // saveTodos(result)
    console.log(result) 
    interface.close()
}

const add = function (userInput) {
    console.log({ toDos })
    // make an empty string to hold new task of userInput, follow ',unComplete'
    let newToDo = `${userInput},uncomplete`
    console.log({ newToDo })
    // push userInput to the toDos array
    toDos.push(newToDo)
    console.log(toDos.push(newToDo))
    // Save new task to existing csv file. // This func does not return anything
    saveTodos(toDos)
    // Add number to new task
    let addNum = addNumToToDos(toDos)
    console.log({ addNum })
    // Convert to 2D array
    let twoD = twoDArr(addNumToToDos(toDos))
    console.log({ twoD })
    // display the todo list again for user
    let result = displayTodos(twoD)
    console.log({ result })
    // Stop waiting for userInput
    interface.close()
}




const handleMenu = function (choice) {
    choice = choice * 1
    if (choice === 1) {
        interface.question(question1, add)
    } else if (choice === 2) {
        interface.question(question2, remove)
    } else if (choice === 3) {
        interface.question(question3, complete)
    } else if (choice === 4) {
        interface.question(question4, unComplete)
    } else {
        console.log('quit app')
        interface.close()
    }
}


interface.question(menu, handleMenu)
