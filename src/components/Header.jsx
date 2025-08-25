import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        dispatch(clearUser());
        setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const navigateToHome = () => {
    navigate('/Browse');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="text-textmain w-full bg-gradient-to-b px-4 sm:px-6 from-background py-4 flex items-center justify-between absolute top-0 z-50">
      {/* Logo */}
      <h1
        className="text-xl sm:text-2xl font-semibold tracking-wide cursor-pointer flex-shrink-0"
        onClick={navigateToHome}
      >
        ShowFlix <span className="text-primary">GPT</span>
      </h1>

      {user?.email && (
        <>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
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
              <p className="text-textsecondary text-sm hidden xl:block">
                Welcome, <span className="text-accent">{user.displayName}</span>
                !
              </p>
            )}
            <button
              className="bg-primary cursor-pointer text-textmain px-4 py-2 rounded-md
                shadow-lg shadow-primary/30 hover:scale-105 
                transition transform whitespace-nowrap"
              onClick={logOutHandler}
            >
              Sign Out
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-textmain transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-textmain transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-textmain transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden fixed top-16 right-0 left-0 bg-background/95 backdrop-blur-md border-t border-gray-600/20 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? 'opacity-100 visible translate-y-0 z-50'
                : 'opacity-0 invisible -translate-y-4'
            }`}
          >
            <nav className="flex flex-col p-4 space-y-4">
              {/* Welcome Message */}
              {user?.displayName && (
                <p className="text-textsecondary text-sm text-center py-2 border-b border-gray-600/20">
                  Welcome,{' '}
                  <span className="text-accent">{user.displayName}</span>!
                </p>
              )}

              {/* Language Selector */}
              {showGptSearch && (
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-textsecondary">
                    Language:
                  </label>
                  <select
                    className="appearance-none bg-gray-800/80 border border-gray-600 text-white px-4 py-3 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-700/80 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 backdrop-blur-sm"
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
                </div>
              )}

              {/* GPT Search Toggle */}
              <button
                className="relative px-4 py-3 text-sm cursor-pointer text-textmain font-medium transition-colors duration-300 hover:text-primary group bg-gray-800/40 rounded-lg text-center"
                onClick={handleGptSearchClick}
              >
                {showGptSearch ? 'Go to Home' : 'GPT Search'}
              </button>

              {/* Sign Out Button */}
              <button
                className="bg-primary cursor-pointer text-textmain px-4 py-3 rounded-md
                  shadow-lg shadow-primary/30 hover:scale-105 
                  transition transform w-full"
                onClick={logOutHandler}
              >
                Sign Out
              </button>
            </nav>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
