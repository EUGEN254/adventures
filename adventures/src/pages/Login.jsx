import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const {backendUrl,fetchCurrentUser} = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault()//prevent the page from reloading
    setIsLoading(true);

    try {
      if(state === "Sign Up"){
        const {data} = await axios.post(backendUrl + "/api/user/register",{
          name,email,password,termsAccepted
        },{ withCredentials: true })
        if(data.success){
          toast.success(data.message)
          await fetchCurrentUser();
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }else{
        const{data} = await axios.post(backendUrl + "/api/user/login",{
          email,password
        },{ withCredentials: true });
        if(data.success){
          toast.success(data.message);
          await fetchCurrentUser();
          navigate('/')
          
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login  failed")
    }finally{
      setIsLoading(false)
    }
    
  }

  return (
    <form
    onSubmit={handleSubmit}
     className="min-h-[80vh] flex items-center">
      <div className="flex flex-col m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Login"} to explore more{" "}
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="Email"
            required
          />
        </div>
        <div className="w-full relative">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={passwordVisible ? "text" : "password"}
            placeholder="••••••••"
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center"
          >
            {passwordVisible ? (
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* ✅ Show only on Sign Up */}
        {state === "Sign Up" && (
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="terms"
              required
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm text-zinc-600">
              I accept the{" "}
              <a href="/terms" className="text-indigo-500 underline">
                Terms & Conditions
              </a>
            </label>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-500 text-white w-full py-2 rounded-md text-base mt-4 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <>{state === "Sign Up" ? "Create Account" : "Login"}</>
          )}
        </button>

        {state === "Sign Up" ? (
          <p className="mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-indigo-500 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4">
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-indigo-500 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
