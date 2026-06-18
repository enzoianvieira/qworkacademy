import type { SVGProps } from "react";
import type { IconName } from "@/lib/content";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Compass(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 5-5 2.1 2.1-5 5-2.1Z" />
    </svg>
  );
}
export function User(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.3 3-5.5 7-5.5s7 2.2 7 5.5" />
    </svg>
  );
}
export function Manager(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M3 21V8l9-5 9 5v13" />
      <path d="M3 21h18M9 21v-6h6v6M9 11h.01M15 11h.01" />
    </svg>
  );
}
export function Mail(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
export function Sheet(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M4 9h16M4 15h16M10 3v18" />
    </svg>
  );
}
export function Lifebuoy(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m5.5 5.5 3.6 3.6M14.9 14.9l3.6 3.6M18.5 5.5l-3.6 3.6M9.1 14.9l-3.6 3.6" />
    </svg>
  );
}
export function Shield(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export const ICONS: Record<IconName, (p: P) => React.ReactElement> = {
  compass: Compass,
  user: User,
  manager: Manager,
  mail: Mail,
  sheet: Sheet,
  lifebuoy: Lifebuoy,
  shield: Shield,
};

export function Icon({ name, ...p }: { name: IconName } & P) {
  const C = ICONS[name];
  return <C {...p} />;
}

/* Utility icons used across pages */
export function ArrowRight(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function Check(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 6.5" />
    </svg>
  );
}
export function Download(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </svg>
  );
}
export function Logout(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3M10 12H3m0 0 3.5-3.5M3 12l3.5 3.5" />
    </svg>
  );
}
export function ChevronDown(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
export function Copy(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </svg>
  );
}
export function Menu(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function Close(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
