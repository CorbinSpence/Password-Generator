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

/* 
Returns true if user submitted length min is valid
*/
function isValidMin(min){
  if(isNaN(min)){
    return false
  }
  return !(typeof min !== "number" || min<8 || min>128)
}
/* 
Returns true if user submitted length max is valid
*/
function isValidMax(min, max){
  if(isNaN(max)){
    return false
  }
  return !(typeof max !== "number" || max<min || max>128)
}
/* 
Prompts user for length criteria
Min and max are left at default if user doesn't choose to add criteria
*/
function promptLength(){
  var processLength = confirm("Add password length criteria?");
  if(processLength){
    while(true){
      var getMin = parseInt(prompt("Type the minimum length for the password"))
      if(!isValidMin(getMin)){
        let errorMessage = alert("Please define minimum as positive integers greater than 8 and less than 129.")
        continue
      }
      var getMax = parseInt(prompt("Type the maximum length for the password"))
      if(!isValidMax(getMin, getMax)){
        let errorMessage = alert("Maximum needs to be at least equal to minimum and less than 129.")
        continue
      }
      minLength = getMin
      maxLength = getMax
      break
    }
  }
}
/* 
Prompts user for char criteria
Defaults to using all chars if user chooses to do nothing
*/
function promptChars(){
  var processChars = confirm("Add password character criteria?");
  if(processChars){
    let selectedOption = false
    while(!selectedOption){
      lowercase = confirm("Character criteria: include lowercase?");
      uppercase = confirm("Character criteria: include uppercase?");
      numbers = confirm("Character criteria: include numbers?");
      special = confirm("Character criteria: include special characters?");
      if(lowercase || uppercase || numbers|| special){
        selectedOption = true
      }else{
        let errorMessage = alert("Choose at least one option")
      }
    }
  }
}
/* 
Resets determining variables
*/
function resetDefaults(){
  lowercase = false
  uppercase = false
  numbers = false
  special = false

  minLength = 10
  maxLength = 20
}
/* 
Genarates random slots for each type of char to inhabit
*/
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
Returns random char based on allowed chars
*/
function generateRandChar(){
  let options = [];

  if(lowercase){
    options.push(String.fromCharCode(Math.round(Math.random()*25)+97))
  }
  if(uppercase){
    options.push(String.fromCharCode(Math.round(Math.random()*25)+65))
  }
  if(numbers){
    options.push(String.fromCharCode(Math.round(Math.random()*9)+48))
  }
  if(special){
    options.push(specialCharacters[Math.round(Math.random()*31)])
  }

  if(options.length===0){
    return String.fromCharCode(Math.round(Math.random()*93)+33)
  }else{
    return options[Math.round(Math.random()*(options.length-1))]
  }
}
/*
  Generates password to display
*/
function generatePassword(){
  promptLength()
  promptChars()

  let password = ""
  let passwordLength = Math.round(Math.random()*(maxLength-minLength))+minLength

  let lengthQuarters = generateIndexes(passwordLength)

  //alots choosen char types at least one slot in the password
  let randomizedIndex = lengthQuarters[Math.floor(Math.random()*3)]
  var insertLower = lowercase? randomizedIndex:-1
  lengthQuarters.splice(lengthQuarters.indexOf(randomizedIndex), 1)

  randomizedIndex = lengthQuarters[Math.floor(Math.random()*2)]
  var insertUpper = uppercase? randomizedIndex:-1
  lengthQuarters.splice(lengthQuarters.indexOf(randomizedIndex), 1)

  randomizedIndex = lengthQuarters[Math.floor(Math.random()*1)]
  var insertNum = numbers? randomizedIndex:-1
  lengthQuarters.splice(lengthQuarters.indexOf(randomizedIndex), 1)

  randomizedIndex = lengthQuarters[0]
  var insertSpec = special? randomizedIndex:-1

  //Inserts chars based on parameters
  for(let i=0; i<passwordLength; i++){
    if(insertLower===i){
      let addedChar = String.fromCharCode(Math.round(Math.random()*25)+97)
      password+=addedChar
    }else if(insertUpper===i){
      let addedChar = String.fromCharCode(Math.round(Math.random()*25)+65)
      password+=addedChar
    }else if(insertNum===i){
      let addedChar = String.fromCharCode(Math.round(Math.random()*9)+48)
      password+=addedChar
    }else if(insertSpec===i){
      let addedChar = specialCharacters[Math.round(Math.random()*31)]
      password+=addedChar
    }else{
      password+=generateRandChar()
    }
  }

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
