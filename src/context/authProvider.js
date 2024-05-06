import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { userCallApi } from "../apiService/apiService";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        userCallApi("/", "POST", {
          user: { displayName, email, photoURL, uid },
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Created user");
            } else {
              console.log("nothing");
            }
            // console.log(res);
          })
          .catch((error) => {});
        setUser({
          displayName,
          email,
          photoURL,
          uid,
        });
        history.push("/");
      } else {
        history.push("/login");
      }
    });
    return () => {
      unsubscibed();
    };
  }, [history]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
