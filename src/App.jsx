import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './pages/ViewPost';
import { AuthContext,FirebaseContext} from "./store/FirebaseContext";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Post from "./store/PostContext"
function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
    });
    
    return () => unsubscribe();
  }, [setUser]);

  return (
    <>
     <Post>
      <Router>
        <Routes>
            <Route path="/" element={<Home />}/>  
          </Routes>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>  
          </Routes>
          <Routes>
            <Route path="/login" element={<Login/>}/>  
          </Routes>
          <Routes>
            <Route path="/create" element={<Create/>}/>  
          </Routes>
          <Routes>
            <Route path="/view" element={<ViewPost/>}/>  
          </Routes>
        </Router>
   </Post>
    </>
  );
}

export default App;
