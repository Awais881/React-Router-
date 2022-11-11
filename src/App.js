import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profiles from "./components/Profiles";


import { Routes, Route, Link, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");


  useEffect(() => {

    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;
        console.log("auth change: login", user);
        setIsLogin(true)

        console.log("auth.currentUser: ", auth.currentUser.displayName);
        setFullName(auth.currentUser.displayName)


      } else {
        console.log("auth change: logout");
        // User is signed out
        setIsLogin(false)

      }
    });

    return () => {
      console.log("Cleanup function called")
      unSubscribe();
    }

  }, [])

  const logoutHandler = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("signout successful");
    }).catch((error) => {
      // An error happened.
      console.log("signout failed");
    });

  }


  return (
    <div>

      {
        (isLogin) ?
        <div className='header'>
          <ul className='navBar'>
            <li> <Link to={`/`}>Home</Link> </li>
            <li> <Link to={`/gallery`}>Gallery</Link> </li>
            <li> <Link to={`/Contact`}>Contact</Link> </li>
            <li> <Link to={`/profile`}>Profile</Link> </li>
      
            <li className='name'> {fullName}</li>
            <button onClick={logoutHandler} className='logout'><span className='text'>Logout</span></button> 
           
            </ul></div>
          :
          <ul className='navBar3'>
            <li> <Link to={`/`}>Login</Link> </li>
            <li> <Link to={`/signup`}>Signup</Link> </li>
          </ul>
      }

      {(isLogin) ?

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="profile" element={<Profiles />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      }

    </div>
    
  );

}
export default App;
