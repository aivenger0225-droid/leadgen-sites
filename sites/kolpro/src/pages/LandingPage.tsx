import { useState, useEffect } from 'react';

interface Props {
  brand: {
    name: string;
    tagline: string;
    description: string;
    accentColor: string;
    secondaryColor: string;
    services: string[];
    stats: { value: string; label: string }[];
  };
  apiEndpoint: string;
}

export default function LandingPage({ brand, apiEndpoint }: Props) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = '請輸入姓名';
    if (!formData.email.trim()) newErrors.email = '請輸入 Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = '格式不正確';
    if (!formData.company.trim()) newErrors.company = '請輸入公司名稱';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: brand.name }),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        const data = await res.json();
        alert(data.error || '提交失敗，請稍後再試');
      }
    } catch {
      alert('網路錯誤，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: "'Inter', 'Noto Sans TC', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700&display=swap');
        @keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .animate-fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2.5s ease-in-out infinite; }
        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        .gradient-text { background: linear-gradient(135deg, ${brand.accentColor}, ${brand.secondaryColor}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .glass-card { background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); }
        .hero-gradient { background: linear-gradient(160deg, #0a0a1a 0%, #1a1a3e 40%, ${brand.accentColor}22 100%); }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ background: brand.accentColor }}>
              {brand.name.charAt(0)}
            </div>
            <span className="font-bold text-lg text-white">{brand.name}</span>
          </div>
          <a href="#contact"
            className="px-5 py-2 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
            style={{ background: brand.accentColor }}>
            立即諮詢
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full animate-pulse-glow" style={{ background: `${brand.accentColor}22` }} />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full animate-float" style={{ background: `${brand.secondaryColor}11` }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white/80 mb-8 animate-fade-up"
              style={{ background: `${brand.accentColor}33`, border: `1px solid ${brand.accentColor}55` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: brand.accentColor }} />
              專業網紅媒合服務
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 animate-fade-up stagger-1">
              {brand.tagline}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 animate-fade-up stagger-2">
              {brand.description}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
              <a href="#contact"
                className="px-8 py-3.5 rounded-full font-bold text-white transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: brand.accentColor }}>
                免費取得報價
              </a>
              <a href="#services"
                className="px-8 py-3.5 rounded-full font-medium text-white/80 border border-white/20 transition-all hover:border-white/40 hover:text-white">
                了解更多
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 animate-fade-up stagger-4">
            {brand.stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-extrabold mb-1" style={{ color: brand.accentColor }}>{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#1a1a2e' }}>我們的服務</h2>
            <p className="text-white/60 max-w-lg mx-auto">專業團隊打造完整的網紅行銷解決方案</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {brand.services.map((service, i) => (
              <div key={i} className="rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white font-bold text-lg"
                  style={{ background: brand.accentColor }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24" style={{ background: `${brand.accentColor}08` }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-6" style={{ color: '#1a1a2e' }}>為什麼選擇我們</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                累積多年網紅行銷經驗，我們了解每個品牌的需求都不一樣。從精準配對到執行管理，提供一站式服務，讓您專注本業。
              </p>
              <div className="space-y-4">
                {['專業數據分析，精准配對網紅人選', '一站式服務：從洽談到執行完整支援', '透明報價，無隱藏費用'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${brand.accentColor}22` }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={brand.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: brand.accentColor }}>
              <div className="aspect-square flex items-center justify-center p-12">
                <div className="text-center text-white">
                  <div className="text-7xl font-extrabold mb-4">98%</div>
                  <div className="text-xl font-bold mb-2">客戶滿意度</div>
                  <div className="text-white/70">持續合作超過 3 年</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 hero-gradient">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">免費取得專業報價</h2>
            <p className="text-white/60">填寫表單，24 小時內會有專人與您聯繫</p>
          </div>

          {isSuccess ? (
            <div className="text-center py-16 px-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: brand.accentColor }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">感謝您的提交！</h3>
              <p className="text-white/70">我們已收到您的需求，專員會在 24 小時內聯繫您。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">姓名 *</label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="王小明"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all"
                      style={{ '--tw-ring-color': brand.accentColor } as any} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">公司名稱 *</label>
                    <input name="company" value={formData.company} onChange={handleChange} placeholder="某某電子商務"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all" />
                    {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contact@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">需求描述</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="簡述您的行銷需求，例如：合作網紅類型、預算範圍、期望時程..."
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all resize-none" />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: brand.accentColor }}>
                  {isSubmitting ? '提交中...' : '送出諮詢'}
                </button>
                <p className="text-white/40 text-xs text-center">送出即表示您同意我們的隱私權政策</p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold" style={{ background: brand.accentColor }}>
              {brand.name.charAt(0)}
            </div>
            <span className="text-white/50 text-sm">{brand.name} © 2026</span>
          </div>
          <p className="text-white/30 text-xs">本網站由 AI 系統管理維護 · {brand.name} 版權所有</p>
        </div>
      </footer>
    </div>
  );
}
