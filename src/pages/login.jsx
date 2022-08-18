import React, { useState } from 'react';
import style from "./login.module.css";
import axios from "axios"
const Login = () => {
  const [errorText, setErrorText] = useState({
    usernameError:"",
    passwordError:"",
    acssesError:""

  });

  const validation = (obj) => {
    const keys = Object.keys(obj);
    
    let isvalid = {};
    keys.forEach(key => {
        isvalid[key] = false;
    });
    for (const k in obj) {
      let error = "";
      let errorName = `${k}Error`;

      if (obj[k] === "") {
        error = `${k} is empty`;
      } else if (obj[k].length < 3) {
        error = `${k} length is less than 3`;
      } else {
        error = "";
        isvalid[k] = true;
      }

     setErrorText(prev =>( {...prev, [errorName]:error}))
    }

    const isVal = (obj) => {
      let Valid = true;
      for (const k in obj) {
        if (!obj[k]) {
          Valid = false;
          break;
        }
      }
      return Valid;
    };

    return isVal(isvalid);
  };
  const license = async (url, userInfo) => {
    let users = []
    await axios.get(url ).then(res => {users = res.data}).catch(err => console.log(err));
    const user = users.find(user => user.userName === userInfo.username);
    if(!user){
      if(user.password === userInfo.password){
        
        return true
      }else{

        setErrorText(prev => ({...prev, acssesError:"password is invalid"}))
        return false
      }
    }else{
      setErrorText(prev => ({...prev, acssesError:"username is invalid"}))
      return false
    }


  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // create object :  
    const userInfo = {}; /*{username, password}*/
    const formData = new FormData(e.target);
    for (const [key, value] of formData) {
      userInfo[key] = value;
    }
    console.log(userInfo);

    const isValid = validation(userInfo);

    if(isValid){
    const result = license("https://618ace5834b4f400177c48c0.mockapi.io/users", userInfo)
      result.then(res => {
        console.log(res)
        if(res){
          // LOGINED
        }else{
          
        }
      
      }).catch(err => {console.log(err);});
    }

  }


  return (
    <>
    <div className={style.form}>
        <form onSubmit={handleSubmit}>

          <span>{errorText.acssesError}</span>
          <label htmlFor="username">username :</label>
          <input name="username" type="text" placeholder="username" />
          <span>{errorText.usernameError}</span>
          <label htmlFor="password"> password:</label>
          <input name="password" type="password" placeholder="password" />
          <span>{errorText.passwordError}</span>
          <button className={style.btn}>
            Login
          </button>
        </form>
      </div>
    
    </>
  )
}

export default Login