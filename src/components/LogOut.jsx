import { setCookie } from "../utils/cookie";
import { useAuth } from "./AuthContext";

export default function LogOut() {
  const { setIsLogin } = useAuth();
  const handleLogout = () => {
    setIsLogin(false);
    setCookie("accessToken", null, 0);
    setCookie("refreshToken", null, 0);
    window.location.href = "http://localhost:5173";
  };
  return (
    <button className="btn-style" onClick={handleLogout}>
      Log out
    </button>
  );
}
