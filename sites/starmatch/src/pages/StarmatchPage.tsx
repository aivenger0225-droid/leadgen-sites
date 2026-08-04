import { useState } from 'react';

export default function StarmatchPage({ apiEndpoint }: { apiEndpoint: string }) {
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
      const res = await fetch(apiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, source: '星脈行銷' }) });
      if (res.ok) { setIsSuccess(true); setFormData({ name: '', email: '', company: '', message: '' }); }
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background: '#050510', minHeight: '100vh', fontFamily: "'Inter','Noto Sans TC',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600;700&family=Noto+Sans+TC:wght@400;700&display=swap');
        @keyframes glow-pulse { 0%,100%{text-shadow:0 0 20px #6366f1,0 0 40px #6366f155} 50%{text-shadow:0 0 40px #6366f1,0 0 80px #6366f188} }
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes flicker { 0%,100%{opacity:1} 50%{opacity:0.7} }
        @keyframes slide-in { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        .glow-text { animation: glow-pulse 3s ease-in-out infinite; color:#818cf8; }
        .scan-line { position:absolute; left:0; right:0; height:2px; background:linear-gradient(transparent,#6366f155,transparent); animation:scan 4s linear infinite; pointer-events:none; }
        .flicker { animation: flicker 0.1s infinite; }
        .neon-border { border:1px solid #6366f133; box-shadow:0 0 20px #6366f111,inset 0 0 20px #6366f108; }
        .neon-btn { background:#6366f1; box-shadow:0 0 20px #6366f155; transition:all 0.3s; }
        .neon-btn:hover { box-shadow:0 0 40px #6366f1aa; transform:scale(1.03); }
      `}</style>

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'16px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(5,5,16,0.9)', backdropFilter:'blur(20px)', borderBottom:'1px solid #6366f122' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:8, background:'#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Orbitron', fontWeight:900, color:'white', fontSize:16, boxShadow:'0 0 15px #6366f155' }}>S</div>
          <span style={{ color:'white', fontFamily:'Orbitron', fontWeight:700, fontSize:18, letterSpacing:2 }}>星脈行銷</span>
        </div>
        <a href="#contact" style={{ padding:'8px 24px', borderRadius:6, background:'#6366f1', color:'white', fontWeight:600, fontSize:13, textDecoration:'none', boxShadow:'0 0 15px #6366f144', letterSpacing:1 }}>開始配對</a>
      </nav>

      {/* Hero */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', paddingTop:80 }}>
        <div className="scan-line" />
        <div style={{ position:'absolute', top:'20%', right:'5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, #6366f122 0%, transparent 70%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', bottom:'10%', left:'10%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, #7c3aed15 0%, transparent 70%)', filter:'blur(40px)' }} />
        {/* Grid background */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(#6366f111 1px, transparent 1px), linear-gradient(90deg, #6366f111 1px, transparent 1px)', backgroundSize:'60px 60px' }} />

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'60px 32px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center', position:'relative', zIndex:10, width:'100%' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:20, background:'rgba(99,102,241,0.1)', border:'1px solid #6366f133', marginBottom:24 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#6366f1', display:'inline-block', boxShadow:'0 0 8px #6366f1' }} />
              <span style={{ color:'#818cf8', fontSize:12, fontWeight:600, letterSpacing:1 }}>ELECTRONIC COMMERCE MATCHING</span>
            </div>
            <h1 style={{ fontFamily:'Orbitron', fontWeight:900, fontSize:48, color:'white', lineHeight:1.2, margin:'0 0 24px', letterSpacing:1 }}>
              電商網紅<br />
              <span className="glow-text">精準對接</span>
            </h1>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, lineHeight:1.8, margin:'0 0 36px' }}>
              從3,000+電商網紅資料庫中，AI智慧配對符合您品牌調性的KOL。透明數據、完整執行報告，讓流量變現不再靠運氣。
            </p>
            <div style={{ display:'flex', gap:16 }}>
              <a href="#contact" className="neon-btn" style={{ padding:'14px 32px', borderRadius:6, color:'white', fontWeight:700, fontSize:14, textDecoration:'none', display:'inline-block', letterSpacing:1 }}>取得報價</a>
              <a href="#services" style={{ padding:'14px 32px', borderRadius:6, color:'rgba(255,255,255,0.5)', fontWeight:600, fontSize:14, textDecoration:'none', border:'1px solid #6366f133', display:'inline-block' }}>服務項目</a>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {[{v:'3,000+',l:'網紅資料庫'},{v:'500+',l:'完成案例'},{v:'98%',l:'客戶滿意'},{v:'24h',l:'急速回覆'}].map((s,i) => (
              <div key={i} className="neon-border" style={{ padding:'28px 20px', borderRadius:12, background:'rgba(5,5,16,0.8)', animation:`slide-in 0.6s ease-out ${i*0.15}s both` }}>
                <div style={{ fontFamily:'Orbitron', fontWeight:900, fontSize:28, color:'#818cf8', marginBottom:6 }}>{s.v}</div>
                <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, letterSpacing:1 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding:'100px 32px', background:'#0a0a1a' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48 }}>
            <div style={{ width:4, height:32, background:'#6366f1', borderRadius:2 }} />
            <h2 style={{ color:'white', fontFamily:'Orbitron', fontWeight:700, fontSize:24, margin:0, letterSpacing:2 }}>SERVICES</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {[
              {n:'01',t:'智慧配對系統',d:'根據品牌屬性與目標受眾，從3,000+電商網紅中AI推薦最適人選，節省80%篩選時間'},
              {n:'02',t:'全程執行管理',d:'從洽談、報價、內容審核到成效報告，專業團隊一站式服務，您只需專注產品'},
              {n:'03',t:'數據驅動優化',d:'提供曝光、互動、轉換率完整漏斗分析報告，下一次合作更精準'},
            ].map((s,i) => (
              <div key={i} className="neon-border" style={{ padding:'36px 28px', borderRadius:12, background:'rgba(99,102,241,0.05)', transition:'all 0.3s', cursor:'default' }}>
                <div style={{ fontFamily:'Orbitron', fontWeight:700, fontSize:36, color:'rgba(99,102,241,0.3)', marginBottom:16 }}>{s.n}</div>
                <h3 style={{ color:'white', fontWeight:700, fontSize:17, margin:'0 0 12px' }}>{s.t}</h3>
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, lineHeight:1.7, margin:0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" style={{ padding:'100px 32px', background:'#050510', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, #6366f111 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:600, margin:'0 auto', position:'relative', zIndex:10' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontFamily:'Orbitron', fontWeight:900, fontSize:36, color:'white', margin:'0 0 16px', letterSpacing:1 }}>立即開始配對</h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15 }}>填寫表單，24小時內專人與您聯繫</p>
          </div>

          {isSuccess ? (
            <div style={{ textAlign:'center', padding:'48px 32px', borderRadius:16, background:'rgba(99,102,241,0.1)', border:'1px solid #6366f144' }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✓</div>
              <h3 style={{ color:'#818cf8', fontFamily:'Orbitron', fontWeight:700, margin:'0 0 12px' }}>SUBMITTED</h3>
              <p style={{ color:'rgba(255,255,255,0.5)' }}>我們已收到您的需求，24小時內聯繫您</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {[{n:'name',p:'姓名',t:'text',r:true},{n:'company',p:'公司名稱',t:'text',r:true},{n:'email',p:'Email',t:'email',r:true}].map(f => (
                <div key={f.n}>
                  <input name={f.n} type={f.t} value={(formData as any)[f.n]} onChange={handleChange} placeholder={f.p + (f.r?' *':'')}
                    style={{ width:'100%', padding:'14px 18px', borderRadius:8, background:'rgba(99,102,241,0.08)', border:'1px solid #6366f133', color:'white', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box' }} />
                  {errors[f.n] && <p style={{ color:'#f87171', fontSize:12, margin:'4px 0 0' }}>{errors[f.n]}</p>}
                </div>
              ))}
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="簡述您的需求（例如：網紅類型、預算、合作時程）"
                style={{ width:'100%', padding:'14px 18px', borderRadius:8, background:'rgba(99,102,241,0.08)', border:'1px solid #6366f133', color:'white', fontSize:15, outline:'none', resize:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box' }} />
              <button type="submit" disabled={isSubmitting} className="neon-btn" style={{ padding:'16px', borderRadius:8, color:'white', fontWeight:700, fontSize:15, cursor: isSubmitting?'not-allowed':'pointer', letterSpacing:2, border:'none' }}>
                {isSubmitting ? '傳送中...' : '送出需求'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ padding:'24px 32px', borderTop:'1px solid #6366f122', textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.2)', fontSize:12, margin:0, letterSpacing:1 }}>© 2026 星脈行銷 STARLIGHT MARKETING · ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}
