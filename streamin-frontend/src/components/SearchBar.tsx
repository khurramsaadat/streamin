interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchBar({ value, onChange, className = '' }: SearchBarProps) {
  return (
    <input
      type="text"
      className={`w-full max-w-lg px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-100 placeholder-gray-400 ${className}`}
      placeholder="Enter keywords..."
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label="Search movies and TV shows"
    />
  );
} 