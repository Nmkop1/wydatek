/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }, colors: {
        primaryBlack: "#1A232E",
        "secondary-white": "#c7c7c7",
        white: "#ffffff",
        black: "#000000",
        gray: "#8c8a8a",
        gray2: "#eeeeee",
        lightgray: "#F7F7F7",
        jasny: "#FDFDFD",
        dark: "#333333",
        primaryBlue: "#122d47",
        secondaryBlue: "#3898ec",
        lightblue: "#199ef3",
        darkblue: "#01013e",
        brown: "#987654",
        brown1: "#944A00",
        brown2: "#F0C278",
        nowy: "#F2C1B5",
        zielony1: "#0A7068",
        zielony2: "#0d9488",
        border: "rgba(42, 58, 81, .5)",
        jeden: "#2E6171",
        dwa: "#556F7A",
        trzy: "#798086",
        cztery: "#B79FAD",
        piec: "#D4AFCD",
        czesc: "#84BCCD",

        czerwony: "rgb(249 128 128 )",
        text2: "#384147",
        buttonHover: "#F0F5F9",
        bgHover: "#2C5069",
        border: "#204055",
        barHove: "#2F74A2",
        barBorder: "rgb(0,0,0,0.1)",
        text: "rgb(0, 0, 0, 0.87)",
        textAccent: "#657681",
        textMenu: "#3f546f",
        tlo: "#EEF0F2",
        itemTlo: "#f9fafb",
        galeria: "#EBF6F9",
        white2: "rgba(255, 255, 255, .7)",
        wykres: {
          1: "#5BE12C",
          2: "#A5E32B",
          3: "#E6DA2A",
          4: "#E88F29",
          5: "#EA4228",
        },
        niebieski: {
          1: "#F4F5F6",
          2: "rgb(224 231 235)",
          3: "#264B64",
          4: "#F4F5F6",
          5: "#39485D",
          6: "#3f546f",
          7: "#2a3a51",
          9: "#35445A",
          10: "#2a3a51",
        }, 
        fiolet: {
          1: "#EDE7F6",
          2: "#B39DDB",
          3: "#5C6BC0",
          4: "#5e35b1",
          5: "#4527A0",
          6: "rgb(103, 58, 183, .5)",
        },
        zielony: {
          1: "#80C33F",
          2: "#69F0AE",
          3: "#159387",
          4: "#117168",
        },
        teal: {
          1: "#115e59",
          2: "#75FFF6",
          3: "#54E8DE",
          4: "#9C4519",
          5: "#E88554",
        },
        orange: {
          1: "#FBE9E7",
          2: "#FFAB91",
          3: "#FA903E",
        },
        error: {
          1: "#EF9A9A",
          2: "#F44336",
          3: "#C62828",
        },
        uwaga: {
          1: "#ffd460",
          2: "#FFC107",
          3: "#ea5455",
        },
        szary: {
          1: "#FAFAFA",
          2: "#EEEEEE",
          3: "#E0E0E0",
          4: "#9E9E9E",
          5: "#757575",
          6: "#212121",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
