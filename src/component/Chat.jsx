import React, { useContext, useEffect, useRef, useState } from "react";
import { database, ref, push, onValue } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
const Chat = () => {
  const date = new Date();
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
          date: item.val().date
        })
      })
      setMessages(getMes);
    })
    document.title = 'Chat Group'
  },[])
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
        date: newDate.toLocaleString()
      })
      setMessage("");
      input.current.focus();
    }
  };
  return (
    <>{user&&<div style={{ width: "100%" }}>
    <h1>{user.displayName}</h1>
    <div style={{ width: "30%", margin: "0 auto", marginTop: "10px" }}>
      {messages.map((mes, index) => {
        return (
          <div key={index}>
            {mes.user !== user.displayName ? (
              <>
                <div style={{ float: "left" }}>
                  <strong>{mes.user}</strong>: {mes.mesage}
                </div>
                <br></br>
                <div style={{ float: "left" , s: "5px"}}>
                  {mes.date}
                </div>
                <br></br>
              </>
            ) : (
              <>
                <div style={{ float: "right" }}>
                  {mes.mesage} :<strong>{mes.user}</strong>
                </div>
                <br></br>
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
      <input
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
      </button>
    </div>
  </div>}</>
  );
};

export default Chat;
