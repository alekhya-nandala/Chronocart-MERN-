import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/Adobe Express - file (1).png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../assets/icons8-dropdown-24.png';

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  // NEW: Track the logged-in user's name
  const [userName, setUserName] = useState("");

  const nav_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  // NEW: Fetch the user's name if a token is found
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch('http://localhost:4000/getuser', {
        method: 'GET',
        headers: {
          'auth-token': token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUserName(data.name); // store the user's name
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, []);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" height={90} />
        <p>ChronoCart</p>
      </div>
      <img
        className='nav-dropdown'
        onClick={nav_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: 'none' }} to='/'>
            Home
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('men')}>
          <Link style={{ textDecoration: 'none' }} to='/mens'>
            Mens
          </Link>
          {menu === "men" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("women")}>
          <Link style={{ textDecoration: 'none' }} to='/women'>
            Women
          </Link>
          {menu === "women" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>
            Kids
          </Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>

      <div className='navlogin-cart'>
        {/* If token is present, show user name + Logout. Otherwise show Login */}
        {localStorage.getItem('auth-token') ? (
          <>
            {/* Display the user name if we have it */}
            {userName && <span className='navbar-username'>Hi, {userName}!</span>}

            <button
              onClick={() => {
                localStorage.removeItem('auth-token');
                setUserName(""); // clear local state
                window.location.replace('/');
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}

        <Link to='/cart'>
          <img src={cart_icon} alt="" height={30} />
        </Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
