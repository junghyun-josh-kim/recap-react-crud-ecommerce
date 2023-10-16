import React from 'react';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';

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
    <section>
      <p>My Cart</p>
      {!hasProducts && <p> Empty </p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                />
              ))}
          </ul>
          <div>
            <PriceCard
              text='SubTotal'
              price={totalPrice}
            />
            <BsFillPlusCircleFill />
            <PriceCard
              text='Shipping'
              price={SHIPPING}
            />
            <FaEquals />
            <PriceCard
              text='Total'
              price={totalPrice + SHIPPING}
            />
          </div>
        </>
      )}
    </section>
  );
}
