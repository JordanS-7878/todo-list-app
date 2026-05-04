import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

export default function SearchBar({ query, setQuery }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Input wrapper controls width properly */}
      <div
        className={`transition-all duration-200 overflow-hidden ${
          isOpen ? "w-48 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <Input
          placeholder="Search"
          variant="underlined"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      {/* Icon toggle */}
      <SearchOutlined
        className="p-2 text-4xl hover:bg-gray-300 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
