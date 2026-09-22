import React from 'react';

/**
 * 轻提示组件：预约成功、取消成功等反馈。
 *
 * @param {object} props 组件属性
 * @param {string} props.message 提示文案
 * @param {'success' | 'info'} [props.type] 提示类型
 * @param {() => void} props.onDone 提示结束回调（用于清除状态）
 * @returns {JSX.Element|null} 提示组件
 */
export default function Toast({ message, type = 'success', onDone }) {
  React.useEffect(() => {
    if (!message) {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      if (onDone) {
        onDone();
      }
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [message, onDone]);

  if (!message) {
    return null;
  }

  const icon = type === 'success' ? '✅' : '💡';

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-toast-in fixed bottom-24 left-1/2 z-[60] flex max-w-[85vw] items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium text-on-brand shadow-float"
      style={{ backgroundColor: 'var(--brand-dark)' }}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="truncate">{message}</span>
    </div>
  );
}
