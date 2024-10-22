// components/Card.js
import React from 'react';

const Card : React.FC<{title: string; content: string;}> = ({ title, content }) => {
  return (
    <div className="card bg-base-100 w-full  shadow-xl flex flex-col justify-between md:h-96">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-secondary">Done</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
