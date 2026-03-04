import { useState } from "react";
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
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const primaryText = chroma.contrast(primaryColor, "white") > 4.5 ? "white" : "black";

  return (
    <div className="w-full max-w-[320px] mx-auto bg-card rounded-2xl shadow-lg overflow-hidden border transition-transform hover:-translate-y-1 hover:shadow-xl">
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

      <div
        className="h-48 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center" style={{ color: primaryText }}>
            <div className="text-2xl font-bold tracking-tight">Your Brand</div>
            <div className="text-sm opacity-80">Starts with great color</div>
          </div>
        </div>
        {/* Decorative circles */}
        <div
          className="absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-20"
          style={{ backgroundColor: chroma(secondaryColor).brighten(1).hex() }}
        />
        <div
          className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full opacity-15"
          style={{ backgroundColor: chroma(accentColor).brighten(1).hex() }}
        />
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Heart
            className={`h-5 w-5 cursor-pointer transition-all ${liked ? "fill-current scale-110" : "hover:scale-110"}`}
            style={{ color: accentColor }}
            onClick={() => setLiked(!liked)}
          />
          <MessageCircle className="h-5 w-5 cursor-pointer text-muted-foreground hover:scale-110 transition-transform" />
          <Send className="h-5 w-5 cursor-pointer text-muted-foreground hover:scale-110 transition-transform" />
        </div>
        <Bookmark
          className={`h-5 w-5 cursor-pointer transition-all ${saved ? "fill-current" : ""} hover:scale-110`}
          style={{ color: saved ? primaryColor : undefined }}
          onClick={() => setSaved(!saved)}
        />
      </div>

      <div className="px-4 pb-4">
        <p className="text-xs font-semibold" style={{ color: accentColor }}>
          {liked ? "1,235 likes" : "1,234 likes"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="font-semibold text-foreground">palettepop </span>
          Beautiful color palettes for your next project.
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase">2 hours ago</p>
      </div>
    </div>
  );
}
