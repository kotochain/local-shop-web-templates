/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 主色：深墨蓝（商务稳重）
        ink: {
          50: '#F2F6F9',
          100: '#E2EAF1',
          200: '#C3D3E0',
          300: '#94AFC4',
          400: '#5C84A3',
          500: '#3A6584',
          600: '#2A4E69',
          700: '#1E3C53',
          800: '#152C3E',
          900: '#0D1E2B',
        },
        // 点缀色：金 / 橙（金额高亮）
        gold: {
          50: '#FDF8EE',
          100: '#F9EFCF',
          200: '#F1DDA0',
          300: '#E7C56D',
          400: '#DCAC45',
          500: '#C8963E',
          600: '#A87829',
          700: '#815B1F',
        },
        // 辅助色：松绿（选中态、成功提示）
        pine: {
          50: '#F1F7F3',
          100: '#DCEAE0',
          500: '#3E7A57',
          600: '#2F6144',
          700: '#244B35',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(13, 30, 43, 0.04), 0 8px 24px rgba(13, 30, 43, 0.06)',
        slip: '0 4px 12px rgba(13, 30, 43, 0.08), 0 20px 48px rgba(13, 30, 43, 0.14)',
        gold: '0 6px 18px rgba(200, 150, 62, 0.28)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { opacity: '0.4', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.28s ease-out both',
        'pop': 'pop 0.24s ease-out both',
      },
    },
  },
  plugins: [],
};
