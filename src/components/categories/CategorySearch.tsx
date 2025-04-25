
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CategorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySearch({ value, onChange }: CategorySearchProps) {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search categories..." 
        className="pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
