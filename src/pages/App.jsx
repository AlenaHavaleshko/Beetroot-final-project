import React from "react";
import { BrowserRouter } from 'react-router-dom';

// pages
import Router from "./Router";

//containers
import LogIn from "../container/AuthForm/LogIn/LogIn";
import SignUp from "../container/AuthForm/SignUp/SignUp";

//layouts
import MainLayout from "../layouts/AuthLayout";

//css
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {

  return (
    <BrowserRouter>
      {/* <MainLayout> */}
        <Router/>
      {/* </MainLayout> */}
    </BrowserRouter>
    //  <LogIn/>
    //  <SignUp/>

  );
}

export default App;
