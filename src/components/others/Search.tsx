import { Home, Search, User } from 'lucide-react';

export default function SearchIcon() {
  return (
    <div className="flex gap-4 items-center">
      <Home size={24} color="blue" />
      <Search size={24} />
      <User size={32} className="text-red-500" />
    </div>
  );
}