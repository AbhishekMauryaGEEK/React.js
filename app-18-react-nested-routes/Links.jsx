import { Link ,Outlet} from "react-router-dom";
export default function Links() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Useful Links</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <Link to="linkinside" style={{ textDecoration: "none" }}>Contact-path</Link>
        <li><a href="https://react.dev" target="_blank">React Docs</a></li>
        <li><a href="https://vitejs.dev" target="_blank">Vite Docs</a></li>
        <li><a href="https://reactrouter.com" target="_blank">React Router Docs</a></li>
      </ul>
      <Outlet/>
    </div>
  );
}
