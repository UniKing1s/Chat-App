import React, { memo, useEffect, useState } from 'react';
// import { AuthContext } from "../context/authProvider";
import { auth } from "../firebase/firebase";
import { userCallApi } from '../apiService/apiService';
const UserInfo = (props) => {
    const {user} = props;
    console.log(user)
    const [users, setUsers] = useState([]);
    const [uidUserChat, setUidUserChat] = useState("");
    const handleShowInFo = () => {
        props.onClickShowInfo()
    }
    const handleLogout = () => {
        props.onLogout();;
        auth.signOut();
    }
    useEffect(() => {
          userCallApi(`/getUsers?userNotGet=${user.uid}`,"GET", null).then((res) => {
            if(res.status === 200){
              console.log(res.data.users);
              setUsers(res.data.users);
              const userChat = {
                uid: res.data.users[0].uid,
                displayName: res.data.users[0].displayName,
                photoURL:res.data.users[0].photoURL
              };
              props.onChooseUserMessage(userChat);
            }else{}
          }).catch((error) => {});  
    }, [user])
    const handleChooseUserForMessage = (user) => {
        setUidUserChat(user.uid);
        props.onChooseUserMessage(user);
    }
    console.log("render-info")
    return (
        <>
        <div className={`col-${12-props.colNumber}`} style={{height: props.layoutHeight,overflowY: "auto",scrollbarWidth:"thin", scrollBehavior:"smooth"}}>
          <button className="btn btn-primary w-100" style={{fontSize:"20px", marginTop:"10px", marginBottom:"10px"}} type="button" onClick={() => handleShowInFo()}>
            {!props.showInfo?">":"<"}
          </button>
          {props.showInfo&&
          <div>
            <div className="card card-body" style={{marginBottom:"10px", height:"100%"}}>
              <div className="row" style={{marginTop: "10px"}}>
                <div className="col-auto card" 
                style={{margin:"0 auto", maxWidth:"50px", maxHeight:"50px", padding:"0"}}
                >
                  <img 
                  className='card-img rounded-circle'
                  style={{width:"50px", height:"50px"}} 
                  src={user.photoURL} 
                  alt={user.displayName}/>
                  <div className='card-img-overlay w-100 h-100'>
                    <span className="bg-success border border-light rounded-circle" 
                    style={{padding:"5px", position:"absolute", right:"0", bottom:"0"}} >
                        <span className="visually-hidden">Online</span>
                    </span>
                  </div>
                  
                  
                </div>
                <div className="col-auto p-3" 
                style={{textAlign:"center", fontWeight:"bold", margin:"0 auto", minHeight:"50px"}}>
                  {user.displayName}</div>
                  <div className="col-auto p-3" style={{margin:"0 auto", minHeight:"50px"}}>
                    <button type="button" className="btn btn-dark" onClick={handleLogout}>Đăng xuất</button>
                  </div>
                </div>      
            </div>
            {users.map((otherUser, index) => (
              <button key={index} 
              className="card card-body w-100"
              style={{marginBottom:"10px", background:`${uidUserChat === otherUser.uid?"#3399FF":"#98AFC7"}`}} 
              onClick={() => handleChooseUserForMessage({
                uid: otherUser.uid,
                displayName: otherUser.displayName,
                photoURL: otherUser.photoURL
                })}>
                <div className="row">
                <div className="col-auto card" 
                style={{margin:"0 auto", maxWidth:"50px", maxHeight:"50px", padding:"0"}}
                >
                  <img 
                  className='card-img rounded-circle'
                  style={{width:"50px", height:"50px"}} 
                  src={otherUser.photoURL} 
                  alt={otherUser.displayName}/>
                  <div className='card-img-overlay w-100 h-100'>
                    <span className={`bg-${props.usersOnline.includes(otherUser.uid)?"success":"danger"} border border-light rounded-circle`} 
                    style={{padding:"5px", position:"absolute", right:"0", bottom:"0"}} >
                        <span className="visually-hidden">Online</span>
                    </span>
                  </div>
                </div>
                <div className="col-auto p-3"
                style={{textAlign:"center", fontWeight:"bold", margin:"0 auto", minHeight:"50px"}}>
                  {otherUser.displayName}
                </div>
                </div> 
              </button> 
            ))}     
          </div>
          }
        </div>
        </>
    );
}
export default memo(UserInfo);
