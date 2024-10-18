import React, { useContext } from "react";
import "./Header.css";
import { AuthContext } from "../../store/FirebaseContext";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/login"); 
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleSell = () => {
    if (user) {
      navigate("/create"); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="Search city or location" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <select className="language-select">
          <option>ENGLISH</option>
          <option>हिंदी</option>
        </select>
        <div className="loginPage text-center">
          {user ? (
            <div className="user-info">
              <h7 className="user-email">{user.displayName}</h7>
            </div>
          ) : (
            <button className="btn btn-dark" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>

        {user && (
          <button className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        )}
        <div className="sellMenu" onClick={handleSell}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
