const Parse = require('./parser');
const generate = require('./gen_docx');

const inputText = `
{title} Lesson 1 - $date
{definition} This: word`;
let result = Parse(inputText);
console.log(result);
generate(result);