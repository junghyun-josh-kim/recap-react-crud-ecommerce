import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';

export default function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser);
  };
  return (
    <header className='flex justify-between border-b border-gray-300 p-4'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand font-bold'
      >
        <img
          src='/logo.png'
          alt='logo'
          width={100}
        />
        <h1 className='ml-4'>Lululime</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>My Cart</Link>
        <Link to='/products/new'>Admin</Link>
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
