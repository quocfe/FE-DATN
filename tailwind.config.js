/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true, // Centers the container by adding auto margins
      padding: '0.5rem', // Default padding for the container
      screens: {
        sm: '100%', // Width for small screens
        md: '100%', // Width for medium screens
        lg: '1380px' // Width for large screens
        // xl: '90%', // Width for extra-large screens
      }
    },
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-soft': 'rgb(var(--color-primary-soft) / <alpha-value>)',
        secondery: 'rgb(var(--color-secondery) / <alpha-value>)',
        bgbody: 'rgb(var(--color-bgbody) / <alpha-value>)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
