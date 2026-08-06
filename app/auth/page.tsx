"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter()

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name
      });
      
      if (error) {
        alert(error.message);
      } else {
        alert("Signed up successfully!");
        setIsSignUp(false); 
        router.push("/")
      }
    } else {
      const { data, error } = await authClient.signIn.email({
        email,
        password
      });
      
      if (error) {
        alert(error.message);
      } else {
        alert("Signed in successfully!");
        router.push("/")
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 text-black">
      <div className="w-full max-w-sm space-y-4 bg-white p-6 rounded shadow-md border">
        <h1 className="text-2xl font-bold text-center">
          {isSignUp ? "Create an Account" : "Sign In"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required={isSignUp}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 transition-colors"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-sm text-blue-600 hover:underline"
        >
          {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
        </button>
      </div>
    </div>
  );
}