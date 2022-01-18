import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="container mx-auto border-2">
      <Header />
      <div>{children}</div>
    </div>
  );
}
