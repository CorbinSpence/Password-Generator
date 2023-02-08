// Assignment code here
var processLength = confirm("Add password length criteria");
var processChars = confirm("Add password character criteria");
if(processChars){
  let selectedOption = false
  while(!selectedOption){
    var lowercase = confirm("Character criteria: include lowercase");
    var uppercase = confirm("Character criteria: include uppercase");
    var numbers = confirm("Character criteria: include numbers");
    var special = confirm("Character criteria: include special characters");
    if(lowercase || uppercase || numbers|| special){
      selectedOption = true
    }else{
      let errorMessage = alert("Choose at least one option")
    }
  }
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
