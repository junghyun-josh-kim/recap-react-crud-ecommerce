import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { addOrUpdateToCart } from '../api/firebase';

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateToCart(uid, product);
  };
  return (
    <>
      <p className='mx-8 mt-6 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img
          className='w-full m-2 basis-7/12 rounded-xl'
          src={image}
          alt={title}
        />
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2 border-b border-gray-400'>
            {title}
          </h2>
          <p className='text-l font-bold py-2'>${price}</p>
          <p>{description}</p>
          <div className='flex items-center'>
            <label
              className='text-brand font-bold'
              htmlFor='select'
            >
              Option:
            </label>
            <select
              id='select'
              className='p-2 my-3 ml-2 flex-1 border-2 border-dashe outline-none capitalize rounded-md'
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button
            text='Add Cart'
            style='font-bold'
            onClick={handleClick}
          />
        </div>
      </section>
    </>
  );
}
