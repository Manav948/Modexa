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
    >
    </Link>
  );
}
