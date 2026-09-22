/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 主题色全部由 CSS 变量驱动，切换行业只需替换 :root 上的变量值
        brand: 'var(--brand)',
        'brand-dark': 'var(--brand-dark)',
        'brand-soft': 'var(--brand-soft)',
        accent: 'var(--accent)',
        bg: 'var(--bg)',
        'card-bg': 'var(--card-bg)',
        content: 'var(--text)',
        muted: 'var(--muted)',
        line: 'var(--border)',
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
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)',
        floating: '0 10px 30px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
    },
  },
  plugins: [],
};
