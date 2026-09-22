import { useCallback, useEffect, useState } from 'react';
import useIndustry from './hooks/useIndustry';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Cases from './components/Cases';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Toast from './components/Toast';

/** 顶部导航高度带来的滚动偏移量。 */
const SCROLL_OFFSET = 72;

/**
 * 页面根节点：组装全部板块。
 * @returns {JSX.Element}
 */
export default function App() {
  const { industry, industryId, setIndustryId } = useIndustry();
  const [toast, setToast] = useState({ id: 0, message: '' });

  /**
   * 平滑滚动到指定板块。
   * @param {string} sectionId 板块 id
   * @returns {void}
   */
  const scrollToSection = useCallback((sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }
    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const handleQuoteClick = useCallback(() => {
    scrollToSection('contact');
  }, [scrollToSection]);

  const handleViewCases = useCallback(() => {
    scrollToSection('cases');
  }, [scrollToSection]);

  const showToast = useCallback((message) => {
    setToast((prev) => ({ id: prev.id + 1, message }));
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, message: '' }));
  }, []);

  // 行业切换时同步浏览器标签标题
  useEffect(() => {
    document.title = `${industry.companyName} · ${industry.slogan}`;
  }, [industry]);

  return (
    <div className="min-h-screen bg-bg font-sans">
      <Navbar
        industry={industry}
        industryId={industryId}
        onIndustryChange={setIndustryId}
        onQuoteClick={handleQuoteClick}
      />

      <main>
        <Hero industry={industry} onQuoteClick={handleQuoteClick} onViewCases={handleViewCases} />
        <Services industry={industry} />
        <Cases industry={industry} />
        <Testimonials industry={industry} />
        <ContactForm industry={industry} onSuccess={showToast} />
      </main>

      <Footer industry={industry} />
      <Toast key={toast.id} message={toast.message} onClose={closeToast} />
    </div>
  );
}
