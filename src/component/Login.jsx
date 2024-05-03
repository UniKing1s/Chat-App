import React, { useEffect, useState } from "react";
import { auth, googleProvider, facebookProvider } from "../firebase/firebase";
import {signInWithPopup, signInWithRedirect}  from 'firebase/auth'
const Login = (props) => {
  // const [name, setName] = useState();
  // const [user, setUser] = useState({});
  const [inLogin, setInLogin] = useState(false);
  const windowWith = window.innerWidth;
  // const handleLogin = () => {
  //   // props.login(name);
  //   // history.push("/");
  // };
  const handleLoginWithFacebook = () =>{
    if (windowWith <= 500) {
      signInWithRedirect(auth,facebookProvider).then((data) =>{
        // setUser({
        //   displayName:data.user.displayName,
        //   email: data.user.email, 
        //   photoURL: data.user.photoURL,
        //   uid: data.user.uid});
      }).catch((error) => {
        if(error.code === "auth/popup-closed-by-user"){
          setInLogin(false);
        }
      });
      // Thiết bị di động
    } else {
      setInLogin(true);
      signInWithPopup(auth,facebookProvider).then((data) =>{
        // setUser({
        //   displayName:data.user.displayName,
        //   email: data.user.email, 
        //   photoURL: data.user.photoURL,
        //   uid: data.user.uid});
      }).catch((error) => {
        if(error.code === "auth/popup-closed-by-user"){
          setInLogin(false);
        }
      });
    
  }}
  // auth.onAuthStateChanged((data) => {
    
  // })
  useEffect(() => {
    document.title = "Login"
  }, []);
  const handleLoginWithGoogle = () => {
    // setInLogin(!inLogin);
    
    if (windowWith <= 500) {
      signInWithRedirect(auth,googleProvider).then((data) =>{
        // setUser({
        //   displayName:data.user.displayName,
        //   email: data.user.email, 
        //   photoURL: data.user.photoURL,
        //   uid: data.user.uid});
      }).catch((error) => {
        if(error.code === "auth/popup-closed-by-user"){
          setInLogin(false);
        }
      });
      // Thiết bị di động
    } else {
      setInLogin(true);
      signInWithPopup(auth,googleProvider).then((data) =>{
        // setUser({
        //   displayName:data.user.displayName,
        //   email: data.user.email, 
        //   photoURL: data.user.photoURL,
        //   uid: data.user.uid});
      }).catch((error) => {
        if(error.code === "auth/popup-closed-by-user"){
          setInLogin(false);
        }
      });
    }
  }

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
          width: "30%",
          marginTop: "10px",
          borderRadius: "2px",
          border: "1",
        }}
      >
        {/* <input
          style={{ width: "80%" }}
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        /> */}
        <div style={{width:"100%", margin:"0 auto", textAlign:"center"}}>Đăng nhập</div>
        {/* <div>{JSON.stringify(user)}</div> */}
        {/* <button onClick={() => handleLogin()}>Login</button> */}
        {inLogin? <div>Loading...</div>:<><button style={{width:"100%"}} onClick={() => handleLoginWithGoogle()}>Đăng nhập bằng Google</button>
        <button style={{width:"100%"}} onClick={() => handleLoginWithFacebook()}>Đăng nhập bằng Facebook</button></>}
        
      </div>
    </div>
  );
};

export default Login;
