
import React, { useState } from "react";
import { X, Tag, Plus, ColorPicker as ColorPickerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductColor } from "@/types/product";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  colors: ProductColor[];
  onChange: (colors: ProductColor[]) => void;
  error?: string;
}

// Predefined color options
const predefinedColors: ProductColor[] = [
  { name: "Red", code: "#FF0000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Green", code: "#008000" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
  { name: "Purple", code: "#800080" },
  { name: "Orange", code: "#FFA500" },
  { name: "Pink", code: "#FFC0CB" },
  { name: "Gray", code: "#808080" },
];

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onChange, error }) => {
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("#000000");
  const [isAdding, setIsAdding] = useState(false);

  const addColor = () => {
    if (newColorName.trim()) {
      onChange([...colors, { name: newColorName.trim(), code: newColorCode }]);
      setNewColorName("");
      setNewColorCode("#000000");
      setIsAdding(false);
    }
  };

  const removeColor = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    onChange(newColors);
  };

  const addPredefinedColor = (color: ProductColor) => {
    // Check if color already exists
    if (!colors.some(c => c.name === color.name)) {
      onChange([...colors, color]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <div 
            key={index}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
          >
            {color.code && (
              <div 
                className="w-3 h-3 rounded-full border border-muted" 
                style={{ backgroundColor: color.code }}
              />
            )}
            <span className="text-sm">{color.name}</span>
            <button 
              onClick={() => removeColor(index)} 
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {color.name}</span>
            </button>
          </div>
        ))}
        
        {!isAdding && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 gap-1.5 rounded-full" 
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Color</span>
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="flex items-center gap-2">
          <Input
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value)}
            placeholder="Color name"
            className="flex-1"
          />
          <Input
            type="color"
            value={newColorCode}
            onChange={(e) => setNewColorCode(e.target.value)}
            className="w-12 p-1 h-9"
          />
          <Button 
            size="sm" 
            onClick={addColor}
            disabled={!newColorName.trim()}
          >
            Add
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Predefined colors */}
      <div className="mt-2">
        <div className="text-xs text-muted-foreground mb-1.5">Common colors:</div>
        <div className="flex flex-wrap gap-2">
          {predefinedColors.map((color) => (
            <button
              key={color.name}
              onClick={() => addPredefinedColor(color)}
              className="w-6 h-6 rounded-full border border-muted flex items-center justify-center hover:scale-110 transition-transform"
              style={{ backgroundColor: color.code }}
              title={color.name}
            >
              {colors.some(c => c.name === color.name) && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm font-medium text-destructive mt-2">{error}</p>}
    </div>
  );
};

export default ColorPicker;
