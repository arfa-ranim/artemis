import { useState, useEffect, useRef } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "/img/Logo.avif"; 
import { useCart } from '@/components/CartContext';

export const Navbar = ({ onSearch }) => {
  const { cartCount, user } = useCart(); // Get user from CartContext
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (searchQuery && !window.location.pathname.includes("/animalerie")) {
      navigate("/animalerie");
    }
  }, [searchQuery, navigate]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (!window.location.pathname.includes("/animalerie")) {
      navigate("/animalerie");
    }
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };


  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#5e5142]/90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-12 w-12" /> 
              <Link 
                to="/" 
                className="text-2xl font-serif text-white text-shadow"
              >
                Artemis Store
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className={cn(
                    "pl-10 pr-4 py-1.5 rounded-full",
                    "bg-gray-100/90 border border-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent",
                    "transition-all duration-300 ease-in-out",
                    isSearchFocused ? "w-[250px]" : "w-[200px]"
                  )}
                />
              </div>

              <Link
                to="/user-cart"
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
              >
                <ShoppingCart className="h-6 w-6 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-1.5 rounded-full text-amber-100 hover:text-white transition-colors duration-300"
                  >
                    <User className="h-4 w-4" />
                    {user.isSuperUser && <span className="text-xs">(Admin)</span>}
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center space-x-2 px-4 py-1.5 rounded-full text-amber-100 hover:text-white transition-colors duration-300"
                  >
                    <span>Logout</span>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 px-4 py-1.5 rounded-full text-amber-100 hover:text-white transition-colors duration-300"
                >
                  <User className="h-4 w-4" />
                  <span>Se connecter</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex justify-center pb-2">
            <nav className="flex space-x-8">
              {[
                "Accueil",
                "Animalerie",
                "Annonces",
                "Nos Services",
                "Members", 
                "Avis",
                "À propos"
              ].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-').replace('à', 'a')}`}
                  className="text-amber-100 hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};