import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import {signInWithPopup} from 'firebase/auth'
const Login = (props) => {
  const [name, setName] = useState();
  const [user, setUser] = useState({});
  const [inLogin, setInLogin] = useState(false);
  const handleLogin = () => {
    props.login(name);
    // history.push("/");
  };
  
  const handleLoginWithFacebook = () =>{
  }
  auth.onAuthStateChanged((data) => {
    
  })
  useEffect(() => {
    document.title = "Login"
  }, []);
  const handleLoginWithGoogle = () => {
    // setInLogin(!inLogin);
    setInLogin(true);
    signInWithPopup(auth,googleProvider).then((data) =>{
      setUser({
        displayName:data.user.displayName,
        email: data.user.email, 
        photoURL: data.user.photoURL,
        uid: data.user.uid});
    }).catch((error) => {
      if(error.code === "auth/popup-closed-by-user"){
        setInLogin(false);
      }
    });
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
        <input
          style={{ width: "80%" }}
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <div>{JSON.stringify(user)}</div>
        <button onClick={() => handleLogin()}>Login</button>
        {inLogin? <div>Loading...</div>:<><button onClick={() => handleLoginWithGoogle()}>Đăng nhập bằng Google</button>
        <button onClick={() => handleLoginWithFacebook()}>Đăng nhập bằng Facebook</button></>}
        
      </div>
    </div>
  );
};

export default Login;
