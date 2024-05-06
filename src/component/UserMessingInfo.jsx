import React from 'react';

const UserMessingInfo = (props) => {
    const { user, usersOnline , layoutHeight } = props;
    return (
        <div>
        {/* <div className="card card-body" style={{marginBottom:"10px"}}>
              <div className="row">
                <div className="col-1 card" 
                style={{margin:"0 auto", width:"40px",maxWidth:"40px", maxHeight:"40px", padding:"0", marginTop:"10px"}}
                >
                  <img 
                  className='card-img rounded-circle'
                  style={{width:"40px", height:"40px"}} 
                  src={user.photoURL} 
                  alt={user.displayName}/>
                  <div className='card-img-overlay w-100 h-100'>
                    <span className={`bg-${usersOnline.includes(user.uid)?"success":"danger"} border border-light rounded-circle`}
                    style={{padding:"5px", position:"absolute", right:"0", bottom:"0"}} >
                        <span className="visually-hidden">Online</span>
                    </span>
                  </div>
                </div>
                <div className="col-11 p-3 w-75" 
                style={{fontSize:"15px", minHeight:"40px", color:"black"}}>
                    <div className="me-auto">
                        <div className="fw-bold">
                        {user.displayName}
                        </div>
                        <div style={{fontWeight:"normal", fontSize:"10px"}}>
                        <span className={`badge rounded-pill bg-${usersOnline.includes(user.uid)?"success":"danger"}`}>
                            {usersOnline.includes(user.uid)?"Online":"Offline"}
                            </span>
                        
                        </div>
                    </div>
                  </div>
                </div>      
            </div> */}
            <div className="card-body d-flex position-relative rounded" style={{marginBottom:"10px", background:"white"}}>
                <img src={user.photoURL} className="flex-shrink-0 me-3 rounded-circle" style={{width:"40px", height:"40px"}} alt="..."/>
                <div className="me-auto">
                        <div className="fw-bold" style={{color:"black"}}>
                        {user.displayName}
                        </div>
                        <div style={{fontWeight:"normal", fontSize:"10px"}}>
                        <span className={`badge rounded-pill bg-${usersOnline.includes(user.uid)?"success":"danger"}`}>
                            {usersOnline.includes(user.uid)?"Online":"Offline"}
                            </span>
                        </div>
                </div>
                
                </div>
        </div>
    );
}

export default UserMessingInfo;
