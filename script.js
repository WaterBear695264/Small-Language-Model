const response = await fetch('myfile.txt');
const text = await response.text();
console.log(text)