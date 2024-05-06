import React, {memo} from 'react';

const Message = (props) => {

    const { messages, user, userMessing } = props;

    return (
        <>
        {messages.map((mes, index) => {
              return (
                <div key={index} >
                  {mes.fromUid !== user.uid? (
                    <>
                      <div style={{ float: "left", }}>
                      <img style={{borderRadius:"50%", width:"30px", height:"30px",float: "left", marginRight:"3px"}} 
                      src={userMessing.photoURL} 
                      alt={userMessing.displayName}></img>
                        <div className="border-none" style={{float: "right", background:"#CC00FF", borderRadius:"15px", paddingRight:"10px", paddingLeft:"10px" }}>
                          {mes.message}
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
                        <div className="border-none" style={{ float: "left", borderRadius:"15px", background:"#0000BB", paddingRight:"10px", paddingLeft:"10px" }}>
                            {mes.message}
                        </div>
                        <img 
                        style={{borderRadius:"50%", width:"30px", height:"30px", float:"right" ,marginLeft:"3px"}} 
                        src={user.photoURL} 
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
        </>
    );
}

export default memo(Message);
