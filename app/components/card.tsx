import { useState } from "react";

interface CardProps {
  title: string;
  content: string;
  onEditClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, content ,onEditClick }) => {

  return (
    <div className="card bg-base-100 w-full shadow-xl flex flex-col justify-between h-64 md:h-96">
      <div className="card-body" onClick={onEditClick}>
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Card;
