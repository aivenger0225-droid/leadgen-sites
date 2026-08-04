import { useState } from 'react';

export default function KolproPage({ apiEndpoint }: { apiEndpoint: string }) {
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
      const res = await fetch(apiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, source: '潮界經紀' }) });
      if (res.ok) { setIsSuccess(true); setFormData({ name: '', email: '', company: '', message: '' }); }
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background:'#ffffff', minHeight:'100vh', fontFamily:"'Inter','Noto Sans TC',sans-serif", color:'#0a0a0a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Noto+Sans+TC:wght@400;700;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
        .fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .black-bg { background:#0a0a0a; }
        .purple-accent { background:#7c3aed; }
        .purple-text { color:#7c3aed; }
        .purple-border { border:1px solid #7c3aed; }
        .hover-lift:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(124,58,237,0.15); }
      `}</style>

      {/* Nav — stark black header */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'0 48px', height:64, display:'flex', justifyContent:'space-between', alignItems:'center', background:'#0a0a0a' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:32, height:32, background:'#7c3aed', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'white', fontWeight:900, fontSize:14 }}>K</span>
          </div>
          <span style={{ color:'white', fontWeight:900, fontSize:16, letterSpacing:2 }}>KOLPRO</span>
        </div>
        <a href="#contact" className="purple-accent" style={{ padding:'10px 28px', color:'white', fontWeight:700, fontSize:12, textDecoration:'none', letterSpacing:1 }}>馬上開始</a>
      </nav>

      {/* Hero — oversized typography, brutalist */}
      <section style={{ paddingTop:64, minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden' }}>
        {/* Massive background text */}
        <div style={{ position:'absolute', top:'50%', left:-20, transform:'translateY(-50%)', fontSize:'25vw', fontWeight:900, color:'rgba(0,0,0,0.03)', lineHeight:1, pointerEvents:'none', userSelect:'none', letterSpacing:-8, whiteSpace:'nowrap' }}>
          KOLPRO
        </div>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 48px', position:'relative', zIndex:2, width:'100%' }}>
          {/* Label */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'6px 16px', background:'#0a0a0a', marginBottom:32 }}>
            <div style={{ width:6, height:6, background:'#7c3aed', borderRadius:'50%' }} />
            <span style={{ color:'white', fontSize:11, fontWeight:700, letterSpacing:2 }}>ONE-STOP KOL AGENCY</span>
          </div>

          {/* Massive headline */}
          <h1 style={{ fontWeight:900, fontSize:'clamp(48px, 7vw, 96px)', lineHeight:1, margin:'0 0 32px', color:'#0a0a0a', letterSpacing:'-2px' }}>
            網紅經紀<br />
            <span className="purple-text">一次搞定的</span><br />
            合作平台
          </h1>

          <p style={{ fontSize:18, color:'#555', lineHeight:1.8, maxWidth:520, margin:'0 0 48px' }}>
            跨產業網紅經紀平台，5,000+網紅任君挑選。從洽談、簽約到結案，全程專業管理。讓品牌專注策略，其他交給我們。
          </p>

          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <a href="#contact" className="purple-accent hover-lift" style={{ padding:'16px 40px', color:'white', fontWeight:700, fontSize:14, textDecoration:'none', letterSpacing:1, display:'inline-block', transition:'all 0.3s' }}>免費諮詢</a>
            <a href="#services" style={{ fontSize:14, color:'#0a0a0a', textDecoration:'none', fontWeight:700, borderBottom:'2px solid #0a0a0a', paddingBottom:2 }}>看服務項目 →</a>
          </div>
        </div>
      </section>

      {/* Stats row — stark black strip */}
      <section className="black-bg" style={{ padding:'60px 48px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
          {[{v:'5,000+',l:'網紅資料庫'},{v:'30+',l:'產業覆蓋'},{v:'1,200+',l:'完成案例'},{v:'12h',l:'急速回覆'}].map((s,i) => (
            <div key={i} style={{ padding:i<3?'0 40px 0 0':'0', borderRight:i<3?'1px solid rgba(255,255,255,0.1)':'none' }}>
              <div style={{ fontWeight:900, fontSize:48, color:'white', lineHeight:1, marginBottom:8 }}>{s.v}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', letterSpacing:2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services — clean grid, editorial */}
      <section id="services" style={{ padding:'100px 48px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ marginBottom:60 }}>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:'#aaa', margin:'0 0 12px' }}>WHAT WE DO</p>
          <h2 style={{ fontWeight:900, fontSize:42, color:'#0a0a0a', margin:0, lineHeight:1.1 }}>服務項目</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, border:'2px solid #0a0a0a' }}>
          {[
            {n:'01',t:'跨產業網紅資料庫',d:'美妝時尚、3C數位、親子育兒、運動健身，5,000+網紅AI智能配對，30秒找到最適人選'},
            {n:'02',t:'全程經紀管理',d:'從洽談、報價、簽約到結案，專業經紀團隊一站式服務，省去品牌談判與行政成本'},
            {n:'03',t:'內容變現顧問',d:'網紅帳號內容輔導、商業變現策略、數據優化建議，提升網紅本身商業價值'},
          ].map((s,i) => (
            <div key={i} style={{ padding:'48px 36px', background:i%2===0?'#fafafa':'white', borderTop:i>0?'2px solid #0a0a0a':'none' }}>
              <div style={{ fontWeight:900, fontSize:56, color:'rgba(0,0,0,0.06)', lineHeight:1, marginBottom:20 }}>{s.n}</div>
              <h3 style={{ fontWeight:900, fontSize:20, color:'#0a0a0a', margin:'0 0 12px', letterSpacing:'-0.5px' }}>{s.t}</h3>
              <p style={{ fontSize:14, color:'#666', lineHeight:1.8, margin:0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bold CTA strip */}
      <section style={{ background:'#7c3aed', padding:'80px 48px', textAlign:'center' }}>
        <h2 style={{ fontWeight:900, fontSize:'clamp(32px, 5vw, 60px)', color:'white', margin:'0 0 16px', lineHeight:1.1 }}>
          讓網紅行銷<br />不再是難題
        </h2>
        <p style={{ color:'rgba(255,255,255,0.7)', fontSize:16, margin:'0 0 36px' }}>填寫表單，12小時內有專人與您聯繫</p>
        <a href="#contact" style={{ display:'inline-block', padding:'16px 48px', background:'white', color:'#7c3aed', fontWeight:900, fontSize:14, textDecoration:'none', letterSpacing:1 }}>馬上開始</a>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding:'100px 48px', maxWidth:560, margin:'0 auto' }}>
        <div style={{ marginBottom:48 }}>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:'#aaa', margin:'0 0 12px' }}>CONTACT</p>
          <h2 style={{ fontWeight:900, fontSize:36, color:'#0a0a0a', margin:0 }}>取得免費報價</h2>
        </div>

        {isSuccess ? (
          <div style={{ padding:'48px', background:'#fafafa', border:'2px solid #0a0a0a' }}>
            <h3 style={{ fontWeight:900, fontSize:24, color:'#7c3aed', margin:'0 0 8px' }}>✓ 已收到</h3>
            <p style={{ color:'#666', fontSize:15, margin:0 }}>我們會在12小時內與您聯繫</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:0, border:'2px solid #0a0a0a' }}>
            {[{n:'name',p:'姓名',t:'text'},{n:'company',p:'公司名稱',t:'text'},{n:'email',p:'Email',t:'email'}].map((f,i) => (
              <div key={f.n} style={{ borderBottom:i<2?'1px solid #e0e0e0':'none' }}>
                <input name={f.n} type={f.t} value={(formData as any)[f.n]} onChange={handleChange} placeholder={f.p}
                  style={{ width:'100%', padding:'20px 18px', border:'none', background:'transparent', color:'#0a0a0a', fontSize:16, outline:'none', fontFamily:"'Inter','Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                {errors[f.n] && <p style={{ color:'#dc2626', fontSize:12, margin:'0 18px 8px', paddingBottom:8 }}>{errors[f.n]}</p>}
              </div>
            ))}
            <div style={{ borderBottom:'1px solid #e0e0e0' }}>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="產業類型、網紅需求、預算範圍..."
                style={{ width:'100%', padding:'20px 18px', border:'none', background:'transparent', color:'#0a0a0a', fontSize:16, outline:'none', resize:'none', fontFamily:"'Inter','Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
            </div>
            <button type="submit" disabled={isSubmitting}
              style={{ padding:'20px', background:'#0a0a0a', color:'white', fontWeight:900, fontSize:15, cursor:isSubmitting?'not-allowed':'pointer', border:'none', letterSpacing:2 }}>
              {isSubmitting ? '傳送中...' : '送出需求 →'}
            </button>
          </form>
        )}
      </section>

      <footer style={{ padding:'24px 48px', background:'#0a0a0a', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ color:'white', fontWeight:900, fontSize:14, letterSpacing:2 }}>KOLPRO</span>
          <p style={{ color:'rgba(255,255,255,0.2)', fontSize:12, margin:0 }}>© 2026 KOLPRO 潮界經紀 · 一站式網紅變現合作平台</p>
        </div>
      </footer>
    </div>
  );
}
