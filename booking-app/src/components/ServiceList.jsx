import React from 'react';
import ServiceCard from './ServiceCard.jsx';

/**
 * 服务列表区块。
 *
 * @param {object} props 组件属性
 * @param {Array<object>} props.services 服务列表
 * @param {(service: object) => void} props.onSelect 点击预约回调
 * @returns {JSX.Element} 服务列表
 */
export default function ServiceList({ services = [], onSelect }) {
  return (
    <section className="px-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-[17px] font-bold">热门服务</h2>
        <span className="text-xs text-muted">共 {services.length} 项 · 点击即可预约</span>
      </div>
      <div className="space-y-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
