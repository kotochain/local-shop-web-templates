import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import IndustrySwitcher from './components/IndustrySwitcher.jsx';
import ServiceList from './components/ServiceList.jsx';
import BookingModal from './components/BookingModal.jsx';
import MyBookings from './components/MyBookings.jsx';
import EmptyState from './components/EmptyState.jsx';
import Toast from './components/Toast.jsx';
import { useIndustry } from './hooks/useIndustry.js';
import { useBookings } from './hooks/useBookings.js';

/**
 * 应用根组件：单页预约系统。
 * @returns {JSX.Element} 页面
 */
export default function App() {
  const { industry, setIndustry } = useIndustry();
  const { bookings, addBooking, cancelBooking } = useBookings(industry.id);

  const [selectedService, setSelectedService] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // 切换行业时关闭弹窗，避免残留上一个行业的服务数据。
  useEffect(() => {
    setSelectedService(null);
  }, [industry.id]);

  /**
   * 提交预约。
   * @param {object} payload 预约数据
   * @returns {{ok: boolean, message: string}} 提交结果
   */
  const handleSubmit = useCallback(
    (payload) => {
      const result = addBooking(payload);
      setToast({ message: result.message, type: result.ok ? 'success' : 'info' });
      return result;
    },
    [addBooking],
  );

  /**
   * 取消预约并释放时段。
   * @param {string} bookingId 预约记录 ID
   * @returns {void}
   */
  const handleCancel = useCallback(
    (bookingId) => {
      cancelBooking(bookingId);
      setToast({ message: '已取消预约，时段已释放', type: 'info' });
    },
    [cancelBooking],
  );

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-md md:max-w-2xl">
        {/* 顶部：行业切换器 */}
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="text-[11px] tracking-wide text-muted">行业皮肤</span>
          <IndustrySwitcher currentId={industry.id} onChange={setIndustry} />
        </div>

        <Header industry={industry} bookingCount={bookings.length} />

        <main className="space-y-6 pb-10">
          {/* 服务列表 */}
          <ServiceList services={industry.services} onSelect={setSelectedService} />

          {/* 我的预约 / 空状态 */}
          <section className="px-4">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-[17px] font-bold">我的预约</h2>
              {bookings.length ? (
                <span className="text-xs text-muted">共 {bookings.length} 条</span>
              ) : null}
            </div>
            {bookings.length ? (
              <MyBookings bookings={bookings} onCancel={handleCancel} />
            ) : (
              <div className="rounded-3xl border border-border bg-card shadow-card">
                <EmptyState />
              </div>
            )}
          </section>

          <footer className="px-4 text-center text-[11px] leading-relaxed text-muted">
            <p>本页面为演示 Demo，预约数据仅保存在您本机浏览器中</p>
            <p className="mt-1">更换行业皮肤后数据互不影响，刷新页面不会丢失</p>
          </footer>
        </main>
      </div>

      {/* 预约弹窗 */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          industry={industry}
          bookings={bookings}
          onSubmit={handleSubmit}
          onClose={() => setSelectedService(null)}
        />
      )}

      {/* 轻提示 */}
      <Toast
        message={toast.message}
        type={toast.type}
        onDone={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
