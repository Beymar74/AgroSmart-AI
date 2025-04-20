import React from 'react';
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="header-container w-full p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-center">{title}</h1>
    </div>
  );
};

export default Header;
