const RainbowLogo = ({ className = "", width = 100 }: { className?: string; width?: number }) => (
  <svg viewBox="0 0 200 80" width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rainbow-arc" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="20%" stopColor="#ffd93d" />
        <stop offset="40%" stopColor="#6bcb77" />
        <stop offset="60%" stopColor="#4d96ff" />
        <stop offset="80%" stopColor="#c77dff" />
        <stop offset="100%" stopColor="#ff6b6b" />
      </linearGradient>
    </defs>
    <path d="M50 38 Q100 2 150 38" stroke="url(#rainbow-arc)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <text x="100" y="55" textAnchor="middle" fill="white" fontFamily="'Cormorant Garamond', serif" fontSize="16" fontWeight="400" letterSpacing="0.05em">
      Rainbow
    </text>
    <text x="100" y="70" textAnchor="middle" fill="white" fontFamily="'DM Sans', sans-serif" fontSize="7" fontWeight="300" letterSpacing="0.15em" opacity="0.6">
      COFFEE &amp; MORE
    </text>
  </svg>
);

export default RainbowLogo;
