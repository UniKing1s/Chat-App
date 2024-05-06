import React, { useContext, useEffect, useState } from "react";
import { auth, googleProvider, facebookProvider } from "../firebase/firebase";
import {signInWithPopup, signInWithRedirect}  from 'firebase/auth'
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
const Login = (props) => {
  // const [name, setName] = useState();
  // const [user, setUser] = useState({});
  const [inLogin, setInLogin] = useState(false);
  const {user} = useContext(AuthContext);
  const history = useHistory()
  // const windowWith = window.innerWidth;
  // const handleLogin = () => {
  //   // props.login(name);
  //   // history.push("/");
  // };
  const handleLoginWithFacebook = () =>{
    setInLogin(true);
    if (window.innerWidth <= 500) {
      signInWithRedirect(auth,facebookProvider).then((data) =>{
        history.push("/")
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
      signInWithPopup(auth,facebookProvider).then((data) =>{
        history.push("/")
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
    setInLogin(true);
    if (window.innerWidth <= 500) {
      signInWithRedirect(auth,googleProvider).then((data) =>{
        history.push("/")
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
      signInWithPopup(auth,googleProvider).then((data) =>{
        history.push("/")
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
        <div style={{width:"100%", margin:"0 auto", textAlign:"center",marginBottom:"10px"}}>Đăng nhập</div>
        {/* <div>{JSON.stringify(user)}</div> */}
        {/* <button onClick={() => handleLogin()}>Login</button> */}
        {inLogin? 
        <div style={{width:"100%", margin:"0 auto", textAlign:"center",marginBottom:"10px"}}>Loading...</div>
        :
        <>
        <button style={{width:"100%",marginBottom:"10px", background:"#FF3300", color:"white"}} onClick={() => handleLoginWithGoogle()}><strong>Đăng nhập bằng Google</strong></button>
        <button style={{width:"100%",marginBottom:"10px", background:"#0033FF", color:"white"}} onClick={() => handleLoginWithFacebook()}><strong>Đăng nhập bằng Facebook</strong></button>
        </>}
        
      </div>
    </div>
  );
};

export default Login;
