import chroma from "chroma-js";

interface WebsiteHeroProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function WebsiteHero({
  primaryColor,
  secondaryColor,
  accentColor,
}: WebsiteHeroProps) {
  const darkBg = chroma(primaryColor).darken(3).desaturate(1).hex();
  const darkText = chroma.contrast(darkBg, "white") > 4.5 ? "white" : "black";
  const btnText = chroma.contrast(primaryColor, "white") > 4.5 ? "white" : "black";

  return (
    <div className="w-full max-w-[420px] mx-auto rounded-xl overflow-hidden shadow-lg border bg-white">
      {/* Browser chrome */}
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 text-center">
            yourbrand.com
          </div>
        </div>
      </div>

      {/* Nav */}
      <div
        className="px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: darkBg, color: darkText }}
      >
        <div className="font-bold text-sm">YourBrand</div>
        <div className="flex gap-4 text-[10px] opacity-70">
          <span>Products</span>
          <span>Pricing</span>
          <span>About</span>
        </div>
      </div>

      {/* Hero */}
      <div
        className="px-8 py-12 text-center relative overflow-hidden"
        style={{ backgroundColor: darkBg, color: darkText }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full opacity-15 blur-2xl"
          style={{ backgroundColor: accentColor }}
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
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: primaryColor, color: btnText }}
            >
              Get Started
            </button>
            <button
              className="px-4 py-2 rounded-lg text-xs font-semibold border transition-transform hover:scale-105"
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

      {/* Feature pills */}
      <div className="px-6 py-4 flex gap-2 justify-center flex-wrap">
        {["Fast", "Secure", "Scalable"].map((feature, i) => {
          const colors = [primaryColor, secondaryColor, accentColor];
          const bg = chroma(colors[i]).alpha(0.1).css();
          return (
            <span
              key={feature}
              className="px-3 py-1 rounded-full text-[10px] font-medium"
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
