import Link from "next/link";

interface StartProjectButtonProps {
  href?: string;
  className?: string;
  theme?: "light" | "dark";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function StartProjectButton({
  href = "#inquiry-station",
  className = "",
  theme = "light",
  onClick,
}: StartProjectButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`start-project-button ${theme === "dark" ? "start-project-button-dark" : ""} ${className}`}
    >
      <span>START A PROJECT</span>
      <span aria-hidden="true" className="start-project-arrow">→</span>
    </Link>
  );
}
