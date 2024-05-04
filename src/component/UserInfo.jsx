import React, { memo, useContext } from 'react';
import { AuthContext } from "../context/authProvider";
import { auth } from "../firebase/firebase";
const UserInfo = (props) => {
    const {user} = useContext(AuthContext);
    const handleShowInFo = () => {
        props.onClickShowInfo()
    }
    const handleLogout = () => {
        auth.signOut();
    }
    return (
        <>
        <div className={`col-${12-props.colNumber}`} style={{marginTop:"10px"}}>
          <button className="btn btn-primary w-100" style={{fontSize:"20px"}} type="button" onClick={() => handleShowInFo()}>
            {!props.showInfo?">":"<"}
          </button>
          {props.showInfo&&<div>
            <div className="card card-body" style={{marginTop:"10px", height:"100%"}}>
              <div className="row align-items-start" style={{marginTop: "10px"}}>
                <div className="col">
                  <img 
                  style={{alignContent:"center",borderRadius:"50%", width:"50px", height:"50px",float: "left", marginRight:"3px"}} 
                  src={user.photoURL} 
                  alt={user.displayName}/>
                </div>
                <div className="col text-wrap" style={{textAlign:"center", fontWeight:"bold"}}>{user.displayName}</div>
                  <div className="col">
                    <button type="button" className="btn btn-dark" onClick={handleLogout}>Đăng xuất</button>
                    {/* <button onClick={handleLogout}>Đăng xuất</button> */}
                  </div>
                </div>      
            </div>
          </div>}
        </div>
        </>
    );
}
export default memo(UserInfo);
