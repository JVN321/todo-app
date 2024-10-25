import { useState } from "react";

interface CardProps {
  title: string;
  content: string;
  onEditClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, content, onEditClick }) => {
  return (
    <div className="card bg-base-100 w-full shadow-xl flex flex-col justify-between h-64 md:h-96">
      <div className="card-body p-4 overflow-hidden" onClick={onEditClick}>
        <h2 className="card-title text-lg font-bold truncate max-h-12">
          {title}
        </h2>
        <div className="content-wrapper overflow-auto">
          <p className="text-sm whitespace-normal break-words">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
