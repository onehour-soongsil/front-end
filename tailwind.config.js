/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // app 폴더 내의 파일들을 추가
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "300vh": "300vh",
      },
      fontSize: {
        "40px": "40px",
      },
    },
  },
  plugins: [],
};
