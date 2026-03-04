import chroma from "chroma-js";

interface MobileAppScreenProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor?: string;
  textColor?: string;
  subtleColor?: string;
}

export function MobileAppScreen({
  primaryColor,
  secondaryColor,
  accentColor,
  bgColor,
  textColor,
  subtleColor,
}: MobileAppScreenProps) {
  const primaryText = chroma.contrast(primaryColor, "white") > 4.5 ? "white" : "black";
  const fabText = chroma.contrast(accentColor, "white") > 4.5 ? "white" : "black";

  const listItems = [
    { label: "Design System", badge: "3 new", color: primaryColor },
    { label: "Brand Guidelines", badge: "Updated", color: secondaryColor },
    { label: "Component Library", badge: null, color: accentColor },
    { label: "Color Tokens", badge: "Draft", color: primaryColor },
  ];

  return (
    <div className="w-full max-w-[280px] mx-auto transition-transform hover:-translate-y-1">
      <div className="rounded-[2rem] border-4 border-gray-800 dark:border-gray-600 bg-card overflow-hidden shadow-xl">
        <div className="bg-gray-800 dark:bg-gray-700 flex justify-center py-1">
          <div className="h-4 w-24 rounded-b-xl bg-gray-800 dark:bg-gray-700" />
        </div>

        <div
          className="px-5 py-2 flex justify-between items-center text-[9px] font-medium"
          style={{ backgroundColor: primaryColor, color: primaryText }}
        >
          <span>9:41</span>
          <div className="flex gap-1">
            <span>&#9679;&#9679;&#9679;</span>
          </div>
        </div>

        <div
          className="px-5 py-4"
          style={{ backgroundColor: primaryColor, color: primaryText }}
        >
          <div className="text-lg font-bold">Projects</div>
          <div className="text-[10px] opacity-70">4 active projects</div>
        </div>

        <div className="divide-y divide-border">
          {listItems.map((item, i) => (
            <div
              key={i}
              className="px-5 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: chroma(item.color).alpha(0.15).css(),
                  color: item.color,
                }}
              >
                {item.label[0]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">
                  {item.label}
                </div>
                <div className="text-[10px] text-muted-foreground">Last edited 2h ago</div>
              </div>
              {item.badge && (
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: chroma(item.color).alpha(0.1).css(),
                    color: item.color,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="relative h-16">
          <div
            className="absolute bottom-3 right-5 h-12 w-12 rounded-full flex items-center justify-center shadow-lg text-xl font-light transition-transform hover:scale-110 cursor-pointer"
            style={{ backgroundColor: accentColor, color: fabText }}
          >
            +
          </div>
        </div>

        <div className="border-t border-border px-6 py-3 flex justify-around">
          {["Home", "Search", "Profile"].map((item, i) => (
            <div key={item} className="text-center cursor-pointer group">
              <div
                className="h-1.5 w-1.5 rounded-full mx-auto mb-1"
                style={{
                  backgroundColor: i === 0 ? primaryColor : "transparent",
                }}
              />
              <span
                className="text-[9px] font-medium transition-colors"
                style={{
                  color: i === 0 ? primaryColor : undefined,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
