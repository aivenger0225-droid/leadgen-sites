import { useState } from 'react';

export default function ChefstarPage({ apiEndpoint }: { apiEndpoint: string }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = '請輸入姓名';
    if (!formData.email.trim()) e.email = '請輸入 Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = '格式不正確';
    if (!formData.company.trim()) e.company = '請輸入公司名稱';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(apiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, source: '味視創媒' }) });
      if (res.ok) { setIsSuccess(true); setFormData({ name: '', email: '', company: '', message: '' }); }
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  const services = [
    { icon: '🍜', title: '美食網紅精準配對', desc: '根據餐廳類型、目標客群，從2,000+美食網紅資料庫推薦最適人選，從路邊小店到連鎖餐飲皆可' },
    { icon: '📸', title: '視覺內容企劃', desc: '菜單拍攝、美食影片、直播帶貨、IG圖文貼文企劃，用好內容說出餐廳的靈魂' },
    { icon: '🏪', title: '活動整合行銷', desc: '新店開幕、節慶行銷、連鎖活動代言，從創意到執行，完整網紅行銷方案' },
  ];

  const stats = [
    { value: '2,000+', label: '美食網紅' },
    { value: '300+', label: '餐飲品牌' },
    { value: '15,000+', label: '則好評曝光' },
  ];

  return (
    <div style={{ background:'#FFF8F0', minHeight:'100vh', fontFamily:"'Noto Serif TC','Noto Sans TC',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Noto+Sans+TC:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .float { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'18px 48px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(255,248,240,0.95)', backdropFilter:'blur(10px)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:28 }}>🍜</span>
          <span style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:20, color:'#1a0a00' }}>味視創媒</span>
        </div>
        <a href="#contact" style={{ padding:'10px 28px', borderRadius:30, background:'#e85d04', color:'white', fontWeight:700, fontSize:13, textDecoration:'none', letterSpacing:1 }}>立即諮詢</a>
      </nav>

      {/* Hero — magazine split layout */}
      <section style={{ paddingTop:90, minHeight:'100vh', display:'flex', alignItems:'center' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 48px', display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:80, alignItems:'center', width:'100%' }}>
          {/* Left: editorial text */}
          <div>
            <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', color:'#e85d04', fontSize:16, margin:'0 0 16px' }}>Restaurant Influencer Marketing</p>
            <h1 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:52, color:'#1a0a00', lineHeight:1.15, margin:'0 0 24px' }}>
              讓排隊人潮<br />
              <span style={{ color:'#e85d04' }}>自己走進來</span>
            </h1>
            <p style={{ fontSize:17, color:'#5a3e2b', lineHeight:1.9, margin:'0 0 36px', maxWidth:480 }}>
              2,000位美食網紅，從街邊小吃到米其林餐廳，用最真實的味覺敘事，幫您的餐飲品牌說一個讓人忍不住想上門的故事。
            </p>
            <div style={{ display:'flex', gap:16 }}>
              <a href="#contact" style={{ padding:'14px 36px', borderRadius:30, background:'#e85d04', color:'white', fontWeight:700, fontSize:14, textDecoration:'none', letterSpacing:1 }}>免費取得報價</a>
              <a href="#services" style={{ padding:'14px 36px', borderRadius:30, border:'2px solid #e85d04', color:'#e85d04', fontWeight:700, fontSize:14, textDecoration:'none' }}>服務項目</a>
            </div>
          </div>

          {/* Right: decorative food illustration */}
          <div style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center' }}>
            <div style={{ width:360, height:360, borderRadius:'50%', background:'linear-gradient(135deg, #f8961e22, #e85d0411)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
              <div style={{ fontSize:120, filter:'drop-shadow(0 8px 20px rgba(232,93,4,0.3))' }}>🍽️</div>
              <div style={{ position:'absolute', top:-20, right:-10, fontSize:48, filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.1))' }}>🌶️</div>
              <div style={{ position:'absolute', bottom:20, left:-20, fontSize:40 }}>🥘</div>
            </div>
            <div style={{ position:'absolute', bottom:-10, right:10, width:140, height:140, borderRadius:20, background:'white', boxShadow:'0 8px 30px rgba(0,0,0,0.1)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, padding:16 }}>
              <span style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:28, color:'#e85d04' }}>300+</span>
              <span style={{ fontSize:12, color:'#888', textAlign:'center', lineHeight:1.4 }}>餐飲品牌<br/>指定合作</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section style={{ background:'#1a0a00', padding:'48px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', justifyContent:'space-around', textAlign:'center' }}>
          {stats.map((s,i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <span style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:40, color:'#f8961e' }}>{s.value}</span>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:13, letterSpacing:1 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding:'100px 48px', maxWidth:1100, margin:'0 auto' }}>
        <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', color:'#e85d04', fontSize:14, margin:'0 0 8px' }}>What we do</p>
        <h2 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:36, color:'#1a0a00', margin:'0 0 48px', borderBottom:'2px solid #e85d0433', paddingBottom:20 }}>服務項目</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:32 }}>
          {services.map((s,i) => (
            <div key={i} style={{ padding:'36px 28px', borderRadius:20, background:'white', border:'1px solid #e85d0422', boxShadow:'0 4px 20px rgba(232,93,4,0.06)', transition:'all 0.3s' }}>
              <div style={{ fontSize:40, marginBottom:16 }}>{s.icon}</div>
              <h3 style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:18, color:'#1a0a00', margin:'0 0 10px' }}>{s.title}</h3>
              <p style={{ fontSize:14, color:'#7a5a3a', lineHeight:1.8, margin:0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote / social proof */}
      <section style={{ background:'#fef3e2', padding:'80px 48px' }}>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:56, marginBottom:24, color:'#e85d04' }}>"</div>
          <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', fontSize:22, color:'#3a1a00', lineHeight:1.8, margin:'0 0 24px' }}>
            和味視合作三個月，新店開幕的排隊人潮是我們做過最有感的行銷成效。
          </p>
          <p style={{ fontWeight:700, color:'#e85d04', fontSize:14, margin:0 }}>— 北部某連鎖火鍋品牌 行銷總監</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding:'100px 48px', background:'#1a0a00' }}>
        <div style={{ maxWidth:560, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <h2 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:34, color:'white', margin:'0 0 12px' }}>免費取得專業報價</h2>
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:14 }}>填寫表單，隔天就有專人與您聯繫</p>
          </div>
          {isSuccess ? (
            <div style={{ textAlign:'center', padding:'48px', borderRadius:20, background:'rgba(248,150,30,0.1)', border:'1px solid #f8961e33' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
              <h3 style={{ color:'#f8961e', fontFamily:"'Noto Serif TC'", fontWeight:700, margin:'0 0 8px' }}>感謝您的提交！</h3>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14 }}>我們會盡快與您聯繫</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[{n:'name',p:'姓名 *',t:'text'},{n:'company',p:'公司名稱 *',t:'text'},{n:'email',p:'Email *',t:'email'}].map(f => (
                <div key={f.n}>
                  <input name={f.n} type={f.t} value={(formData as any)[f.n]} onChange={handleChange} placeholder={f.p}
                    style={{ width:'100%', padding:'14px 18px', borderRadius:10, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'white', fontSize:15, outline:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                  {errors[f.n] && <p style={{ color:'#f87171', fontSize:12, margin:'4px 0 0' }}>{errors[f.n]}</p>}
                </div>
              ))}
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="餐廳名稱、類型、預算範圍、期望目標..."
                style={{ width:'100%', padding:'14px 18px', borderRadius:10, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'white', fontSize:15, outline:'none', resize:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
              <button type="submit" disabled={isSubmitting}
                style={{ padding:'16px', borderRadius:30, background:'#e85d04', color:'white', fontWeight:700, fontSize:15, cursor:isSubmitting?'not-allowed':'pointer', border:'none', letterSpacing:1 }}>
                {isSubmitting ? '傳送中...' : '送出需求'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ padding:'24px 48px', background:'#0f0600', textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.2)', fontSize:12, margin:0 }}>© 2026 味視創媒 CHEFSTAR · 餐飲網紅經紀專家</p>
      </footer>
    </div>
  );
}
