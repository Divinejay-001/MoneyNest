import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
      });
      

//function to update user data
const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // <-- Add this
  };
  

    //function to clear user data
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user"); // <-- Add this
      };
      

    return (
        <UserContext.Provider 
        value=
        {{ user,
         updateUser, 
         clearUser 
         }}>
            {children}
        </UserContext.Provider>
    );


    };

    export default UserProvider;
    
   