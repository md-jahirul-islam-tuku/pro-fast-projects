import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase.init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  // create user
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign out
  const signOutUser = () => {
    return signOut(auth)
      .then(() => {})
      .catch((err) => console.log(err.code || err.message));
  };
  const authInfo = { registerUser, user, loading, signOutUser };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
