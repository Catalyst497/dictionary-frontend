import React from "react";
import Nav from "../components/Nav";
import {useLocation} from 'react-router-dom'
import SearchBar from "../components/SearchBar";
import Body from "../components/Body";
import { useSelector } from "react-redux";
import useConstants from "/src/hooks/useConstants";
import Login from "./login";
import Signup from "./Signup";

function Home() {
  const location = useLocation()
  const { font } = useSelector((st) => st.user);
  const { background, textMain } = useConstants();

  return (
    <div
      className={`App flex justify-center ${font.style} ${background} ${textMain} min-h-screen overflow-hidden`}
    >
      <div className="w-[95%] md:w-[60%]">
        <Nav />
        <SearchBar />
        <Body />
        {location.pathname == '/login' && <Login />}
        {location.pathname == '/register' && <Signup />}
      </div>
    </div>
  );
}

export default Home;
