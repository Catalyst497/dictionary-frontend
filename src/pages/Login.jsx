import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import gsap from 'gsap'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLogged, setUser } from "../store/userSlice";

function Login() {
  const dispatch = useDispatch();
  const { logged, darkMode, theme } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authRef = useRef()
  const mode = darkMode ? theme.dark : theme.light;
  useEffect(() => {
    setLoginErr(null);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { username, password });
      if (res.data?.message == "Successful Login") {
        localStorage.setItem("token", res.data?.token);
        setLoginErr(null);

        // On Successful login, clear email and password fields.
        setEmail("");
        setPassword("");

        dispatch(setLogged(true));
        dispatch(setUser(res.data?.user));
        console.log(res.data?.user);
        navigate("/");
      } else {
        console.log(res.data?.message);
        setLoginErr(res.data?.message);
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
    <>
    
      <div ref={authRef} className="overlay z-10 absolute inset-x-0 top-0 h-screen backdrop-blur-[10px]">
      <form
        method="POST"
        className={`grid absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-20 ${mode.background} text-center gap-4 justify-center p-4 brand-border rounded-md`}
      >

        {loginErr && (
          <div className="text-red-500 text-[1.5rem]">{loginErr}</div>
        )}
        <div className="text-[1.5rem] md:text-[3rem]">Login</div>
        {/* <input
          type="email"
          // name="email"
          id="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={email}
        /> */}
        <input
          type="username"
          id="username"
          className={`border-none focus:border-none focus:outline-none outline-none py-3 px-6 ${mode.input}`}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={username}
        />
        <input
          type="password"
          id="passsword"
          className={`border-none focus:border-none focus:outline-none outline-none py-3 px-6 ${mode.input}`}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          defaultValue={password}
        />
        <input
          type="submit"
          value="Submit Login Form"
          className={`${darkMode ? 'hover:bg-[#1f1f1f]' : 'hover:bg-[#f4f4f4]'} brand-border bg-transparent rounded-lg py-2 `}
          onClick={handleLoginSubmit}
        />
        <div className="text-center">Do not have an account? <Link to={'/register'} className="text-purple">Sign up</Link></div>
      </form>
      </div>
      
    </>
  );
}

export default Login;
