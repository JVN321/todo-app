
"use client";
// context/EditingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditingContextType {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const EditingContext = createContext<EditingContextType | undefined>(undefined);

export const EditingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <EditingContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditingContext = () => {
  const context = useContext(EditingContext);
  if (!context) {
    throw new Error('useEditingContext must be used within an EditingProvider');
  }
  return context;
};
