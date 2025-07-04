import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <form className="w-full max-w-xl mx-auto mb-0">
      <input
        type="text"
        placeholder="Enter keywords..."
        className="w-full bg-gray-800 text-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </form>
  );
} 