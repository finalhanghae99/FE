import React from "react";

function Footer() {
  return <div>Footer</div>;
}
function Layout({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
export default Layout;
