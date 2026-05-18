const response = await fetch('testFile.txt');
const text = await response.text();
const finalText = document.getElementById("final")
const btn = document.getElementById('button');
const emailBox = document.getElementById('input')

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
    if(freqMap[starterWord]){
        let keyArr = Object.keys(freqMap[starterWord]);
        let weightedArr = []
        for(let i = 0; i < keyArr.length; i++){
            for(let j = 0; j < freqMap[starterWord][keyArr[i]]; j++){
                weightedArr.push(keyArr[i])
            }
        } 
        let randy = getRandomInt(0, weightedArr.length) 
        if(length === 0){
            return ""
        }else{
            return weightedArr[randy] + " " + makeSentance(weightedArr[randy], freqMap, length-1)
        }
}else{
    return ": is not a word, try another word, this word either has upppercase letters or is not in the text"
}
}

const makeSentanceFixed = (starterWord, freqMap, length) => {
    return starterWord + " " + makeSentance(starterWord, freqMap, length);
}

let bookArray = createBookArray();
let freqMap = createMap(bookArray)
btn.addEventListener('click', function() {
    let sentance = makeSentanceFixed(emailBox.value, freqMap, 100)
    emailBox.value = ""
    finalText.innerHTML = sentance;
});



