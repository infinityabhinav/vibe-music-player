import { NavLink, useNavigate } from "react-router-dom";
import Profile from "./Profile";

export default function Header() {
    const navigate=useNavigate();
  return (
    <nav className="nav">
      <div className="logo" onClick={()=>navigate("/")}>🎵 Vibe Music</div>

      <ul className="menu">
        <NavLink className="nav-link" to="/song"><li>Songs</li></NavLink>
        <NavLink to="/about" className="nav-link"><li>About</li></NavLink>
        <Profile/>
      </ul>
    </nav>
  )
}
