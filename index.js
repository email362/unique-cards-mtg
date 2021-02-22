// ******************* Steps *****************************
// Goal: Create a program that reads a txt file of cards
// then removes the duplicate card names, and prints out
// the remaining unique cards in a new txt file formatted
// with a 1 in front of each card name, with only 1 card 
// on each line of the txt file
// -------------------------------------------------------
// 1: Read initial text file list
// 2: Remove duplicate names
// 3: Save remaining to an array
// 4: Sort the array
// 5: Write remaining names on new text file list
import fs from 'fs';
import readline from 'readline';

import {readFile, writeFile} from 'fs/promises';

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

function readInput(someTxtFile) {
    return readFile(someTxtFile,'utf-8');
}

function createArrOfLines(txtDoc) {
    return new Promise((resolve,reject) => {
        if(typeof txtDoc === 'string') {
            resolve(txtDoc.split('\n'));
        } else {
            reject('not a valid string value');
        }
    })
}

function sortArr(arr) {
    return new Promise((resolve, reject) => {
        if(arr === undefined) {
            return reject('nothing defined! no array to sort!')
        }
        resolve(arr.sort())
    })
}

function removeDuplicates(arr) {
    return new Promise((resolve, reject) => {
        if(arr === undefined ) { return reject('undefined')}

        const uniqueArr = arr.filter((item, i, calledArr)=> {
            if(i === 0) {
                return true;
            } else {
                const arrOfPrev = calledArr.slice(i-1,i);

                return !arrOfPrev.includes(item);
            }


        })

        resolve(uniqueArr);

    })
}

// lineByLine()

readInput('list.txt').then(data => createArrOfLines(data)).then(data2 => sortArr(data2)).then(sorted => removeDuplicates(sorted)).then(unique => console.log(unique));


