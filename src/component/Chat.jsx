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
  const [layoutHeight, setLayoutHeight] = useState(window.innerHeight);
  const {user} = useContext(AuthContext);
  const history = useHistory()
  const input = useRef()
  const divChat = useRef()
  const divCurrentHeight = useRef()
  useEffect(() => {
    const handleResize = () =>{
      setLayoutHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    return () =>{
      window.removeEventListener('resize', handleResize)
    }
  })
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
  },[history,user])
  useEffect(() => {
    document.title = 'Chat Group'
  },[])
  useEffect(() => {
    if (divChat.current) {
      if (divChat.current.scrollTop >= divCurrentHeight.current - divChat.current.offsetHeight - 70 || !divCurrentHeight.current ) {
        divChat.current.scrollTop = divChat.current.scrollHeight
        divCurrentHeight.current = divChat.current.scrollHeight
      }
        console.log("current height:", divChat.current.scrollTop);
        console.log("divchat height: ", divChat.current.offsetHeight)
        console.log("current div Height:",divCurrentHeight.current - divChat.current.offsetHeight);
    }
    },[messages])
    useEffect(() => {

      const handleDivChatScroll = (e) =>{
        
      }
      divChat.current.addEventListener('scroll',handleDivChatScroll)
      return() => {
        divChat.current.removeEventListener('scroll', handleDivChatScroll)
      }
    },[])
  const handleSendMess = () => {
    const newDate = new Date();
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
    <>{user&&
    <div className="container"  >
      <div className="row">
        <div className="col-4">
          <div className="row align-items-start" style={{marginTop: "10px"}}>
            <div className="col"><img style={{borderRadius:"50%", width:"50px", height:"50px",float: "left", marginRight:"3px"}} src={user.photoURL} alt={user.displayName}></img></div>
            <div className="col">{user.displayName}</div>
            <div className="col">
              <button onClick={handleLogout}>Đăng xuất</button>
            </div>
          </div>
        </div>
        <div className="col-8" style={{ margin: "0 auto", height:layoutHeight, color:"white", paddingTop:"10px", paddingBottom:"10px"}}>
          <div ref={divChat} style={{ maxHeight:layoutHeight*0.85, overflowY: "auto",scrollbarWidth:"thin", scrollBehavior:"smooth", background:"#0066FF", padding:"10px"}}>
          {messages.map((mes, index) => {
            return (
              <div key={index} style={{}}>
                {mes.user !== user.displayName && mes.uid !== user.uid ? (
                  <>
                    <div style={{ float: "left"}}>
                    <img style={{borderRadius:"50%", width:"30px", height:"30px",float: "left", marginRight:"3px"}} src={mes.photoURL} alt={user.displayName}></img>
                    <div className="border" style={{float: "right", background:"#CC00FF", borderRadius:"15px", paddingRight:"10px", paddingLeft:"10px" }}>{mes.mesage}</div>
                    </div>
                    <br/>
                    <br/>
                    <div style={{ float: "left" , fontSize: "10px"}}>
                      {mes.date}
                    </div>
                    <br></br>
                  </>
                ) : (
                  <>
                    <div style={{ float: "right" }}>
                      <div className="border" style={{ float: "left", borderRadius:"15px", background:"#0000BB", paddingRight:"10px", paddingLeft:"10px" }}>{mes.mesage}</div>
                      <img style={{borderRadius:"50%", width:"30px", height:"30px", float:"right" ,marginLeft:"3px"}} src={mes.photoURL} alt={user.displayName}></img>
                    </div>
                    <br></br>
                    <br />
                    <div style={{ float: "right",fontSize: "10px" }}>
                      {mes.date}
                    </div>
                    <br></br>
                  </>
                )}
              </div>
            );
          })}
          </div>
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
    </div>
    
  </div>}</>
  );
};

export default Chat;
