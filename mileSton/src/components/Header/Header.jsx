import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-gray-900 to-black shadow-md border-b border-gray-800">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo width="50px" />
            <span className="text-xl font-semibold text-yellow-400 tracking-wide">
              MileSton
            </span>
          </Link>

          {/* Nav items */}
          <ul className="flex items-center gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded-full bg-emerald-600 text-gray-100 hover:bg-emerald-700 transition-all duration-200 shadow-md shadow-emerald-500/20"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Logout only if logged in */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
