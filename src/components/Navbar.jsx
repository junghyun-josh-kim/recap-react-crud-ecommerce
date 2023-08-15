import { Link } from 'react-router-dom';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

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
        {user && <Link to='/carts'>My Cart</Link>}
        {user && user.isAdmin && <Link to='/products/new'>Admin</Link>}
        {user && <User user={user} />}
        {!user && (
          <Button
            text={'Login'}
            onClick={login}
          />
        )}
        {user && (
          <Button
            text={'Logout'}
            onClick={logout}
          />
        )}
      </nav>
    </header>
  );
}
