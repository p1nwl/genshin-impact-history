import { useNavigate } from "react-router-dom";

const BackToHomeButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <button onClick={handleClick} className="back-to-home-button">
      Back to Main Page
    </button>
  );
};

export default BackToHomeButton;
