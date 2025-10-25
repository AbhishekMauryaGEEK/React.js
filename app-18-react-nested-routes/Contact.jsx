import { Link, Outlet } from "react-router-dom";

export default function Contact() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Contact Page</h1>
      <p>Email: support@example.com</p>
      <p>Phone: +91 9876543210</p>
      
      <div style={{display:"flex", justifyContent:"center", gap:"20px"}}>
        <Link to="contactpath" style={{ textDecoration: "none" }}>Contact-path</Link>
        <Link to="contactabout" style={{ textDecoration: "none" }}>Contact-About</Link>
        <Link to="contactlinks" style={{ textDecoration: "none" }}>Contact-links</Link>
        <Link to="contact1" style={{ textDecoration: "none" }}>Contact-itself</Link>
      </div>
      
      {/* Outlet renders the nested route content here */}
      <Outlet />
    </div>
  );
}
