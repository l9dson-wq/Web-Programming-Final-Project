module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '130': '34rem',
        '140': '40rem',
        '200': '57rem',
      },
      width: {
        '100': '25rem',
        '128': '30rem',
        '200': '56rem',
        '250': '65rem',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/images2/image8.jpg')",
        'hero-back': "url('/src/images2/BackgroundImage1-PhotoRoom (1).png')",
        'hero-cool': "url('/src/images/image2.jpg')",
        'hero-sofa': "url('/src/Ilustrations/Ilustration3.png')",
        'hero-looking': "url('/src/Ilustrations/animated1.gif')",
        'hero-lonely': "url('/src/Ilustrations/Ilustration5.png')",
        'hero-group': "url('/src/Ilustrations/Ilustration4.png')",
      },backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '4rem',
        '20': '10rem',
        '25': '20rem',
        '30': '35rem',
        '50': '50rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
