import chroma from "chroma-js";

interface WebsiteHeroProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor?: string;
  textColor?: string;
  subtleColor?: string;
}

export function WebsiteHero({
  primaryColor,
  secondaryColor,
  accentColor,
  bgColor,
  textColor,
  subtleColor,
}: WebsiteHeroProps) {
  const darkBg = textColor || chroma(primaryColor).darken(3).desaturate(1).hex();
  const heroBg = bgColor ? chroma(bgColor).darken(4).hex() : chroma(primaryColor).darken(3).desaturate(1).hex();
  const darkText = chroma.contrast(heroBg, "white") > 4.5 ? "white" : "black";
  const btnText = chroma.contrast(primaryColor, "white") > 4.5 ? "white" : "black";
  const featureBg = subtleColor || primaryColor;

  return (
    <div className="w-full max-w-[420px] mx-auto rounded-xl overflow-hidden shadow-lg border bg-card transition-transform hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-muted px-4 py-2 flex items-center gap-2 border-b">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-background rounded-md px-3 py-1 text-[10px] text-muted-foreground text-center">
            yourbrand.com
          </div>
        </div>
      </div>

      <div
        className="px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: heroBg, color: darkText }}
      >
        <div className="font-bold text-sm">YourBrand</div>
        <div className="flex gap-4 text-[10px] opacity-70">
          <span className="hover:opacity-100 cursor-pointer transition-opacity">Products</span>
          <span className="hover:opacity-100 cursor-pointer transition-opacity">Pricing</span>
          <span className="hover:opacity-100 cursor-pointer transition-opacity">About</span>
        </div>
      </div>

      <div
        className="px-8 py-12 text-center relative overflow-hidden"
        style={{ backgroundColor: heroBg, color: darkText }}
      >
        <div
          className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full opacity-15 blur-2xl"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: secondaryColor }}
        />

        <div className="relative">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Build something amazing
          </h2>
          <p className="text-xs opacity-60 mb-6 max-w-[240px] mx-auto">
            The modern platform for teams who want to ship faster and build better products.
          </p>
          <div className="flex gap-2 justify-center">
            <button
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: primaryColor, color: btnText }}
            >
              Get Started
            </button>
            <button
              className="px-4 py-2 rounded-lg text-xs font-semibold border transition-all hover:scale-105"
              style={{
                borderColor: chroma(darkText).alpha(0.3).css(),
                color: darkText,
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 flex gap-2 justify-center flex-wrap" style={{ backgroundColor: bgColor || undefined }}>
        {["Fast", "Secure", "Scalable"].map((feature, i) => {
          const colors = [primaryColor, secondaryColor, accentColor];
          const bg = chroma(featureBg).alpha(0.15).css();
          return (
            <span
              key={feature}
              className="px-3 py-1 rounded-full text-[10px] font-medium transition-transform hover:scale-105 cursor-default"
              style={{ backgroundColor: bg, color: colors[i] }}
            >
              {feature}
            </span>
          );
        })}
      </div>
    </div>
  );
}
