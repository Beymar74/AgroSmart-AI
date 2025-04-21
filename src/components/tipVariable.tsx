import React from 'react';

const TipVariable: React.FC = () => {
  return (
    <div className="flex items-center">
      <button className="p-2 border rounded flex items-center">
        <img src="variable.png" alt="Variable Icon" className="w-4 h-4 mr-2" />
        Tipo de variable
      </button>
    </div>
  );
};

export default TipVariable;
