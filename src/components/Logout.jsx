import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/components/CartContext";

const Logout = () => {
  const { logout } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate("/");
    };
    performLogout();
  }, [logout, navigate]);

  return null; 
};

export default Logout;