import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return <div>Header</div>;
}

export default Header;
