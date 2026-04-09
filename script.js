const response = await fetch('testFile.txt');
const text = await response.text();
let newText = text.replace(/[{}();|<>~,!?@#$%^&*.:_—]/g, "");
newText = newText.replace(/\n/g, " ")
newText = newText.replace(/\s\s+/g, ' ');
newText = newText.replace(/[A-Z]/g, (match) => {
    return match.toLowerCase()
})

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

let bookArray = createBookArray();
let freqMap = createMap(bookArray)

console.log("all I do is win", bookArray, uniqueArray, freqMap);


