import type { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement> & { size?: number };
export function Github({ size = 20, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 19c-4.5 1.3-4.5-2.2-6.3-2.7M15 22v-3.5c0-1 .1-1.4-.5-2 3.3-.4 6.7-1.6 6.7-7.2 0-1.6-.5-2.9-1.5-3.9.1-.4.6-1.8-.2-3.8 0 0-1.3-.4-4.1 1.5a14 14 0 0 0-7 0C5.6 1.2 4.3 1.6 4.3 1.6c-.8 2-.3 3.4-.2 3.8a5.8 5.8 0 0 0-1.5 3.9c0 5.6 3.4 6.8 6.7 7.2-.5.5-.5 1.1-.5 2V22" />
    </svg>
  );
}
export function Linkedin({ size = 20, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M7 10v7m5 0v-7m0 3c0-4 6-4 6 0v4" />
      <circle cx="7" cy="7" r=".7" fill="currentColor" />
    </svg>
  );
}
