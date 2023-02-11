// Assignment code here
//32 spec chars
//15+7+6+4=
const specialCharacters = []
let specCharPivot = 0
// chars 33-47
for(let i=33; i<48; i++){
  specialCharacters[specCharPivot] = String.fromCharCode(i)
  specCharPivot++
}
//chars 58-64
for(let i=58; i<65; i++){
  specialCharacters[specCharPivot] = String.fromCharCode(i)
  specCharPivot++
}
//chars 91-96
for(let i=91; i<97; i++){
  specialCharacters[specCharPivot] = String.fromCharCode(i)
  specCharPivot++
}
//chars 123-126
for(let i=123; i<127; i++){
  specialCharacters[specCharPivot] = String.fromCharCode(i)
  specCharPivot++
}

var minLength = 10
var maxLength = 20

var lowercase = false
var uppercase = false
var numbers = false
var special = false


function promptLength(){
  var processLength = confirm("Add password length criteria");
  if(processLength){
    while(true){
      var getMin = parseInt(prompt("Type the minimum length for the password"))
      console.log(typeof getMin)
      if(typeof getMin !== "number" || getMin<0){
        let errorMessage = alert("Please define minimum as positive integers.")
        continue
      }
      var getMax = parseInt(prompt("Type the maximum length for the password"))
      if(typeof getMax !== "number" || getMax<getMin){
        let errorMessage = alert("Maximum needs to be an integer greater than or equal to the minimum")
        continue
      }
      minLength = getMin
      maxLength = getMax
      break
    }
  }
}
function promptChars(){
  var processChars = confirm("Add password character criteria");
  if(processChars){
    let selectedOption = false
    while(!selectedOption){
      lowercase = confirm("Character criteria: include lowercase");
      uppercase = confirm("Character criteria: include uppercase");
      numbers = confirm("Character criteria: include numbers");
      special = confirm("Character criteria: include special characters");
      if(lowercase || uppercase || numbers|| special){
        selectedOption = true
      }else{
        let errorMessage = alert("Choose at least one option")
      }
    }
  }
}

function resetDefaults(){
  lowercase = false
  uppercase = false
  numbers = false
  special = false

  minLength = 10
  maxLength = 20
}

function generateIndexes(length){
  let quarter = (length-(length%4))/4;
  let lengthQuarters = [];
  lengthQuarters[0] = Math.round(Math.random()*(quarter-1))
  lengthQuarters[1] = Math.round(Math.random()*(quarter-1)+(quarter))
  lengthQuarters[2] = Math.round(Math.random()*(quarter-1)+(quarter*2))
  lengthQuarters[3] = Math.round(Math.random()*(quarter-1+(length%4))+(quarter*3))
  return lengthQuarters
}
/*
  Structure:
    -password length is generated
    -insert upper, lower, num, and spec are assigned index values based on forths of the string
*/
function generatePassword(){
  promptLength()
  promptChars()

  let password = ""
  let passwordLength = Math.round(Math.random()*(maxLength-minLength))+minLength
  console.log("Length is: "+passwordLength)

  /*
  This array contains randomly generated indexes of the password
  These indexes are pulled from quarters of the string to avoid generating duplicate indexes
  */
  let lengthQuarters = generateIndexes(passwordLength)

  /*
  If the user chooses to add a char restrictions, values from array are pushed to variables
  The array value is removed from the array each time it is pushed to a variable. This ensures each variable has a unique value
  */
  let randomizedIndex = lengthQuarters[Math.floor(Math.random()*3)]
  var insertLower = lowercase? randomizedIndex:-1
  lengthQuarters.splice(lengthQuarters.indexOf(randomizedIndex), 1)
  console.log("Lower index is "+insertLower)

  randomizedIndex = lengthQuarters[Math.floor(Math.random()*2)]
  var insertUpper = uppercase? randomizedIndex:-1
  lengthQuarters.splice(lengthQuarters.indexOf(randomizedIndex), 1)
  console.log("Upper index is "+insertUpper)

  randomizedIndex = lengthQuarters[Math.floor(Math.random()*1)]
  var insertNum = numbers? randomizedIndex:-1
  lengthQuarters.splice(lengthQuarters.indexOf(randomizedIndex), 1)
  console.log("Number index is "+insertNum)

  randomizedIndex = lengthQuarters[0]
  var insertSpec = special? randomizedIndex:-1
  console.log("Special index is "+insertSpec)

  /*
  Inserts chars based on parameters
  */
  for(let i=0; i<passwordLength; i++){
    if(insertLower===i){
      let addedChar = String.fromCharCode(Math.round(Math.random()*25)+97)
      password+=addedChar
      console.log("Inserted lowercase: "+addedChar+" at index "+i)
    }else if(insertUpper===i){
      let addedChar = String.fromCharCode(Math.round(Math.random()*25)+65)
      password+=addedChar
      console.log("Inserted uppercase: "+addedChar+" at index "+i)
    }else if(insertNum===i){
      let addedChar = String.fromCharCode(Math.round(Math.random()*9)+48)
      password+=addedChar
      console.log("Inserted number: "+addedChar+" at index "+i)
    }else if(insertSpec===i){
      let addedChar = specialCharacters[Math.round(Math.random()*31)]
      password+=addedChar
      console.log("Inserted special character: "+addedChar+" at index "+i)
    }else{
      password+=String.fromCharCode(Math.round(Math.random()*93)+33)
    }
  }
  console.log(password) //Print password

  resetDefaults()

  return password
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
