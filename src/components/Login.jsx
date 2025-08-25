import React, { useRef } from 'react';
import Header from './Header';
import { checkValidation } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { LOGIN_BG_URL, USER_PHOTO_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignIn, setIsSignIn] = React.useState(true);
  const [error, setError] = React.useState('');

  // 🔹 Refs for inputs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleSignInForm = (e) => {
    e.preventDefault();
    setIsSignIn(!isSignIn);
  };

  const resetForm = () => {
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const validationMsg = checkValidation(email, password);
    if (validationMsg) {
      setError(validationMsg);
      return;
    }

    if (!isSignIn) {
      // Signup Logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL: USER_PHOTO_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                setUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              console.error('Error updating profile:', error);
            });

          resetForm();
          navigate('/browse');
        })
        .catch((error) => {
          setError(error.message + ` (${error.code})`);
        });
    } else {
      // Signin Logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resetForm();
          navigate('/browse');
        })
        .catch((error) => {
          setError(error.message + ` (${error.code})`);
        });
    }
  };

  const inputClass =
    'p-3 w-full border border-textmuted rounded-sm hover:scale-105 transition transform';

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-textmain"
      style={{ backgroundImage: `url('${LOGIN_BG_URL}')` }}
    >
      <div className="absolute inset-0 rotate-180 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="relative z-10">
        <Header />
        <div className="flex flex-row items-center pl-3 pr-3 sm:pl-0 sm:pr-0 justify-center h-[calc(100vh-4rem)]">
          <div className="bg-background/80 backdrop-blur-xs p-14 xl:w-[calc(40vw-4rem)] rounded-md shadow-xl shadow-background/50">
            <h2 className="text-3xl font-semibold">
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col">
              {!isSignIn && (
                <input
                  type="text"
                  placeholder="Full Name"
                  aria-label="Full Name"
                  className={`${inputClass} mt-8 mb-5 `}
                  ref={nameRef}
                />
              )}

              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                className={`${inputClass} ${isSignIn ? 'mt-8' : ''} mb-5 `}
                ref={emailRef}
              />

              <input
                type="password"
                placeholder="Password"
                aria-label="Password"
                className={`${inputClass} ${!error && 'mb-5'}`}
                ref={passwordRef}
              />
              {error && (
                <p className="text-red-500 text-[10px] mt-2 mb-5 ">{error}</p>
              )}

              <button
                type="submit"
                className="bg-primary text-textmain px-4 py-2 rounded-sm shadow-lg shadow-primary/30 hover:scale-105 transition transform"
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <p className="mt-6 text-sm text-textsecondary text-center">
              <a href="#" className="text-textsecondary hover:underline">
                Forgot Password?
              </a>
            </p>

            <p className="mt-6 text-sm text-textsecondary">
              {isSignIn ? 'New to ShowFlix?' : 'Already on ShowFlix?'}{' '}
              <a
                href="#"
                className="text-primary hover:underline"
                onClick={toggleSignInForm}
              >
                {isSignIn ? 'Sign Up Now' : 'Sign In Now'}
              </a>
            </p>

            <p className="mt-6 text-xs text-textmuted">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
            </p>
            <p className="mt-2 text-xs">
              <a
                href="https://policies.google.com/privacy"
                className="text-primary hover:underline"
              >
                Learn more.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
