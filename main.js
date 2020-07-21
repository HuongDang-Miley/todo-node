// require code to read csv file
const fs = require('fs')
const loadTodos = fs.readFileSync('./todos.csv', 'utf8')

// require code to use readline function
const readline = require('readline')
const interface = readline.createInterface({ input: process.stdin, output: process.stdout })

// create a 2D array from csv file
const toDos = loadTodos.split('\n')
const toDos2DArray = []
for (const row of toDos) {   
    toDos2DArray.push(row.split(','))
}

console.log({toDos})

const displayTodos = function (arr) {
    let result = ''
    let count = 1
    for (const row of arr) {
        if (row[1] === 'uncomplete') {
            result +=  `${count}. ${row[0]} - ❌\n`
            count ++
        } 
        if (row[1] === 'complete') {
            result += `${count}. ${row[0]} -  ✅\n`
            count ++
        }
    }
    return result
}


const menu = `Your options are:
1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.`

const question1 = 'Add task'
const question2 = 'Type the number of task to remove if'
const question3 = 'Type the number of task to mark it completed'
const question4 = 'Type  the number of task to mark it uncompleted'





const userInput = process.argv[2]

const add = function (userInput) {
    // make an empty array to hold userInput aka new todo task
    let newTodo = []
    // push userInput to the 1st index of empty array
    newTodo.push(userInput)
    // push 'incomplete' to the 2nd index of empty array
    newTodo.push('uncomplete')
    // push new array to the exist todo list 
    toDos2DArray.push(newTodo)
    // display the todo list again for user
    let display =  displayTodos(toDos2DArray)
    console.log('\n' + display)
    // save new array to the csv file
    saveTodos(toDos2DArray)
    interface.close()
}

console.log({toDos2DArray})


const saveTodos = function (twoDArr) {
    // Convert 2d arr back to 1d arr: convert each sub arr of the 2d array to string, push these strings into a new arr. 
    let arr = []
    for (const subArr of twoDArr) {
        arr.push(subArr.join(','))
    }
    // convert the 1d array to string as csv file
    let str = arr.join('\n')
    // rewrite this string on the exit todos.csv
    fs.writeFileSync('./todos.csv', str)
}

const remove = function(userInput) {

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
    }else {
        console.log('quit app')
        interface.close()
    }
}


interface.question(menu, handleMenu)
