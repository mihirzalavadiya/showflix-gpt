import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../redux/slice/userSlice';
import { toggleGptSearchView } from '../redux/slice/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../redux/slice/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        dispatch(clearUser());
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(setUser({ uid, email, displayName, photoURL }));
        // navigate('/browse');
      } else {
        dispatch(clearUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const navigateToHome = () => {
    navigate('/Browse');
  };

  return (
    <header className="text-textmain w-full bg-gradient-to-b px-6 from-background py-4 flex items-center justify-between absolute top-0 z-50">
      <h1
        className="text-2xl font-semibold tracking-wide cursor-pointer"
        onClick={navigateToHome}
      >
        ShowFlix <span className="text-primary">GPT</span>
      </h1>

      {user?.email && (
        <nav className="flex items-center gap-4">
          {showGptSearch && (
            <select
              className="appearance-none bg-gray-800/80 border border-gray-600 text-white px-4 py-2 pr-8 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-700/80 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 backdrop-blur-sm"
              onChange={handleChangeLanguage}
            >
              {SUPPORTED_LANGUAGES?.map((lang) => (
                <option
                  key={lang?.identifier}
                  value={lang?.identifier}
                  className="bg-gray-800 text-white"
                >
                  {lang?.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="relative px-4 py-2 text-sm cursor-pointer text-textmain font-medium transition-colors duration-300 hover:text-primary group"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? 'Go to Home' : 'GPT Search'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 shadow-2xl cursor-pointer bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out group-hover:w-full"></span>
          </button>

          {user?.displayName && (
            <p className="text-textsecondary text-sm">
              Welcome, <span className="text-accent">{user.displayName}</span>!
            </p>
          )}
          <button
            className="bg-primary cursor-pointer text-textmain px-4 py-2 rounded-md
  shadow-lg shadow-primary/30 hover:scale-105 
  transition transform"
            onClick={logOutHandler}
          >
            Sign Out
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
