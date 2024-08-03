import React, { useState } from 'react';
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { query, where, getDocs, collection } from "firebase/firestore";
import { Button, Label, TextInput, Alert } from 'flowbite-react';

export const SignIn = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (event) => {
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
      localStorage.setItem('employeeNumber', employeeNumber);
      console.log("Signed in successfully");
      
    } catch (err) {
      console.error('Failed to sign in', err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
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
        <Button type="submit">Sign In</Button>
      </form>
      {error && <Alert color="failure" className="mt-4">{error}</Alert>}
    </div>
  );
};

export default SignIn;