import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Icon>
);
export const TargetIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </Icon>
);
export const BookIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 4H20v14H5.5A1.5 1.5 0 0 0 4 19.5v-14A1.5 1.5 0 0 1 5.5 4Z" />
    <path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20" />
  </Icon>
);
export const ChatIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5h16v11H9.5L5 19.5V16H4V5Z" />
  </Icon>
);
export const FlagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
  </Icon>
);
export const FlameIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3c1 3.4 5 5.2 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2.2-4.2.1 1.6.9 2.7 2 3 .4-3-.6-5.6.8-8.8Z" />
  </Icon>
);
export const TicketIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4V7Z" />
    <path d="M14.5 7v10" strokeDasharray="1.5 2.5" />
  </Icon>
);
export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8h16M4 16h16" />
  </Icon>
);
export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);
export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 6h17v12h-17z" />
    <path d="m3.5 7 8.5 6.5L20.5 7" />
  </Icon>
);
export const InstagramIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </Icon>
);
export const FacebookIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 8.5h2.5V5H14a4 4 0 0 0-4 4v2.5H7.5V15H10v5h3.5v-5H16l.7-3.5h-3.2V9.2c0-.4.2-.7.5-.7Z" />
  </Icon>
);
export const InfinityIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 12c-1.6-2.4-3-3.5-4.7-3.5a3.5 3.5 0 0 0 0 7c1.7 0 3.1-1.100 4.700-3.500Zm0 0c1.600 2.400 3 3.500 4.700 3.500a3.500 3.500 0 0 0 0-7c-1.700 0-3.100 1.100-4.700 3.500Z" />
  </Icon>
);
