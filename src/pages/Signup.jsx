import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from 'gsap'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { logged, darkMode, theme } = useSelector((state) => state.user);
  const [registerErr, setRegisterErr] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const authRef = useRef()
  const mode = darkMode ? theme.dark : theme.light;
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
      username: username,
    };
    try {
      const res = await axios.post("https://dictionary-backend-ya1b.onrender.com/register", credentials);
      if (res.data?.message == "Sign up successful.") {
        console.log("Sign up success.");
        navigate("/login");
      } else {
        console.log(res.data?.message);
        setRegisterErr(res.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const authForm = authRef.current
    gsap.fromTo(authForm, .5, {y: '10rem'}, {y: 0})
  }, [])
  return (
    <div className="overlay z-10 absolute inset-x-0 top-0 h-screen backdrop-blur-[10px]">
      <form
        method="POST"
        ref={authRef}
        className={`grid absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-20 ${mode.background} text-center gap-4 justify-center py-4 px-6 brand-border rounded-md`}
      >
        <div className="text-[1.5rem] md:text-[3rem]">Sign Up</div>
        {registerErr && (
          <div className="text-red-500 text-[1.5rem]">{registerErr}</div>
        )}
        <input
          type="email"
          // name="email"
          id="email"
          placeholder="Enter your email address"
          className={`border-none focus:border-none focus:outline-none outline-none py-3 px-6 ${mode.input}`}
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={email}
        />
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          className={`border-none focus:border-none focus:outline-none outline-none py-3 px-6 ${mode.input}`}
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={username}
        />
        <input
          type="password"
          id="passsword"
          placeholder="password"
          className={`border-none focus:border-none focus:outline-none outline-none py-3 px-6 ${mode.input}`}
          onChange={(e) => setPassword(e.target.value)}
          defaultValue={password}
        />
        <input
          type="submit"
          value="Complete sign up"
          className={`${
            darkMode ? "hover:bg-[#1f1f1f]" : "hover:bg-[#f4f4f4]"
          } brand-border bg-transparent rounded-lg py-2 `}
          onClick={handleRegisterSubmit}
        />
        <div className="text-center">Already have an account? <Link to={'/login'} className="text-purple">Login</Link></div>
        
      </form>
    </div>
  );
}

export default Signup;
