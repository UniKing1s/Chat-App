import React, { useContext, useEffect, useRef, useState } from "react";
import { database, ref, push, onValue } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import { auth } from "../firebase/firebase";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    // { user: "Khoi", mesage: "Xin chào", date: date.toLocaleString() },
    // { user: "Huỳnh", mesage: "Chào bạn", date: date.toLocaleString() },
  ]);
  const {user} = useContext(AuthContext);
  const history = useHistory()
  const input = useRef()
  useEffect(() => {
    if(!user){
      history.push('/login')
    }
    onValue(ref(database, 'message'),data =>{
      let getMes = [];
      data.forEach((item) => {
        getMes.push({
          user: item.val().user,
          mesage: item.val().message,
          date: item.val().date,
          photoURL: item.val().photoURL,
          uid: item.val().uid
        })
      })
      setMessages(getMes);
    })
    document.title = 'Chat Group'
  },[history,user])
  const handleSendMess = () => {
    const newDate = new Date();
    console.log(newDate)
    // setMessages((prev) => {
    //   if (message !== "" || message.replaceAll(" ", "") !== "") {
    //     const newDate = new Date();
    //     return [
    //       ...prev,
    //       { user: name, mesage: message, date: newDate.toLocaleString() },
    //     ];
    //   } else {
    //     return [...prev];
    //   }
    // });
    if (message !== "" || message.replaceAll(" ", "") !== ""){
      push(ref(database, 'message'), {
        user: user.displayName,
        message: message,
        date: newDate.toLocaleString(),
        photoURL: user.photoURL,
        uid: user.uid
      })
      setMessage("");
      input.current.focus();
    }
  };
  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <>{user&&<div style={{ width: "100%" }}>
    <h1>{user.displayName}</h1>
    <button onClick={handleLogout}>Đăng xuất</button>
    <div style={{ width: "30%", margin: "0 auto", marginTop: "10px" }}>
      {messages.map((mes, index) => {
        return (
          <div key={index} style={{height:"100%"}}>
            {mes.user !== user.displayName && mes.uid !== user.uid ? (
              <>
                <div style={{ float: "left" }}>
                <img style={{borderRadius:"50%", width:"30px", height:"30px"}} src={mes.photoURL} alt={user.displayName}></img>
                <strong>{mes.user}</strong>: {mes.mesage}
                </div>
                <br></br>
                <br />
                <div style={{ float: "left" , s: "5px"}}>
                  {mes.date}
                </div>
                <br></br>
              </>
            ) : (
              <>
                <div style={{ float: "right" }}>
                  {mes.mesage} :<strong>{mes.user}
                  <img style={{borderRadius:"50%", width:"30px", height:"30px"}} src={mes.photoURL} alt={user.displayName}></img></strong>
                </div>
                <br></br>
                <br />
                <div style={{ float: "right" }}>
                  {mes.date}
                </div>
                <br></br>
              </>
            )}
          </div>
        );
      })}
      <br></br>
      <div style={{marginBottom:"10px"}}><input
        placeholder="nhắn tin"
        value={message}
        style={{ width: "75%", float: "left" }}
        onChange={(e) => setMessage(e.target.value)}
        ref={input}
      />
      <button
        style={{ width: "20%", float: "right" }}
        onClick={handleSendMess}
      >
        Gửi
      </button></div>
    </div>
  </div>}</>
  );
};

export default Chat;
