interface FlagIconProps {
  code: string;
  alt?: string;
  className?: string;
  size?: 20 | 40 | 80;
}

export function FlagIcon({ code, alt = '', className = '', size = 40 }: FlagIconProps) {
  const lower = code.toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w${size}/${lower}.png`}
      srcSet={`https://flagcdn.com/w${size * 2}/${lower}.png 2x`}
      width={size}
      alt={alt}
      className={`rounded-sm object-cover inline-block ${className}`}
    />
  );
}
