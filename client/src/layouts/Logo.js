import userEvent from "@testing-library/user-event";
import { ReactComponent as LogoDark } from "../assets/images/logos/Logoblack.svg";
import { Link, useNavigate } from "react-router-dom";

const Logo = () => {
  let navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/starter", { replace: true });
  }
  return (
    <Link to="/starter" onClick={handleLogoClick}>
      <LogoDark />
    </Link>
  );
};

export default Logo;
