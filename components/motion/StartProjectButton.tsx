"use client";

interface StartProjectButtonProps {
  href?: string;
  className?: string;
  theme?: "light" | "dark";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function StartProjectButton({
  href = "https://mail.google.com/mail/?view=cm&fs=1&to=modexa1819@gmail.com&su=Project%20Inquiry%20%2F%2F%20Modexa",
  className = "",
  theme = "light",
  onClick,
}: StartProjectButtonProps) {
  const isDark = theme === "dark";

  return (
    <a>
      
    </a>
  );
}
