# PalettePop 🎨

A comprehensive color palette generator and analysis tool for designers and developers. Generate, analyze, and visualize color schemes that pop.

![PalettePop Screenshot](https://rubenv.net/tools/palettepop/og-image.png)

## 🌟 Features

- **Harmony-Based Generation**: Create palettes using classic color harmonies (Complementary, Analogous, Triadic, Tetradic, etc.).
- **Image Color Extraction**: Upload an image to automatically extract its dominant color palette.
- **Accessibility Tools**: Includes a built-in Contrast Checker (WCAG guidelines) and Color Blindness Simulator.
- **Design Visualization**: See your colors in action with brand mockups and UI component previews.
- **Export Options**: Export your palettes to CSS, SCSS, JSON, or Tailwind config formats.
- **Local Persistence**: Save your favorite palettes locally and export/import them as JSON files.
- **Keyboard Shortcuts**: Power-user features with a command palette and quick-action shortcuts.

## 🚀 Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide React icons
- **UI Components**: Radix UI (via shadcn/ui)
- **State Management**: React Query & Custom Hooks
- **Color Logic**: Chroma.js for advanced color manipulations
- **Routing**: React Router DOM

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rubenvieira/palettepop.git
   cd palettepop
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## ⌨️ Keyboard Shortcuts

- `Space`: Generate a random color palette.
- `Ctrl/Cmd + K`: Open Command Palette.
- `Ctrl/Cmd + Z`: Undo last change.
- `Ctrl/Cmd + Shift + Z`: Redo change.
- `?`: Show all keyboard shortcuts.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ruben Vieira**
- Website: [rubenv.net](https://rubenv.net)
- GitHub: [@rubenvieira](https://github.com/rubenvieira)
