import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Stores all registered users
  const [users, setUsers] = useState({});

  // Stores the email of the currently logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Load data from localStorage when the app starts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    const storedCurrentUser =
      JSON.parse(localStorage.getItem("currentUser")) || null;

    setUsers(storedUsers);
    setCurrentUser(storedCurrentUser);
  }, []);

  // Save users whenever they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Save current user whenever it changes
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,

        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// a brief look of the Users

// {
//   "john@gmail.com": {
//     name: "John Doe",
//     email: "john@gmail.com",
//     password: "123456",
//     cart: [],
//   },

//   "jane@gmail.com": {
//     name: "Jane Doe",
//     email: "jane@gmail.com",
//     password: "abcdef",
//     cart: [],
//   }
// }

// a brief look of the currentUsers

// {
//     name: "John Doe",
//     email: "john@gmail.com",
//     password: "123456",
//     cart: [],
// }
