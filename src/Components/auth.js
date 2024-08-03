// src/components/Auth.js
import React, { useState } from 'react';
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, query, where, getDocs, collection } from "firebase/firestore";
import { Button, Label, TextInput, Alert } from 'flowbite-react';

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const generateEmployeeNumber = () => {
    return `ADMIN-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const signUpAdmin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const adminEmployeeNumber = generateEmployeeNumber();
      await setDoc(doc(db, "employees", user.uid), {
        email: user.email,
        role: 'admin',
        employeeNumber: adminEmployeeNumber,
      });
      console.log("Admin signed up successfully");
      alert(`Your employee number is: ${adminEmployeeNumber}. Please use this to sign in.`);
    } catch (err) {
      console.error('Failed to sign up', err);
      setError(err.message);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    if (!employeeNumber || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const usersRef = collection(db, "employees");
      const q = query(usersRef, where("employeeNumber", "==", employeeNumber));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error("No user found with this employee number");
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      await signInWithEmailAndPassword(auth, userData.email, password);
      console.log("Signed in successfully");
    } catch (err) {
      console.error('Failed to sign in', err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? "Admin Sign Up" : "Sign In"}</h2>
      <form onSubmit={isSignUp ? signUpAdmin : signIn} className="flex flex-col gap-4">
        {isSignUp ? (
          <>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="employeeNumber">Employee Number</Label>
              <TextInput
                id="employeeNumber"
                type="text"
                placeholder="ADMIN-XXXX"
                required
                onChange={(e) => setEmployeeNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        )}
        <Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
      </form>
      {error && <Alert color="failure" className="mt-4">{error}</Alert>}
      <p className="mt-4">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:underline"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};