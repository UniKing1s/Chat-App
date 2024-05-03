// import { useState } from "react";
import routes from "./routes";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/authProvider";

function App() {
  // const [showChat, setShowChat] = useState(false);
  // const [name, setName] = useState("");
  // const login = (name) => {
  //   setShowChat(!showChat);
  //   setName(name);
  // };
  const showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          ></Route>
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  return (
    <Router>
      <main>
        <AuthProvider>
          <div className="App" style={{ height: "100%" }}>
            {showContentMenus(routes)}
          </div>
        </AuthProvider>
      </main>
    </Router>
  );
}

export default App;
