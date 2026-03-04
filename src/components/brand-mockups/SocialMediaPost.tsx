import chroma from "chroma-js";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

interface SocialMediaPostProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function SocialMediaPost({
  primaryColor,
  secondaryColor,
  accentColor,
}: SocialMediaPostProps) {
  const primaryText = chroma.contrast(primaryColor, "white") > 4.5 ? "white" : "black";

  return (
    <div className="w-full max-w-[320px] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border">
      {/* Header bar */}
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{ backgroundColor: primaryColor, color: primaryText }}
      >
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: chroma(primaryColor).brighten(1.5).hex(), color: primaryColor }}
        >
          PP
        </div>
        <div>
          <div className="text-sm font-semibold">PalettePop</div>
          <div className="text-[10px] opacity-70">Sponsored</div>
        </div>
      </div>

      {/* Image area with gradient */}
      <div
        className="h-48"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
        }}
      >
        <div className="h-full flex items-center justify-center">
          <div className="text-center" style={{ color: primaryText }}>
            <div className="text-2xl font-bold tracking-tight">Your Brand</div>
            <div className="text-sm opacity-80">Starts with great color</div>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Heart className="h-5 w-5 cursor-pointer" style={{ color: accentColor }} />
          <MessageCircle className="h-5 w-5 cursor-pointer text-gray-600" />
          <Send className="h-5 w-5 cursor-pointer text-gray-600" />
        </div>
        <Bookmark className="h-5 w-5 cursor-pointer text-gray-600" />
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">palettepop </span>
          Beautiful color palettes for your next project.
        </p>
        <p className="text-[10px] text-gray-400 mt-1 uppercase">2 hours ago</p>
      </div>
    </div>
  );
}
