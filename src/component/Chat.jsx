import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { database, ref, push, onValue } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import UserInfo from "./UserInfo";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [loadMess, setLoadMess] = useState(true);
  const [showInfo,setShowInfo] = useState(false);
  const [colNumber, setColNumber] = useState(11);
  const [messages, setMessages] = useState([
    // { user: "Khoi", mesage: "Xin chào", date: date.toLocaleString() },
    // { user: "Huỳnh", mesage: "Chào bạn", date: date.toLocaleString() },
  ]);
  const [layoutHeight, setLayoutHeight] = useState(window.innerHeight);
  const {user} = useContext(AuthContext);
  const history = useHistory()
  const userSendMessCheck = useRef(false)
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
      setLoadMess(false);
      setMessages(getMes);
    })
  },[history,user])
  useEffect(() => {
    document.title = 'Chat Group'
  },[])
  useEffect(() => {
    if (divChat.current) {
      if (divChat.current.scrollTop >= divCurrentHeight.current - divChat.current.offsetHeight - 70 || !divCurrentHeight.current || userSendMessCheck.current) {
        divChat.current.scrollTop = divChat.current.scrollHeight
        divCurrentHeight.current = divChat.current.scrollHeight
        userSendMessCheck.current = false
      }
        // console.log("current height:", divChat.current.scrollTop);
        // console.log("divchat height: ", divChat.current.offsetHeight)
        // console.log("current div Height:",divCurrentHeight.current - divChat.current.offsetHeight);
    }
  },[messages])

  useEffect(() => {
  let currentDivChat = null;
  const handleDivChatScroll = () =>{
      // console.log(e.target.value)
    }
    currentDivChat = divChat.current;
    currentDivChat.addEventListener('scroll',handleDivChatScroll)
    return() => {
        currentDivChat.removeEventListener('scroll', handleDivChatScroll)
    }
  },[divChat])
  const handleSendMess = () => {
    const newDate = new Date();
    if (message !== "" || message.replaceAll(" ", "") !== ""){
      push(ref(database, 'message'), {
        user: user.displayName,
        message: message,
        date: newDate.toLocaleString(),
        photoURL: user.photoURL,
        uid: user.uid
      })
      userSendMessCheck.current = true
      setMessage("");
      input.current.focus();
    }
  };
  const handleShowInFo = useCallback(() => {
    setShowInfo(!showInfo);
    if(!showInfo){
      setColNumber(8);
    }else {
      setColNumber(11);
    }
    
  },[showInfo])
  return (
    <>{user&&
    <div className="container">
      <div className="row">
        <UserInfo colNumber={colNumber} showInfo={showInfo} onClickShowInfo = {handleShowInFo}/>
        <div className={`col-${colNumber}`} style={{ margin: "0 auto", height:layoutHeight, color:"white", paddingTop:"10px", paddingBottom:"10px"}}>
          <div style={{height:layoutHeight*0.85, position:"relative", background:"url(space.jpg)", backgroundSize:"cover", backgroundPosition:"center"}}>
            {loadMess?
            <>
            <div style={{position:"absolute", top:"50%", right:"45%", width:"50px", height:"50px"}} ref={divChat} className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            </>
            :
            <>
            <div ref={divChat} style={{ position:"absolute", bottom:"0px", width:"100%", maxHeight:layoutHeight*0.85, overflowY: "auto",scrollbarWidth:"thin", scrollBehavior:"smooth", padding:"10px"}}>
            {messages.map((mes, index) => {
              return (
                <div key={index} >
                  {mes.user !== user.displayName && mes.uid !== user.uid ? (
                    <>
                      <div style={{ float: "left", }}>
                      <img style={{borderRadius:"50%", width:"30px", height:"30px",float: "left", marginRight:"3px"}} src={mes.photoURL} alt={user.displayName}></img>
                        <div className="border-none" style={{float: "right", background:"#CC00FF", borderRadius:"15px", paddingRight:"10px", paddingLeft:"10px" }}>
                          {mes.mesage}
                        </div>
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
                        <div className="border-none" style={{ float: "left", borderRadius:"15px", background:"#0000BB", paddingRight:"10px", paddingLeft:"10px" }}>{mes.mesage}</div>
                        <img 
                        style={{borderRadius:"50%", width:"30px", height:"30px", float:"right" ,marginLeft:"3px"}} 
                        src={mes.photoURL} 
                        alt={user.displayName}
                        />                        
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
            </div></>}
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
