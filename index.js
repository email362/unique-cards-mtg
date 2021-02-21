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


