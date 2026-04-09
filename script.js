const response = await fetch('testFile.txt');
const text = await response.text();
let newText = text.replace(/[{}();|<>~,!?@#$%^&*.:_—]/g, "");
newText = newText.replace(/\n/g, " ")
newText = newText.replace(/\s\s+/g, ' ');
newText = newText.replace(/[A-Z]/g, (match) => {
    return match.toLowerCase()
})

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const createBookArray = () => {
    let newArr = []
    for(let i = 0; i < newText.length; i++){
    if(newText[i] === " "){
            newArr.push(newText.substring(0, i))
            newText = newText.substring(i+1)
            i = 0
    }
}
    return newArr
}

const createMap = (starterArray) => {
    let starterObject = {}
    for(let i = 0; i < starterArray.length; i++){
        if(!starterObject[starterArray[i]]){
            starterObject[starterArray[i]]={}
        }
        if(!starterObject[starterArray[i]][starterArray[i+1]]){
            starterObject[starterArray[i]][starterArray[i+1]] = 1
        }else{
            starterObject[starterArray[i]][starterArray[i+1]]++;
        }
}
return starterObject
}

const makeSentance = (starterWord, freqMap, length) => {
    console.log("lebronnnnn", starterWord)
    let keyArr = Object.keys(starterWord);
    let weightedArr = []
    for(let i = 0; i < keyArr.length; i++){
        for(let j = 0; j < starterWord[keyArr[i]]; j++){
            weightedArr.push(keyArr[i])
        }
    } 
    let randy = getRandomInt(0, weightedArr.length+1) 
    if(length === 0){
        console.log("terminator")
        return ""
    }else{
        console.log()
        return weightedArr[randy] + " " + makeSentance(freqMap[weightedArr[randy]], length-1)
    }
}

let bookArray = createBookArray();
let freqMap = createMap(bookArray)
let sentance = makeSentance(freqMap["book"], freqMap, 7)

console.log("all I do is win", bookArray, freqMap, "asdf", freqMap["book"]);


