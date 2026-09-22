import { useEffect } from 'react';

/** 提示自动关闭时间（毫秒）。 */
const AUTO_CLOSE_DELAY = 3000;

/**
 * 轻量提示条：展示提交成功等反馈信息，3 秒后自动消失。
 *
 * @param {object} props 组件属性
 * @param {string} props.message 提示文案，为空时不渲染
 * @param {() => void} props.onClose 关闭回调
 * @returns {JSX.Element|null}
 */
export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) {
      return undefined;
    }
    const timer = window.setTimeout(onClose, AUTO_CLOSE_DELAY);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 top-20 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-none rounded-xl bg-content px-5 py-3.5 text-center text-sm font-medium text-card-bg shadow-floating"
    >
      <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
        ✓
      </span>
      {message}
    </div>
  );
}
