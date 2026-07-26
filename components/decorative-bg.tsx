export function DecorativeBg() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute -top-40 -right-40 size-[600px] opacity-[0.04] text-primary" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="absolute -bottom-32 -left-32 size-[500px] opacity-[0.03] text-primary" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="180" height="180" rx="20" stroke="currentColor" strokeWidth="0.5" />
        <rect x="30" y="30" width="140" height="140" rx="10" stroke="currentColor" strokeWidth="0.5" />
        <rect x="50" y="50" width="100" height="100" rx="5" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="absolute top-1/3 left-1/4 size-[300px] opacity-[0.02] text-primary" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 10L190 190H10L100 10Z" stroke="currentColor" strokeWidth="0.5" />
        <path d="M100 50L160 170H40L100 50Z" stroke="currentColor" strokeWidth="0.3" />
      </svg>
    </div>
  )
}
