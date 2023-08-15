import React from 'react';

export default function Button({ text, onClick, style }) {
  return (
    <button
      className={`bg-brand text-white py-2 px-4 rounded-md hover:brightness-150 ${style}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
