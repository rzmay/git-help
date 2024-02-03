module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add other paths here where you use Tailwind classes
  ],
  theme: {
    extend: {
      // Extend the default Tailwind theme here
      // For example, you can add custom colors, fonts, etc.
      colors: {
        'welcoming-blue': '#007ace', // Example of a custom color
      },
    },
  },
};
