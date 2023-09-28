import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/categories">
        <button>Categories</button>
      </Link>
    </nav>
  );
}

export default Navbar;
