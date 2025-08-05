import { Search } from "lucide-react";

export default function Header() {
    
  return (
    <>
      <div className="header-section flex gap-4 items-center">
        <Search size={24} />
        <input
          type="search"
          name="search-input"
          id="search-input"
          placeholder="Search your course"
        />
      </div>
    </>
  );
}
