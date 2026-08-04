import { useState } from 'react';

export default function TravelcreatorsPage({ apiEndpoint }: { apiEndpoint: string }) {
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
      const res = await fetch(apiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, source: '遊獵傳媒' }) });
      if (res.ok) { setIsSuccess(true); setFormData({ name: '', email: '', company: '', message: '' }); }
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background:'#020b1a', minHeight:'100vh', fontFamily:"'Noto Sans TC','PingFang TC',sans-serif", color:'white', overflowX:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Noto+Sans+TC:wght@300;400;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pan { 0%{transform:scale(1.05)} 50%{transform:scale(1.1)} 100%{transform:scale(1.05)} }
        @keyframes slideRight { from{width:0} to{width:60px} }
        .fade-up { animation: fadeUp 0.9s ease-out forwards; }
        .ocean-gradient { background: linear-gradient(135deg, #020b1a 0%, #0a2540 40%, #0d3d5c 70%, #0e5a7a 100%); }
        .ocean-border { border:1px solid rgba(14,90,122,0.4); box-shadow: 0 0 30px rgba(14,90,122,0.15); }
        .ocean-btn { background: linear-gradient(135deg, #0369a1, #0ea5e9); border:none; box-shadow: 0 4px 20px rgba(14,90,122,0.4); }
        .ocean-btn:hover { box-shadow: 0 6px 30px rgba(14,90,122,0.6); transform: translateY(-2px); }
        .stat-divider { width:60px; height:2px; background: linear-gradient(90deg, #0369a1, transparent); }
      `}</style>

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'18px 48px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(2,11,26,0.9)', backdropFilter:'blur(15px)', borderBottom:'1px solid rgba(14,90,122,0.2)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', border:'1px solid #0ea5e9', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:18 }}>🌍</span>
          </div>
          <span style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:18, letterSpacing:2, color:'white' }}>TRAVELCREATORS</span>
        </div>
        <a href="#contact" className="ocean-btn" style={{ padding:'9px 26px', borderRadius:6, color:'white', fontWeight:700, fontSize:13, textDecoration:'none', letterSpacing:1 }}>取得方案</a>
      </nav>

      {/* Hero — cinematic, full bleed */}
      <section style={{ minHeight:'100vh', position:'relative', display:'flex', alignItems:'center', paddingTop:80 }}>
        {/* Background layers */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #020b1a 0%, #071e36 50%, #020b1a 100%)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 80% 30%, rgba(14,90,122,0.3) 0%, transparent 50%)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 20% 80%, rgba(3,105,161,0.15) 0%, transparent 50%)' }} />

        {/* Abstract wave lines */}
        <svg style={{ position:'absolute', bottom:0, left:0, right:0, height:200, opacity:0.3 }} viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,100 C360,180 720,20 1440,100 L1440,200 L0,200 Z" fill="rgba(14,90,122,0.2)" />
          <path d="M0,120 C480,40 960,160 1440,60 L1440,200 L0,200 Z" fill="rgba(14,90,122,0.1)" />
        </svg>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 48px', display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:60, alignItems:'center', position:'relative', zIndex:2, width:'100%' }}>
          <div>
            <p style={{ fontFamily:'Oswald,sans-serif', fontSize:12, letterSpacing:5, color:'#0ea5e9', margin:'0 0 20px', opacity:0.8 }}>TRAVEL BRAND CONTENT</p>
            <h1 style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:64, lineHeight:1.1, margin:'0 0 24px', letterSpacing:1 }}>
              旅遊品牌的<br />
              <span style={{ color:'#0ea5e9', textShadow:'0 0 40px rgba(14,165,233,0.4)' }}>深度內容</span><br />
              發動引擎
            </h1>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.45)', lineHeight:2, margin:'0 0 40px', maxWidth:460, fontWeight:300 }}>
              2,500+海內外旅遊網紅，用第一手的深度體驗，幫旅遊品牌說出讓人想立刻出發的故事。飯店、航空、旅行社、在地體驗，全都適用。
            </p>
            <div style={{ display:'flex', gap:16 }}>
              <a href="#contact" className="ocean-btn" style={{ padding:'14px 36px', borderRadius:6, color:'white', fontWeight:700, fontSize:13, textDecoration:'none', letterSpacing:1 }}>建立合作</a>
              <a href="#services" style={{ padding:'14px 36px', borderRadius:6, border:'1px solid rgba(14,90,122,0.4)', color:'rgba(255,255,255,0.5)', fontSize:13, textDecoration:'none' }}>服務項目</a>
            </div>
          </div>

          {/* Abstract globe/compass */}
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative' }}>
            <div style={{ width:320, height:320, borderRadius:'50%', border:'1px solid rgba(14,90,122,0.3)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
              <div style={{ width:240, height:240, borderRadius:'50%', border:'1px solid rgba(14,90,122,0.2)' }} />
              <div style={{ width:160, height:160, borderRadius:'50%', border:'1px solid rgba(14,90,122,0.15)' }} />
              <div style={{ position:'absolute', fontSize:80, filter:'drop-shadow(0 0 20px rgba(14,165,233,0.3))' }}>🧭</div>
              {/* Cross hairs */}
              <div style={{ position:'absolute', top:'50%', left:0, right:0, height:1, background:'linear-gradient(90deg, transparent, rgba(14,90,122,0.4), transparent)' }} />
              <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:1, background:'linear-gradient(180deg, transparent, rgba(14,90,122,0.4), transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background:'#030f1f', padding:'60px 48px', borderTop:'1px solid rgba(14,90,122,0.2)', borderBottom:'1px solid rgba(14,90,122,0.2)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', justifyContent:'space-around' }}>
          {[{v:'2,500+',l:'海內外旅遊網紅'},{v:'150+',l:'旅遊品牌合作'},{v:'10,000+',l:'深度內容製作'},{v:'24h',l:'快速回覆'}].map((s,i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:36, color:'#0ea5e9', marginBottom:6 }}>{s.v}</div>
              <div className="stat-divider" style={{ margin:'0 auto 8px' }} />
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding:'100px 48px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <p style={{ fontFamily:'Oswald,sans-serif', fontSize:12, letterSpacing:4, color:'#0ea5e9', margin:'0 0 12px', opacity:0.7 }}>OUR SERVICES</p>
          <h2 style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:36, color:'white', margin:'0 0 60px', letterSpacing:1 }}>服務項目</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {[
              {n:'01',t:'旅遊深度內容製作',d:'網紅體驗影片、圖文遊記、直播帶貨，針對飯店、航空、旅遊平台量身打造'},
              {n:'02',t:'新客獲取與忠誠度策略',d:'品牌體驗內容、KOL口碑建立、預訂轉換率優化，提升品牌忠誠度'},
              {n:'03',t:'海內外 KOL 在地體驗',d:'從東南亞到歐洲，在地網紅帶來最真實的旅遊視角與深度故事'},
            ].map((s,i) => (
              <div key={i} className="ocean-border" style={{ padding:'40px 32px', borderRadius:12, background:'rgba(14,90,122,0.05)' }}>
                <div style={{ fontFamily:'Oswald,sans-serif', fontSize:40, color:'rgba(14,90,122,0.4)', marginBottom:20, fontWeight:700 }}>{s.n}</div>
                <h3 style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:18, color:'white', margin:'0 0 12px', letterSpacing:1 }}>{s.t}</h3>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.35)', lineHeight:1.9, margin:0, fontWeight:300 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" style={{ padding:'100px 48px', background:'linear-gradient(180deg, #020b1a 0%, #031828 100%)' }}>
        <div style={{ maxWidth:600, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:40, color:'white', margin:'0 0 12px', letterSpacing:1 }}>開啟旅遊內容合作</h2>
          <p style={{ color:'rgba(255,255,255,0.35)', fontSize:15, margin:'0 0 48px' }}>填寫表單，我們會在24小時內與您聯繫</p>

          {isSuccess ? (
            <div style={{ padding:'48px', borderRadius:12, background:'rgba(14,90,122,0.1)', border:'1px solid rgba(14,90,122,0.3)' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>✓</div>
              <h3 style={{ color:'#0ea5e9', fontFamily:'Oswald,sans-serif', fontWeight:700, margin:'0 0 8px', letterSpacing:1 }}>已收到您的需求</h3>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>24小時內會有專人與您聯繫</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[{n:'name',p:'姓名 *',t:'text'},{n:'company',p:'公司名稱 *',t:'text'},{n:'email',p:'Email *',t:'email'}].map(f => (
                <div key={f.n}>
                  <input name={f.n} type={f.t} value={(formData as any)[f.n]} onChange={handleChange} placeholder={f.p}
                    style={{ width:'100%', padding:'15px 18px', borderRadius:8, background:'rgba(14,90,122,0.08)', border:'1px solid rgba(14,90,122,0.3)', color:'white', fontSize:15, outline:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                  {errors[f.n] && <p style={{ color:'#f87171', fontSize:12, margin:'4px 0 0', textAlign:'left' }}>{errors[f.n]}</p>}
                </div>
              ))}
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="品牌名稱、旅遊類型、預算範圍、期望目標..."
                style={{ width:'100%', padding:'15px 18px', borderRadius:8, background:'rgba(14,90,122,0.08)', border:'1px solid rgba(14,90,122,0.3)', color:'white', fontSize:15, outline:'none', resize:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
              <button type="submit" disabled={isSubmitting} className="ocean-btn"
                style={{ padding:'16px', borderRadius:8, color:'white', fontWeight:700, fontSize:14, cursor:isSubmitting?'not-allowed':'pointer', letterSpacing:1 }}>
                {isSubmitting ? '傳送中...' : '送出需求'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ padding:'28px 48px', borderTop:'1px solid rgba(14,90,122,0.15)', textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.15)', fontSize:12, letterSpacing:1, margin:0 }}>© 2026 TRAVELCREATORS 遊獵傳媒 · 旅遊品牌內容供應商</p>
      </footer>
    </div>
  );
}
