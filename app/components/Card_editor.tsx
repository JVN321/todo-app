import React from "react";
import { FaTrashAlt, FaSave } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";

const CardEditor: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-xl p-6">
        <div className="card-body">
          <input type="text" placeholder="Title" className="input input-bordered w-full mb-4" />
          <textarea className="textarea textarea-primary w-full mb-4" placeholder="Description"></textarea>
          <div className="card-actions justify-end space-x">
            <button className="btn flex items-center btn-outline border-red-700 hover:border-red-700 hover:bg-red-700 hover:bg-opacity-20">
              <FaTrashAlt className="text-lg text-red-600" />
            </button>
            <button className="btn flex items-center btn-outline border-green-700 hover:border-green-700 hover:bg-green-700 hover:bg-opacity-20">
              <FaSave className="text-lg text-green-600" />
            </button>
            <button className="btn flex items-center btn-outline hover:border-white border-white hover:bg-white hover:bg-opacity-20" onClick={onClose}>
              <MdArrowBack className="text-lg text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
