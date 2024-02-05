import React, {useState} from 'react';
import "./App.css";
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './Character.js';
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { COPY_FAIL, COPY_SUCCESS } from './message.js';

const App = () =>{
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(26);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const handleGeneratePassword = () =>{
    if(!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols){
      notify("To generate password you must sect at least one checkbox", true);
    }else{
      let characterList = "";
      if(includeNumbers){
        characterList = characterList + numbers;
      }
      if(includeUpperCase){
        characterList = characterList + upperCaseLetters;
      }
      if(includeLowerCase){
        characterList = characterList + lowerCaseLetters;
      }
      if(includeSymbols){
        characterList = characterList + specialCharacters;
      }
      setPassword(createPassword(characterList));
      notify("Password is generated successfully", false);
    }
  }
  const createPassword = (characterList) =>{
    let password = "";
    const characterListLength = characterList.length;
    for(let i = 0; i < passwordLength; i++){
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  }
  const copyToClipboard = (password) =>{
    navigator.clipboard.writeText(password);
  }
  const notify = (message, hasError = false) =>{
    if(hasError){
      toast.error(message,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast(message,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  const handleCopyPassword = (e)=>{
    if(password === ""){
      notify(COPY_FAIL, true);
    }
    else{
      copyToClipboard(password);
      notify(COPY_SUCCESS);
    }
  }
  
  return(
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2 className='generator__header'>
            Password Generator
          </h2>
          <div className='generator__password'>
            <h3>{password}</h3>
            <button className='copy__btn'>
              <i onClick={handleCopyPassword} className='far fa-clipboard'></i>
            </button>
          </div>
          <div className='form-group'>
            <label htmlFor='password-strength'>Password length</label>
            <input className='pw' defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} type='number' id='password-strength' name='password-strength' max='26' min='8'/>
          </div>
          <div className='form-group'>
            
          </div>
        </div>
      </div>
    </div>
  )
}