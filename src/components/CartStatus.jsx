import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { LuShoppingBag } from 'react-icons/lu';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(['carts'], () => getCart(uid));
  return (
    <div className='relative'>
      <LuShoppingBag className='text-3xl' />
      {products && (
        <p className='w-6 h-6 text-center bg-brand text-md text-white font-bold rounded-full absolute -top-3 -right-3'>
          {products.length}
        </p>
      )}
    </div>
  );
}
