import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Header() {
  return (
    <HelmetProvider>
      <header style={{ backgroundColor: "#4CAF50", padding: "10px", textAlign: "center", color: "white" }}>
        <Helmet>
          <title>Tu Tienda Quarks</title>
          <meta name="description" content="Si no lo encontraste hace click en Productos - Tienda Quarks" />
        </Helmet>
        <h1>Tu Tienda Quarks</h1>
      </header>
    </HelmetProvider>
  );
}

export default Header;

