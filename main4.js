// require code to read csv file
const fs = require('fs')
const loadTodos = fs.readFileSync('./todos.csv', 'utf8')

// require code to use readline function
const readline = require('readline')
const interface = readline.createInterface({ input: process.stdin, output: process.stdout })

// 
// console.log({toDos})

// Create an array from csv file. 
let toDos = function () {
    const arr = loadTodos.split('\n')
    let toDosAddedNum = []
    let count = 1
    for (const sub of arr) {
        // Add number in front of each string in csv array, follow a comma
        let str = ''
        str += `${String(count)}.,${sub}`
        count++
        toDosAddedNum.push(str)
    }
    return toDosAddedNum
}

let toDosAddedNum = toDos()
console.log({toDosAddedNum})

// Convert csv array to a 2D array
let toDos2DArr = function () {
    let result = []
    for (const row of toDosAddedNum) {
        result.push(row.split(','))
    }
    return result
}

let toDos2D = toDos2DArr()
console.log({toDos2D})

// Display 2D arr
const displayTodos = function() {
    let result = ''
    for (const row of toDos2D) {
        if (row[2] === 'unComplete' || row[2] === 'uncomplete') {
            result += `${row[0]} ${row[1]} - ❌\n`
        } else if (row[2] === 'complete') {
            result += `${row[0]} ${row[1]} - ✅\n`
        }
    }
    return `\n Here're your current todos:\n \n${result}`
}

let display = displayTodos()
console.log(display)

const menu = `Your options are:
1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.`

const question1 = 'Add task'
const question2 = `\nType the number of task to remove it:\n \n${display}`
const question3 = 'Type the number of task to mark it completed'
const question4 = 'Type  the number of task to mark it uncompleted'


const userInput = process.argv[2]

const saveTodos = function (arr) {
    // convert the 1d array to string as csv file
    let str = arr.join('\n')
    // rewrite this string on the exit todos.csv
    fs.writeFileSync('./todos.csv', str)
}

// // const add = function (userInput) {
// //     console.log({ toDos })
// //     // make an empty string to hold new task of userInput, follow ',unComplete'
// //     let newToDo = `${userInput},unComplete`
// //     console.log({ newToDo })
// //     // push userInput to the toDos array
// //     toDos.push(newToDo)
// //     console.log(toDos.push(newToDo))
// //     // Save new task to existing csv file. // This func does not return anything
// //     saveTodos(toDos)
// //     // Add number to new task
// //     let addNum = addNumToToDos(toDos)
// //     console.log({ addNum })
// //     // Convert to 2D array
// //     let twoD = twoDArr(addNumToToDos(toDos))
// //     console.log({ twoD })
// //     // display the todo list again for user
// //     let result = displayTodos(twoD)
// //     console.log({ result })
// //     // Stop waiting for userInput
// //     interface.close()
// // }

// Function remove use userInput
function remove(userInput) {
    let removedTodo = ''
    let result = []
    for (const row of toDosAddedNum) {
        if(row[0] === userInput) {
            removedTodo = row
        } else {
            result.push(row)
        }
    }
    // save new result to todos list
    saveTodos(result)
    // convert that file to array again
    let toDosAddedNum = toDos()
    let toDos2D = toDos2DArr()
    let display = displayTodos()
    console.log( `Your remove ${removedTodo}\n ${display}`)
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
