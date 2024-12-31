import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { auth, signUp } from "../firebase";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

type AuthContextType = {
  currentUser: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {});
  }, []);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function handleSignUp(email: string, password: string) {
    try {
      const userCredential = await signUp(email, password);
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  const value: AuthContextType = { currentUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
