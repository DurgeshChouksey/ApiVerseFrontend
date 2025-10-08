import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import { Menu, LogIn, UserPlus, Heart, User, LogOut, Search, Command} from 'lucide-react';
import { Button } from './ui/button';
import AnimatedBtn1 from './mvpblocks/animated-btn1';
import { ModeToggle } from './mode-toggle';
import Shuffle from './ui/shadcn-io/shuffle';

interface NavbarProps {
  isLoggedIn: boolean;
  currentPage: 'landing' | 'dashboard';
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, currentPage }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // command + k global search event trigger
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [])

  const Logo = () => (
      // <h1 className='text-xl sm:text-3xl font-bold font-logo bg-primary'>API'Verse</h1>
        <Shuffle
          text="API'VERSE"
          shuffleDirection="right"
          duration={1}
          animationMode="evenodd"
          shuffleTimes={1.5}
          ease="power3.out"
          loop={true}
          stagger={0.05}
          threshold={0.1}
          triggerOnce={false}
          triggerOnHover={true}
          respectReducedMotion={true}
          className="text-primary"
          style={{
            fontSize: '1.8rem',
            fontFamily: 'Silkscreen'
          }}
            />
  );

  const LeftSide = () => (
    <div className="flex gap-5 items-center">
      <Logo />
      <div className='hidden sm:block'>
        <AnimatedBtn1 action={() => console.log("About clicked")}>About Us</AnimatedBtn1>
      </div>
    </div>
  );

  const RightSide = () => {
    // Desktop view
    return (
      <div className='hidden md:flex gap-3 items-center'>
        {!isLoggedIn && (
          <>
            <ModeToggle></ModeToggle>
            <Button title="SignUp" size={"sm"} onClick={() => navigate('/signup')}><UserPlus/></Button>
            <Button title="SignIn" size={"sm"} onClick={() => navigate('/signin')}><LogIn/></Button>
            <AnimatedBtn1 action={() => console.log("Contact Support")}>Support</AnimatedBtn1>
          </>
        )}
        {isLoggedIn && currentPage === 'landing' && (
          <>
            <ModeToggle></ModeToggle>
            <Button onClick={() => navigate('/dashboard')}>API Hub</Button>
            <Button title='LogOut' size={"icon"}><LogOut/></Button>
            <Button title='Profile' size={"icon"} className='rounded-full'><User/></Button>
          </>
        )}
        {isLoggedIn && currentPage === 'dashboard' && (
          <>
            <ModeToggle></ModeToggle>
            <div className='flex items-center  rounded-md border border-gray-300 px-3 py-1'>
              <Search />
              <input ref={searchRef} type='text' placeholder='Search APIs...' className='border-none outline-none w-[100%] px-2' />
              <div className='flex gap-0.5 items-center justify-center'> <Command className='w-4 h-4' />K </div>
            </div>
            <Button onClick={() => console.log("Studio")}>Studio</Button>
            <Button title='Favorite' size={"icon"}><Heart/></Button>
            <Button title='Profile' size={"icon"} className='rounded-full'><User/></Button>
          </>
        )}
      </div>
    );
  };

  const MobileMenu = () => (
    <div className={`md:hidden rounded-xl absolute w-fit h-fit top-full right-2 backdrop-blur-2xl bg-black/40 p-4 rounded shadow-lg flex flex-col items-center gap-3 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
      {!isLoggedIn && (
        <div className='flex gap-2'>
          <ModeToggle></ModeToggle>
          <Button onClick={() => navigate('/signup')}><UserPlus/></Button>
          <Button onClick={() => navigate('/signin')}><LogIn/></Button>
          <Button onClick={() => console.log("Contact Support")}>Support</Button>
        </div>
      )}
      {isLoggedIn && currentPage === 'landing' && (
        <>
          <div className='flex gap-2'>
            <ModeToggle></ModeToggle>
            <Button onClick={() => navigate('/dashboard')}>API Hub</Button>
            <Button title='LogOut' size={"icon"}><LogOut/></Button>
            <Button size={"icon"} className='rounded-full'><User/></Button>
          </div>
        </>
      )}
      {isLoggedIn && currentPage === 'dashboard' && (
        <>
          <div className='flex gap-2'>
            <Button onClick={() => console.log("Studio")}>Studio</Button>
            <Button size={"icon"}><Heart/></Button>
          </div>
          <div className='flex gap-2'>
            <ModeToggle></ModeToggle>
            <Button title='LogOut' size={"icon"}><LogOut/></Button>
            <Button size={"icon"} className='rounded-full'><User/></Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      <div className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xs max-w-7xl mx-auto h-14 flex items-center px-4 justify-between'>
        <LeftSide />
        <RightSide />
        {/* Mobile hamburger */}
        <div className='md:hidden flex items-center'>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} className='text-primary' />
          </button>
          <MobileMenu />
        </div>
      </div>
      {/* Search bar on dashboard mobile view */}
      {isLoggedIn && currentPage === 'dashboard' &&  <div className='flex justify-center'>
        <div className='flex items-center w-[90%] fixed top-15 rounded-md border border-gray-300 px-3 py-1 md:hidden'>
          <Search />
          <input type='text' placeholder='Search APIs...' className='border-none outline-none w-[100%] px-3 py-1' />
         </div>
      </div> }
    </div>
  );
};

export default Navbar;
