import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("https://chronocart-mern.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAllProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
      if (localStorage.getItem("auth-token")) {
        fetch("https://chronocart-mern.onrender.com/getcartdata", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body:"",
        })
          .then((response) => response.json())
          .then((data) => 
            setCartItems(data))
      }
  }, []);

  const addToCart = (itemId) => {
    // Update local state immediately
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    // If user is logged in, update the count on the server as well
    if (localStorage.getItem("auth-token")) {
      fetch("https://chronocart-mern.onrender.com/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("addToCart response:", data);
        })
        .catch((error) => {
          console.error("Error in addToCart fetch:", error);
        });
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem("auth-token")) {
      fetch("https://chronocart-mern.onrender.com/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("removeFromCart response:", data);
        })
        .catch((error) => {
          console.error("Error in removeFromCart fetch:", error);
        });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        // Check if itemInfo exists before accessing new_price
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
