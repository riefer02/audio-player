import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <div>{children}</div>
    </div>
  );
}
