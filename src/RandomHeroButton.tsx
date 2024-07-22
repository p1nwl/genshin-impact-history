interface RandomHeroButtonProps {
  onClick: () => void;
}

function RandomHeroButton({ onClick }: RandomHeroButtonProps) {
  return (
    <button onClick={onClick} className="random-hero">
      Get Random Hero
    </button>
  );
}

export default RandomHeroButton;
