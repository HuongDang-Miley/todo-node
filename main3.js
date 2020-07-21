// require code to read csv file
const fs = require('fs')
const loadTodos = fs.readFileSync('./todos.csv', 'utf8')

// require code to use readline function
const readline = require('readline')
const interface = readline.createInterface({ input: process.stdin, output: process.stdout })

// Create an array from csv file. 
const toDos = loadTodos.split('\n')


// Convert csv array to a 2D array
const twoDArr = function (arr) {
    let result = []
    for (const row of arr) {
        result.push(row.split(','))
    }
    return result
}


// Display 2D arr
const displayTodos = function (mulTiDArr) {
    let result = ''
    let count = 1
    for (const row of mulTiDArr) {
        if (row[1] === 'uncomplete') {
            result += `${count}. ${row[0]} - ❌\n`
            count++
        } else if (row[1] === 'complete') {
            result += `${count}. ${row[0]} - ✅\n`
            count++
        }
    }
    return result
}

let new2DArr = twoDArr(toDos)
let display = displayTodos(new2DArr)


const menu =
`\nYour options are:\n
1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.
`

const question1 = 'Add task: '
const question2 = `
\nHere're you current todos: \n
\n${display}
\nPick a todo to remove: `
const question3 = `
\nHere're you current todos: \n
\n${display}
\nMark a todo complete: `
const question4 = `
\nHere're you current todos: \n
\n${display}
\nMark a todo uncomplete: `


// const userInput = process.argv[2]

const saveTodos = function (arr) {
    // convert the 1d array to string as csv file
    let str = arr.join('\n')
    // rewrite this string on the exit todos.csv
    fs.writeFileSync('./todos.csv', str)
}

// Function remove use userInput
function remove(userInput) {
    userInput = Number(userInput)
    let new2DArr = twoDArr(toDos)
    let result = []
    let removedTask = ''
    for (let i = 0; i < new2DArr.length; i++) {
        if (i + 1 === userInput) {
            removedTask = new2DArr[i][0].toUpperCase()
        } else {
            result.push(new2DArr[i])
        }
    }
    // save to csv file
    saveTodos(result)
    console.log(`
    \nYou removed: * ${removedTask}. Your Current Todos: \n
    \n${displayTodos(result)}
    `)
    interface.close()
}

const add = function (userInput) {
    // create new string that uncomplete
    let str = `${userInput},uncomplete`
    // push that string into string array aka todos
    toDos.push(str)
    // Save to todo list
    saveTodos(toDos)
    let currentTodos = displayTodos(twoDArr(toDos))
    console.log(`
    \nYour current todos:\n 
    \n${currentTodos}`)
    interface.close()
}

const complete = function (userInput) {
    userInput = Number(userInput)
    // loop through 2d array. use splice to change uncomplete to complete
    let twoD = twoDArr(toDos)
    for (let i = 0; i < twoD.length; i++) {
        if (i + 1 === userInput) {
            twoD[i].splice(1, 1, 'complete')
        }
    }
    // save new todos to csv
    // 1- reverse 2d to 1d array. 2- then run saveTodos() use that 1d array
    let oneD = []
    for (const subArr of twoD) {
        oneD.push(subArr.join(','))
    }
    saveTodos(oneD)

    // display new todo
    console.log(`
    \nYour current todos:\n 
    \n${displayTodos(twoD)}`)

    interface.close()
}

const uncomplete = function (userInput) {
    userInput = Number(userInput)
    // loop through 2d array. use splice to change uncomplete to complete
    let twoD = twoDArr(toDos)
    for (let i = 0; i < twoD.length; i++) {
        if (i + 1 === userInput) {
            twoD[i].splice(1, 1, 'uncomplete')
        }
    }
    // save new todos to csv:
    // 1- reverse 2d to 1d array. 2- then run saveTodos() use that 1d array
    let oneD = []
    for (const subArr of twoD) {
        oneD.push(subArr.join(','))
    }
    saveTodos(oneD)

    // display new todo
    console.log(`
    \nYour current todos:\n 
    \n${displayTodos(twoD)}`)

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
        interface.question(question4, uncomplete)
    } else {
        console.log('quit app')
        interface.close()
    }
}

interface.question(menu, handleMenu)
