import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_INDUSTRY_ID } from '../config/industries.js';
import { findConflict } from '../utils/time.js';

/**
 * 按行业隔离的预约记录存储 Hook（localStorage CRUD）。
 *
 * 存储键规则：booking_<行业ID>_v1，切换行业时互不影响。
 *
 * @param {string} industryId 行业 ID
 * @returns {object} { bookings, addBooking, cancelBooking }
 */
export function useBookings(industryId) {
  const storageKey = `booking_${industryId || DEFAULT_INDUSTRY_ID}_v1`;
  const [bookings, setBookings] = useState(() => readBookings(storageKey));

  // 切换行业时重新读取对应行业的存储数据。
  useEffect(() => {
    setBookings(readBookings(storageKey));
  }, [storageKey]);

  /**
   * 新增一条预约，提交前再次校验时段冲突。
   * @param {object} booking 预约数据（需包含 date / startTime / startMinutes / duration 等）
   * @returns {{ok: boolean, message: string}} 操作结果
   */
  const addBooking = useCallback(
    (booking) => {
      const conflict = findConflict(
        bookings,
        booking.date,
        booking.startMinutes,
        booking.duration,
      );
      if (conflict) {
        return { ok: false, message: '该时段刚刚被预约了，请换一个时间' };
      }

      const record = {
        id: booking.id,
        serviceId: booking.serviceId,
        serviceName: booking.serviceName,
        serviceEmoji: booking.serviceEmoji || '',
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        duration: Number(booking.duration) || 0,
        price: Number(booking.price) || 0,
        name: booking.name,
        phone: booking.phone,
        createdAt: new Date().toISOString(),
        status: 'booked',
      };

      const nextBookings = [...bookings, record];
      setBookings(nextBookings);
      writeBookings(storageKey, nextBookings);
      return { ok: true, message: '预约成功' };
    },
    [bookings, storageKey],
  );

  /**
   * 取消预约：删除记录并释放对应时段。
   * @param {string} bookingId 预约记录 ID
   * @returns {void}
   */
  const cancelBooking = useCallback(
    (bookingId) => {
      const nextBookings = bookings.filter((item) => item.id !== bookingId);
      setBookings(nextBookings);
      writeBookings(storageKey, nextBookings);
    },
    [bookings, storageKey],
  );

  /** 未取消的预约，按日期与时间正序排列。 */
  const visibleBookings = useMemo(
    () =>
      bookings
        .filter((item) => item.status !== 'cancelled')
        .sort((a, b) => {
          if (a.date === b.date) {
            return String(a.startTime).localeCompare(String(b.startTime));
          }
          return String(a.date).localeCompare(String(b.date));
        }),
    [bookings],
  );

  return { bookings: visibleBookings, addBooking, cancelBooking };
}

/**
 * 从 localStorage 读取预约记录。
 * @param {string} storageKey 存储键
 * @returns {Array<object>} 预约记录列表
 */
function readBookings(storageKey) {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // 数据损坏时直接重置，避免整个页面白屏。
    console.warn('[booking] 本地预约数据读取失败，已重置：', error);
    return [];
  }
}

/**
 * 把预约记录写入 localStorage。
 * @param {string} storageKey 存储键
 * @param {Array<object>} bookings 预约记录列表
 * @returns {void}
 */
function writeBookings(storageKey, bookings) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(bookings));
  } catch (error) {
    console.warn('[booking] 本地预约数据写入失败：', error);
  }
}
