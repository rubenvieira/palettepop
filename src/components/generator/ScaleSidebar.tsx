import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, X } from "lucide-react";
import { ColorScale, ColorScaleRole, colorScaleRoleDefaults } from "@/lib/colors";
import chroma from "chroma-js";

interface ScaleSidebarProps {
  scales: ColorScale[];
  selectedScaleId: string;
  onSelectScale: (id: string) => void;
  onAddScale: (role: ColorScaleRole) => void;
  onRemoveScale: (id: string) => void;
}

const roleLabels: Record<ColorScaleRole, string> = {
  primary: "Primary",
  secondary: "Secondary",
  success: "Success",
  warning: "Warning",
  error: "Error",
  neutral: "Neutral",
  custom: "Custom",
};

export const ScaleSidebar = memo(({
  scales,
  selectedScaleId,
  onSelectScale,
  onAddScale,
  onRemoveScale,
}: ScaleSidebarProps) => {
  const existingRoles = new Set(scales.map((s) => s.role));

  return (
    <div className="w-full space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 mb-3">
        Color Scales
      </div>
      {scales.map((scale) => {
        const isSelected = scale.id === selectedScaleId;
        const shade500 = scale.shades.find((s) => s.name === 500)?.hex || scale.baseColor;
        const isValid = chroma.valid(shade500);

        return (
          <div
            key={scale.id}
            className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
              isSelected
                ? "bg-primary/10 ring-1 ring-primary/30"
                : "hover:bg-muted/50"
            }`}
            onClick={() => onSelectScale(scale.id)}
          >
            <div
              className="w-5 h-5 rounded-md shrink-0 border border-white/10"
              style={{
                backgroundColor: isValid ? shade500 : "transparent",
              }}
            />
            <span className="text-sm font-medium capitalize flex-1 truncate">
              {scale.name}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase">
              {scale.role}
            </span>
            {scales.length > 1 && (
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveScale(scale.id);
                }}
                title="Remove scale"
              >
                <X className="h-3 w-3 text-destructive" />
              </button>
            )}
          </div>
        );
      })}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-2">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Color Scale
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {(Object.keys(colorScaleRoleDefaults) as ColorScaleRole[]).map((role) => (
            <DropdownMenuItem
              key={role}
              onClick={() => onAddScale(role)}
              className="flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: colorScaleRoleDefaults[role].defaultColor }}
              />
              <span>{roleLabels[role]}</span>
              {existingRoles.has(role) && role !== "custom" && (
                <span className="text-[10px] text-muted-foreground ml-auto">exists</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
