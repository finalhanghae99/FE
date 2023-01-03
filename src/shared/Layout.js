import React from "react";

function Header() {
  return <div>Header</div>;

}
function Footer() {
  return <div>Footer</div>;
}
function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
export default Layout;
