import { useState } from "react";

import "./App.css";
import { LC, NM, SC, UC } from "./data";
import toast, { Toaster } from "react-hot-toast";

function App() {

  let [password, setPassword] = useState('');
 
  let newCharSet = '';

  let [isUppercase, setIsUppercase] = useState(false);
  let [isLowercase, setIsLowercased] = useState(false);
  let [isNumber, setIsNumber] = useState(false);
  let [isCharacters, setIsCharacters] = useState(false);
  let [passwordLength, setPasswordLength] = useState(10);

  let charSetGen = ()=>{

    if(isUppercase || isLowercase || isNumber || isCharacters){

      newCharSet = '';
      if(isUppercase) newCharSet+=UC;
      if(isLowercase) newCharSet+=LC;
      if(isNumber) newCharSet+=NM;
      if(isCharacters) newCharSet+=SC;

   

    }
    else{
      
      toast.error("Please select at least one option!")
    }



     
  }


  let generatePassword = ()=>{

    charSetGen();
    let newPass = '';

    for(let i=0; i<passwordLength; i++){
      let randomNum = Math.floor(Math.random()*newCharSet.length);
 
      newPass += newCharSet.charAt(randomNum);
    }


    setPassword(newPass);



  }
  

  let copyToClipboard = ()=>{
    if(password.length == 0){
      toast.error("Empty")
    }
    else{
      navigator.clipboard.writeText(password);
      toast.success("Password coppied")
    }
  }


  return (
    <>
    <Toaster/>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="showPass">
          <input type="text" value={password} readOnly />
          <button onClick={copyToClipboard}>Copy</button>
        </div>

        <div className="passlen">
          <label>Password Length</label>
          <input type="number" min={10} max={20} value={passwordLength} onChange={(e)=>setPasswordLength(Number(e.target.value))}/>
        </div>

        <div className="checkbox">
          <label>Uppecase</label>
          <input type="checkbox" checked={isUppercase} onChange={()=>{setIsUppercase(!isUppercase)}}/>
        </div>

        <div className="checkbox">
          <label>Lowercase</label>
          <input type="checkbox" checked={isLowercase} onChange={()=>{setIsLowercased(!isLowercase)}}/>
        </div>

        <div className="checkbox">
          <label>Numbers</label>
          <input type="checkbox" checked={isNumber} onChange={()=>setIsNumber(!isNumber)}/>
        </div>

        <div className="checkbox">
          <label>Special Characters</label>
          <input type="checkbox" checked={isCharacters} onChange={()=>setIsCharacters(!isCharacters)}/>
        </div>

        <div className="btn">
          <button onClick={generatePassword}>Generate Password</button>
        </div>
      </div>
    </>
  );
}

export default App;
