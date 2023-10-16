import React from 'react';

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  return (
    <li>
      <img
        src={image}
        alt={title}
      />
      <div>
        <p>{title}</p>
        <p>{option}</p>
      </div>
    </li>
  );
}
