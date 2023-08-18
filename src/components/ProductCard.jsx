import React from 'react';

export default function ProductCard({
  product: { id, image, title, category, price },
}) {
  return (
    <li className='rounded-lg shadow-md overflow-hidden cursor-pointer hover:brightness-110 hover:scale-105 transition ease-in-out'>
      <img
        className='w-full'
        src={image}
        alt={title}
      />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`$${price}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-400'>{category}</p>
    </li>
  );
}
