
import React from 'react';
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ButtonHoverProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  as?: "button" | "link" | "a";
  to?: string;
  className?: string;
  target?: string;
}

export const ButtonHover = ({
  children,
  href,
  as = "button",
  to,
  className,
  target,
  ...props
}: ButtonHoverProps) => {
  const baseClasses = cn(
    "relative px-6 py-3 font-medium text-sm rounded-full border border-highlight/20 bg-dark-300/50 text-white backdrop-blur-sm hover:border-highlight/40 transition-all duration-300 inline-flex items-center gap-2",
    className
  );
  
  if (as === "link" && to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }
  
  if (href) {
    const anchorProps = {
      href,
      className: baseClasses,
      target,
    };
    return (
      <a {...anchorProps}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
};
