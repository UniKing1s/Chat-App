import React from "react";
import Chat from "./component/Chat";
import Login from "./component/Login";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Chat />,
  },
  {
    path: "/login",
    exact: true,
    main: () => <Login />,
  },
  {
    path: "*",
    exact: false,
    main: () => <div>Not found</div>,
  },
];
export default routes;
