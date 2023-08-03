/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // app 폴더 내의 파일들을 추가
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "button-color": "#E43000",
        "homepage-title-color": "#383838",
      },
      spacing: {
        722: "722px",
        236: "236px",
        49: "49px",
        61: "61px",
        44: "44px",
      },
      width: {
        177: "177px",
        220: "220px",
      },
      height: {
        "300vh": "300vh",
        75: "75px",
      },
      lineHeight: {
        "extra-loose": "2.5",
        12: "3rem",
        15: "4rem",
        130: "130px",
      },
    },

    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      l: "1.25rem",
      xl: "1.5rem",

      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "3xl": [
        "4rem",
        {
          lineHeight: "5rem",
          letterSpacing: "-0.04em",
          fontWeight: "900",
        },
      ],
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "60px",
      "9xl": "8rem",
      "40px": "40px",
      "28px": "28px",
    },
  },
  plugins: [],
};
