import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { app } from '../firebase';
import { useAppContext } from '../context/AppContext';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
const Gogglelogin = ({setshoUserLogin}) => {
  const {handleGoogleLogin} = useAppContext()
  const hnadleGOOGLElogin = async()=>{
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const  result = await signInWithPopup(auth,provider)
    await handleGoogleLogin({firtstName:result.user.displayName,email:result.user.email})
    setshoUserLogin(false)
  }
  return (
    <div className="w-full">
      <button type='button' onClick={hnadleGOOGLElogin}
        className="flex items-center justify-center gap-2 bg-[#4FBF8B] hover:bg-[#3da576] transition-all text-white w-full py-2 rounded-md text-sm sm:text-base"
      >
        <FaGoogle className="text-lg" />
        <span className="truncate">Login with Google</span>
      </button>
    </div>
  );
};

export default Gogglelogin;
