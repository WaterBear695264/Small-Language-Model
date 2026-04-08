const response = await fetch('testFile.txt');
const text = await response.text();
let newText = text.replace(/[{}();|<>~,!?@#$%^&*.:_—]/g, "");
newText = newText.replace(/\n/g, " ")
newText = newText.replace(/\s\s+/g, ' ');
newText = newText.replace(/[A-Z]/g, (match) => {
    return match.toLowerCase()
})
let newArr = []

for(let i = 0; i < newText.length; i++){
    if(newText[i] === " "){
        if(!newArr.includes(newText.substring(0, i))){
            newArr.push(newText.substring(0, i))
            newText = newText.substring(i+1)
            i = 0
        }else{
            newText = newText.substring(i+1)
            i = 0
        }

    }
}



let freqMap = {};

const createMap = (starterObject) => {
    for(let i = 0; i < newText.length; i++){
        if(newText[i] === " "){
            if(!newArr.includes(newText.substring(0, i))){
                starterObject[newText.substring(0, i)] = {}
                newText = newText.substring(i+1)
                i = 0
            }else{
                newText = newText.substring(i+1)
                i = 0
            }

    }
}


console.log("all I do is win", newText, newArr);


