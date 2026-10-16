/* Vector wordmark, rebuilt so it reads on the dark theme.
   Lime "Q" check-mark glyph + charcoal/white "Work", echoing the brand. */

export function Logo({
  className = "",
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="inline-flex items-center gap-[0.12em] leading-none">
        <QMark />
        <span className="text-[1.15em] font-bold tracking-[-0.02em] text-fg">
          Work
        </span>
      </span>
      {showTagline && (
        <span className="mt-[0.5em] text-[0.34em] font-medium tracking-[0.34em] text-fg-faint">
          AVALIE. PREVINA. PROTEJA.
        </span>
      )}
    </span>
  );
}

function QMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-[1.2em] w-[1.2em] shrink-0"
      aria-hidden
    >
      {/* Q ring */}
      <circle cx="19" cy="20" r="13" fill="none" stroke="var(--color-lime)" strokeWidth="6.5" />
      {/* Q tail */}
      <path d="M26 28 L33 35" stroke="var(--color-lime)" strokeWidth="6.5" strokeLinecap="round" />
      {/* check mark, inverted to white so it reads on the dark theme
          (back to brand charcoal on paper, see print styles) */}
      <path
        d="M12 20.5 l4.5 4.5 L28 12.5"
        fill="none"
        stroke="var(--logo-check, #f4f6f7)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
