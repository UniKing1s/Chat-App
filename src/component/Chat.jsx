import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import UserInfo from "./UserInfo";
import { messageCallApi} from "../apiService/apiService";
import Message from "./Message";
import { io } from "socket.io-client";
import { host } from "../apiService/config";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [loadMess, setLoadMess] = useState(true);
  const [showInfo,setShowInfo] = useState(false);
  const [colNumber, setColNumber] = useState(11);
  const [messages, setMessages] = useState([
    // { user: "Khoi", mesage: "Xin chào", date: date.toLocaleString() },
    // { user: "Huỳnh", mesage: "Chào bạn", date: date.toLocaleString() },
  ]);
  const [usersOnline, setUsersOnline] = useState ([]);
  const socket = useRef();
  const [layoutHeight, setLayoutHeight] = useState(window.innerHeight);
  const {user} = useContext(AuthContext);
  const [userMessing, setUserMessing] = useState({});
  // const history = useHistory()
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
  },[])
  useEffect(() => {
    if(userMessing){
      messageCallApi(`/getMess?user=${user.uid}&userMessing=${userMessing.uid}`,"GET", null).then(res => {
        if(res.status === 200){
          console.log(res.data.mess)
          setMessages(res.data.mess);
          userSendMessCheck.current = true
          setLoadMess(false)
        }else{
          console.log(res.status)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },[userMessing,user])
  // useEffect(() => {
  //   onValue(ref(database, 'message'),data =>{
  //     let getMes = [];
  //     data.forEach((item) => {
  //       getMes.push({
  //         user: item.val().user,
  //         mesage: item.val().message,
  //         date: item.val().date,
  //         photoURL: item.val().photoURL,
  //         uid: item.val().uid
  //       })
  //     })
  //     setLoadMess(false);
  //     setMessages(getMes);
  //   })
  // },[history,user])
  useEffect(() => {
    document.title = 'Chat Group'
    return () => socket.current.disconnect();
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

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user.uid);
      // socket.current.on("send-online-user", (data) => {
      //   console.log(data);
      // }) 
      socket.current.on("send-online-user", (data) => {
        console.log("userInOnline:" ,data.userInOnline);
        setUsersOnline(data.userInOnline);
      })
    }
  }, [user])
  useEffect(() => {
    if(user){
      const handleCloseWeb = () =>{
        socket.current.emit("user-offline",{uid:user.uid})
      }
      window.addEventListener('beforeunload', handleCloseWeb);
      return () => {
        window.removeEventListener('beforeunload', handleCloseWeb);
      }
    }
    // socket.current.on("send-online-user", (data) => {
    //   setUsersOnline(data.userInOnline);
    // })
  },[user, socket])


  useEffect(() => {
    if(user && userMessing){
      socket.current.on("msg-receive", (data) => {
        if(data.toUid === user.uid && data.fromUid === userMessing.uid){
        setMessages((prev) => [...prev, data]);
      }
      })
    }
    return() => {
      socket.current.off("msg-receive")
    }
  },[user, userMessing])

  const handleSendMess = () => {
    const newDate = new Date();
    if (message !== "" || message.replaceAll(" ", "") !== ""){
      messageCallApi("/","POST",{message:{fromUid: user.uid, toUid: userMessing.uid, message: message, date: newDate.toLocaleString()}}).then(res => {
        if (res.status === 200) {
          console.log(res.data)
          userSendMessCheck.current = true
          socket.current.emit("msg-sent", {fromUid: user.uid, toUid: userMessing.uid, message: message, date: newDate.toLocaleString()});
          setMessages(prev => 
            [...prev, 
              {fromUid: user.uid, 
                toUid: userMessing.uid, 
                message: message, 
                date: newDate.toLocaleString()}])
          setMessage("");
          input.current.focus();
        }else {
          console.log(res.status)
        }
      }).catch(err => {
        console.log(err)
      })
    }
    
  };
  // useEffect(() => {
  //   if (uidUserMessing) {
  //     messageCallApi("message", "GET", { uid: uidUserMessing, uidSend: user.uid })
  //   }
  // },[uidUserMessing])
  const handleLogout = useCallback(() =>{
    socket.current.emit("user-offline",{uid:user.uid});
  },[user])
  const handleShowInFo = useCallback(() => {
    setShowInfo(!showInfo);
    if(!showInfo){
      setColNumber(8);
    }else {
      setColNumber(11);
    }
  },[showInfo])
  const handleUserMessage = useCallback((user) => {
    console.log(user)
    setUserMessing(user)
  },[])
  // console.log(user)
  return (
    <>{user&&
    <div className="container" style={{ background: "#3366CC" }}>
      <div className="row">
        <UserInfo 
        onLogout = {handleLogout} 
        layoutHeight = {layoutHeight} 
        usersOnline = {usersOnline} 
        socket = {socket} 
        user = {user} 
        onChooseUserMessage = {handleUserMessage} 
        colNumber={colNumber} 
        showInfo={showInfo} 
        onClickShowInfo = {handleShowInFo}/>
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
            <Message user = {user} userMessing = {userMessing} messages = {messages}/>
            </div>
            </>}
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
