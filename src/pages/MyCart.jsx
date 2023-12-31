import React from 'react';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';

const SHIPPING = 19.99;

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );
  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        My Cart
      </p>
      {!hasProducts && <p> Empty </p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {products &&
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  uid={uid}
                />
              ))}
          </ul>
          <div className='flex justify-between items-center px-2 mb-8 md:px-8 lg:px-16'>
            <PriceCard
              text='SubTotal'
              price={totalPrice}
            />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard
              text='Shipping'
              price={SHIPPING}
            />
            <FaEquals className='shrink-0' />
            <PriceCard
              text='Total'
              price={totalPrice + SHIPPING}
            />
          </div>
          <Button
            text='Order'
            style='font-bold'
          />
        </>
      )}
    </section>
  );
}
