// ******************* Steps *****************************
// Goal: Create a program that reads a txt file of cards
// then removes the duplicate card names, and prints out
// the remaining unique cards in a new txt file formatted
// with a 1 in front of each card name, with only 1 card 
// on each line of the txt file
// -------------------------------------------------------
// 1: Read initial text file list
// 2: Remove duplicate names
// 3: Write remaining names on new text file list
const fs = require('fs')
const readline = require('readline')

const readfile = './list.txt'

let cardArr = [];

const doesExist = card => cardArr.includes(card)

const addToArr = (cardFromFile) => {
    if(!doesExist(cardFromFile)) {
        cardArr.push(cardFromFile)
    }
}

async function lineByLine() {
    const fileStream = fs.createReadStream(readfile);

    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity});

    for await (const line of rl) {
        addToArr(line+'\n'); 
    }
    
    const getData = (randArr) => {
        Promise.all(randArr.sort().forEach((item) => {
            fs.appendFile('uniqueCards.txt','1 '+ item, (err) => {
                if (err) {
                    return 'error'
                }
            })
        })).then((arrOfData) => console.log(arrOfData))

    }
    getData(cardArr)
    // Promises.all(sortedArr.forEach(item => {
    //     fs.appendFile('uniqueCards.txt','1 '+ item, (err) => {
    //         if (err) {
    //             return 'error'
    //         }
    //     })
    // })).then(arrData => console.log(arrData))

}




lineByLine()


