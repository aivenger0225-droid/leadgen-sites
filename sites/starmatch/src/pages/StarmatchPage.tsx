import { useState } from 'react';

interface Step1Data {
  budget: string;
  platforms: string[];
  influencerType: string;
}
interface Step2Data {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function StarmatchPage({ apiEndpoint }: { apiEndpoint: string }) {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Data>({ budget: '', platforms: [], influencerType: '' });
  const [step2, setStep2] = useState<Step2Data>({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const platformOptions = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Threads', 'LINE'];
  const budgetOptions = ['5萬以下', '5-15萬', '15-30萬', '30-50萬', '50萬以上'];
  const influencerOptions = ['微型 KOC（1萬以下）', '小網紅（1-10萬）', '中網紅（10-50萬）', '大網紅（50萬以上）', '不限'];

  const togglePlatform = (p: string) => {
    setStep1(prev => ({
      ...prev,
      platforms: prev.platforms.includes(p) ? prev.platforms.filter(x => x !== p) : [...prev.platforms, p],
    }));
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!step1.budget) e.budget = '請選擇預算範圍';
    if (step1.platforms.length === 0) e.platforms = '請至少選擇一個平台';
    if (!step1.influencerType) e.influencerType = '請選擇網紅規模';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!step2.name.trim()) e.name = '請輸入姓名';
    if (!step2.email.trim()) e.email = '請輸入 Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step2.email)) e.email = '格式不正確';
    if (!step2.company.trim()) e.company = '請輸入公司名稱';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep1()) setStep(2); };
  const handleBack = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...step2, ...step1, source: '星脈行銷-電商網紅媒合' }),
      });
      if (res.ok) { setIsSuccess(true); }
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background:'#050510', minHeight:'100vh', fontFamily:"'Inter','Noto Sans TC',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600;700&family=Noto+Sans+TC:wght@400;700&display=swap');
        @keyframes glow-pulse { 0%,100%{text-shadow:0 0 20px #6366f1,0 0 40px #6366f155} 50%{text-shadow:0 0 40px #6366f1,0 0 80px #6366f188} }
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes slide-in { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes progress-fill { from{width:0} to:var(--target-width) }
        .glow-text { animation: glow-pulse 3s ease-in-out infinite; color:#818cf8; }
        .scan-line { position:absolute; left:0; right:0; height:2px; background:linear-gradient(transparent,#6366f155,transparent); animation:scan 4s linear infinite; pointer-events:none; }
        .neon-border { border:1px solid #6366f133; box-shadow:0 0 20px #6366f111,inset 0 0 20px #6366f108; }
        .step-active { background:#6366f1; box-shadow:0 0 20px #6366f155; }
        .step-done { background:#22c55e; }
        .option-card { border:1px solid #6366f133; background:rgba(99,102,241,0.05); transition:all 0.2s; cursor:pointer; }
        .option-card:hover { border-color:#6366f1; background:rgba(99,102,241,0.12); }
        .option-card.selected { border-color:#6366f1; background:rgba(99,102,241,0.2); box-shadow:0 0 15px #6366f133; }
        .neon-btn { background:#6366f1; box-shadow:0 0 20px #6366f155; transition:all 0.3s; }
        .neon-btn:hover { box-shadow:0 0 40px #6366f1aa; transform:scale(1.03); }
      `}</style>

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'16px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(5,5,16,0.95)', backdropFilter:'blur(20px)', borderBottom:'1px solid #6366f122' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:8, background:'#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Orbitron', fontWeight:900, color:'white', fontSize:16, boxShadow:'0 0 15px #6366f155' }}>S</div>
          <span style={{ color:'white', fontFamily:'Orbitron', fontWeight:700, fontSize:18, letterSpacing:2 }}>星脈行銷</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {[1,2].map(s => (
            <div key={s} style={{ width:32, height:6, borderRadius:3, background: s <= step ? '#6366f1' : '#6366f122' }} />
          ))}
        </div>
      </nav>

      {/* Hero */}
      {step === 1 && (
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', paddingTop:80 }}>
          <div className="scan-line" />
          <div style={{ position:'absolute', top:'20%', right:'5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, #6366f122 0%, transparent 70%)', filter:'blur(60px)' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(#6366f111 1px, transparent 1px), linear-gradient(90deg, #6366f111 1px, transparent 1px)', backgroundSize:'60px 60px' }} />

          <div style={{ maxWidth:800, margin:'0 auto', padding:'80px 32px', width:'100%', position:'relative', zIndex:10 }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:20, background:'rgba(99,102,241,0.1)', border:'1px solid #6366f133', marginBottom:24 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#6366f1', display:'inline-block', boxShadow:'0 0 8px #6366f1' }} />
                <span style={{ color:'#818cf8', fontSize:12, fontWeight:600, letterSpacing:1 }}>STEP 1 / 2 · 合作需求分析</span>
              </div>
              <h1 style={{ fontFamily:'Orbitron', fontWeight:900, fontSize:40, color:'white', lineHeight:1.2, margin:'0 0 16px', letterSpacing:1 }}>
                告訴我們您的需求<br /><span className="glow-text">AI 為您配對</span>
              </h1>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15 }}>填寫以下資訊，我們會根據您的情況提供專屬方案</p>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:32 }}>

              {/* Budget */}
              <div>
                <label style={{ display:'block', color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:600, letterSpacing:1, marginBottom:12 }}>合作預算範圍 *</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                  {budgetOptions.map(b => (
                    <button key={b} type="button" onClick={() => setStep1(prev => ({...prev, budget: b}))}
                      style={{ padding:'10px 20px', borderRadius:8, border:`1px solid ${step1.budget === b ? '#6366f1' : '#6366f133'}`, background: step1.budget === b ? 'rgba(99,102,241,0.2)' : 'transparent', color: step1.budget === b ? '#818cf8' : 'rgba(255,255,255,0.5)', fontSize:14, cursor:'pointer', transition:'all 0.2s', fontFamily:'Inter,sans-serif' }}>
                      {b}
                    </button>
                  ))}
                </div>
                {errors.budget && <p style={{ color:'#f87171', fontSize:12, marginTop:8 }}>{errors.budget}</p>}
              </div>

              {/* Platform */}
              <div>
                <label style={{ display:'block', color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:600, letterSpacing:1, marginBottom:12 }}>目標平台（可複選）*</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                  {platformOptions.map(p => (
                    <button key={p} type="button" onClick={() => togglePlatform(p)}
                      style={{ padding:'10px 20px', borderRadius:8, border:`1px solid ${step1.platforms.includes(p) ? '#6366f1' : '#6366f133'}`, background: step1.platforms.includes(p) ? 'rgba(99,102,241,0.2)' : 'transparent', color: step1.platforms.includes(p) ? '#818cf8' : 'rgba(255,255,255,0.5)', fontSize:14, cursor:'pointer', transition:'all 0.2s', fontFamily:'Inter,sans-serif' }}>
                      {p}
                    </button>
                  ))}
                </div>
                {errors.platforms && <p style={{ color:'#f87171', fontSize:12, marginTop:8 }}>{errors.platforms}</p>}
              </div>

              {/* Influencer type */}
              <div>
                <label style={{ display:'block', color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:600, letterSpacing:1, marginBottom:12 }}>網紅規模 *</label>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {influencerOptions.map(opt => (
                    <button key={opt} type="button" onClick={() => setStep1(prev => ({...prev, influencerType: opt}))}
                      style={{ padding:'14px 18px', borderRadius:8, border:`1px solid ${step1.influencerType === opt ? '#6366f1' : '#6366f133'}`, background: step1.influencerType === opt ? 'rgba(99,102,241,0.15)' : 'transparent', color: step1.influencerType === opt ? '#818cf8' : 'rgba(255,255,255,0.5)', fontSize:14, cursor:'pointer', transition:'all 0.2s', textAlign:'left', fontFamily:'Inter,sans-serif' }}>
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.influencerType && <p style={{ color:'#f87171', fontSize:12, marginTop:8 }}>{errors.influencerType}</p>}
              </div>

              <button type="button" onClick={handleNext} className="neon-btn"
                style={{ padding:'16px', borderRadius:8, color:'white', fontWeight:700, fontSize:15, cursor:'pointer', letterSpacing:2, border:'none', marginTop:8 }}>
                下一步 →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Step 2 */}
      {step === 2 && !isSuccess && (
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', paddingTop:80 }}>
          <div style={{ position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, #6366f115 0%, transparent 70%)', filter:'blur(60px)' }} />

          <div style={{ maxWidth:600, margin:'0 auto', padding:'80px 32px', width:'100%', position:'relative', zIndex:10 }}>
            <button type="button" onClick={handleBack} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:14, marginBottom:32, display:'flex', alignItems:'center', gap:8, fontFamily:'Inter,sans-serif' }}>
              ← 上一步
            </button>

            <div style={{ marginBottom:40 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:20, background:'rgba(99,102,241,0.1)', border:'1px solid #6366f133', marginBottom:16 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
                <span style={{ color:'#818cf8', fontSize:12, fontWeight:600, letterSpacing:1 }}>STEP 2 / 2 · 您的聯絡資訊</span>
              </div>
              <h2 style={{ fontFamily:'Orbitron', fontWeight:700, fontSize:28, color:'white', margin:'0 0 8px' }}>完成配對需求表</h2>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>我們的顧問會在 24 小時內提供專屬方案</p>
            </div>

            {/* Summary of step 1 */}
            <div style={{ padding:'16px 20px', borderRadius:10, background:'rgba(99,102,241,0.08)', border:'1px solid #6366f133', marginBottom:32, display:'flex', flexDirection:'column', gap:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>預算</span>
                <span style={{ color:'#818cf8', fontSize:13, fontWeight:600 }}>{step1.budget}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>平台</span>
                <span style={{ color:'#818cf8', fontSize:13, fontWeight:600 }}>{step1.platforms.join(', ')}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>規模</span>
                <span style={{ color:'#818cf8', fontSize:13, fontWeight:600 }}>{step1.influencerType}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {[
                {n:'name', p:'姓名 *', t:'text'},
                {n:'company', p:'公司名稱 *', t:'text'},
                {n:'email', p:'Email *', t:'email'},
              ].map(f => (
                <div key={f.n}>
                  <input name={f.n} type={f.t} value={(step2 as any)[f.n]} onChange={e => setStep2(prev => ({...prev, [e.target.name]: e.target.value}))}
                    placeholder={f.p} style={{ width:'100%', padding:'14px 18px', borderRadius:8, background:'rgba(99,102,241,0.08)', border:'1px solid #6366f133', color:'white', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box' }} />
                  {errors[f.n] && <p style={{ color:'#f87171', fontSize:12, marginTop:4 }}>{errors[f.n]}</p>}
                </div>
              ))}
              <textarea name="message" value={step2.message} onChange={e => setStep2(prev => ({...prev, message: e.target.value}))} rows={3}
                placeholder="補充說明（產品類型、合作時程、特殊需求）"
                style={{ width:'100%', padding:'14px 18px', borderRadius:8, background:'rgba(99,102,241,0.08)', border:'1px solid #6366f133', color:'white', fontSize:15, outline:'none', resize:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box' }} />
              <button type="submit" disabled={isSubmitting} className="neon-btn"
                style={{ padding:'16px', borderRadius:8, color:'white', fontWeight:700, fontSize:15, cursor:isSubmitting?'not-allowed':'pointer', letterSpacing:2, border:'none' }}>
                {isSubmitting ? '傳送中...' : '送出需求 →'}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Success */}
      {isSuccess && (
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ textAlign:'center', maxWidth:500, padding:'32px' }}>
            <div style={{ fontSize:64, marginBottom:24, filter:'drop-shadow(0 0 30px rgba(99,102,241,0.5))' }}>⚡</div>
            <h2 style={{ fontFamily:'Orbitron', fontWeight:900, fontSize:32, color:'white', margin:'0 0 16px' }}>配對需求已送出</h2>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, lineHeight:1.8 }}>
              我們已收到您的合作需求。<br />24小時內會有專屬顧問與您聯繫，提供客製化方案。
            </p>
            <div style={{ marginTop:32, padding:'20px', borderRadius:12, background:'rgba(99,102,241,0.08)', border:'1px solid #6366f133', textAlign:'left' }}>
              <p style={{ color:'#818cf8', fontSize:13, fontWeight:600, margin:'0 0 8px' }}>您的需求摘要</p>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, margin:'0 4px' }}>預算：{step1.budget} · 平台：{step1.platforms.join(', ')} · {step1.influencerType}</p>
            </div>
          </div>
        </section>
      )}

      <footer style={{ padding:'24px 32px', borderTop:'1px solid #6366f122', textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.15)', fontSize:11, margin:0, letterSpacing:1 }}>© 2026 星脈行銷 STARLIGHT MARKETING · 電商網紅媒合專家</p>
      </footer>
    </div>
  );
}
