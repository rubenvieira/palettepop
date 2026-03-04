import { useState, useMemo } from "react";
import { PaletteColor } from "@/lib/colors";
import { generateContrastPairs, ContrastResult } from "@/lib/accessibility";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface ContrastCheckerProps {
  palettes: PaletteColor[][];
  paletteNames: string[];
}

type FilterLevel = "all" | "aa" | "aaa" | "fail";

export function ContrastChecker({ palettes, paletteNames }: ContrastCheckerProps) {
  const [filter, setFilter] = useState<FilterLevel>("all");
  const [expanded, setExpanded] = useState(false);

  const allResults = useMemo(
    () =>
      palettes.length === 0
        ? []
        : palettes.flatMap((palette, i) =>
            generateContrastPairs(palette, paletteNames[i] || `color${i + 1}`)
          ),
    [palettes, paletteNames]
  );

  if (palettes.length === 0) return null;

  const filtered = allResults.filter((r) => {
    if (filter === "aa") return r.aaNormalText;
    if (filter === "aaa") return r.aaaNormalText;
    if (filter === "fail") return !r.aaNormalText;
    return true;
  });

  const displayResults = expanded ? filtered : filtered.slice(0, 12);
  const passCount = allResults.filter((r) => r.aaNormalText).length;
  const aaaCount = allResults.filter((r) => r.aaaNormalText).length;

  return (
    <div className="mt-16 animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">
        Accessibility
      </h2>
      <p className="text-center text-muted-foreground mb-4">
        WCAG contrast compliance for your palette
      </p>

      <div className="flex items-center justify-center gap-4 mb-4 text-sm">
        <span className="text-muted-foreground">
          {allResults.length} pairs tested
        </span>
        <span className="text-green-600 dark:text-green-400 font-medium">
          {passCount} AA pass
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-medium">
          {aaaCount} AAA pass
        </span>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {(["all", "aa", "aaa", "fail"] as FilterLevel[]).map((level) => (
          <Button
            key={level}
            variant={filter === level ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(level)}
            className="text-xs"
          >
            {level === "all"
              ? "All"
              : level === "aa"
                ? "AA Pass"
                : level === "aaa"
                  ? "AAA Pass"
                  : "Failing"}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayResults.map((result, i) => (
          <ContrastCard key={i} result={result} />
        ))}
      </div>

      {filtered.length > 12 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" /> Show all {filtered.length} pairs
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

function ContrastCard({ result }: { result: ContrastResult }) {
  return (
    <Card className="overflow-hidden group">
      <div
        className="h-20 flex flex-col items-center justify-center px-4 gap-1"
        style={{
          backgroundColor: result.background,
          color: result.foreground,
        }}
      >
        <span className="font-semibold text-sm">Sample Text</span>
        <span className="text-[10px] font-normal opacity-70">Aa Bb Cc 123</span>
      </div>
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-mono font-bold">{result.ratio}:1</span>
          <div className="flex gap-1">
            <Badge
              variant={result.aaNormalText ? "default" : "destructive"}
              className="text-[10px] px-1.5 py-0"
            >
              AA
            </Badge>
            <Badge
              variant={result.aaaNormalText ? "default" : "destructive"}
              className="text-[10px] px-1.5 py-0"
            >
              AAA
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[10px] text-muted-foreground font-mono truncate flex-1">
            {result.fgLabel} on {result.bgLabel}
          </div>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
            onClick={() => {
              navigator.clipboard.writeText(
                `${result.foreground} on ${result.background} — ${result.ratio}:1`
              );
              showSuccess("Contrast info copied!");
            }}
          >
            <Copy className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
