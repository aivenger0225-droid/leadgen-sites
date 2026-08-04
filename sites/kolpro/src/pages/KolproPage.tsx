import { useState, useEffect } from 'react';

const industries = ['美妝保養', '3C數位', '餐飲美食', '運動健身', '母嬰親子', '時尚服飾', '金融壽險', '房地產', '旅遊飯店', '其他'];
const budgets = ['5萬以下', '5-15萬', '15-30萬', '30-50萬', '50萬以上'];
const campaignTypes = ['短期單次合作', '長期經紀約', '品牌年度合作', '商品置入', '活動代言'];

const mockMatches = [
  { name:'Lin Chen', platform:'Instagram', followers:'8.2萬', specialty:'美妝保養', score:96, avatar:'LC' },
  { name:'Mike Wu', platform:'TikTok', followers:'12.5萬', specialty:'3C開箱', score:93, avatar:'MW' },
  { name:'Sofia Tsai', platform:'YouTube', followers:'5.3萬', specialty:'生活風格', score:91, avatar:'ST' },
  { name:'Jason Lee', platform:'Instagram', followers:'3.8萬', specialty:'運動健身', score:88, avatar:'JL' },
  { name:'Emma Ho', platform:'Threads', followers:'6.1萬', specialty:'親子育兒', score:85, avatar:'EH' },
];

function MatchingAnimation({ onComplete }: { onComplete: () => void }) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400);
    const timer = setTimeout(onComplete, 2800);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);
  return (
    <div style={{ textAlign:'center', padding:'48px' }}>
      <div style={{ width:80, height:80, borderRadius:'50%', border:'3px solid #7c3aed', borderTopColor:'transparent', margin:'0 auto 24px', animation:'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to{transform:rotate(360deg)} }`}</style>
      <p style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:20, color:'#7c3aed', margin:'0 0 8px' }}>AI 網紅配對中{dots}</p>
      <p style={{ color:'#888', fontSize:14, fontWeight:300 }}>正在從 5,000+ 網紅資料庫中分析最佳人選</p>
    </div>
  );
}

export default function KolproPage({ apiEndpoint }: { apiEndpoint: string }) {
  const [step, setStep] = useState<'form' | 'matching' | 'results'>('form');
  const [form, setForm] = useState({ industry:'', budget:'', campaignType:'', name:'', email:'', company:'', message:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const e: Record<string,string> = {};
    if (!form.industry) e.industry = '請選擇產業類型';
    if (!form.budget) e.budget = '請選擇預算範圍';
    if (!form.campaignType) e.campaignType = '請選擇合作形式';
    if (!form.name.trim()) e.name = '請輸入姓名';
    if (!form.email.trim()) e.email = '請輸入 Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '格式不正確';
    if (!form.company.trim()) e.company = '請輸入公司名稱';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleStartMatching = () => {
    if (!validateForm()) return;
    setStep('matching');
  };

  const handleMatchingComplete = () => setStep('results');

  const handleSubmitProposal = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: '潮界經紀-AI配對提案' }),
      });
      if (res.ok) setIsSuccess(true);
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background:'#ffffff', minHeight:'100vh', fontFamily:"'Inter','Noto Sans TC',sans-serif", color:'#0a0a0a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Oswald:wght@400;700&family=Noto+Sans+TC:wght@400;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .purple-accent { background:#7c3aed; }
        .purple-text { color:#7c3aed; }
        .option-btn { border:1px solid #e0e0e0; transition:all 0.2s; cursor:pointer; font-size:14; }
        .option-btn:hover { border-color:#7c3aed; background:#faf5ff; }
        .option-btn.selected { border-color:#7c3aed; background:#f3e8ff; color:#7c3aed; font-weight:700; }
        .match-card { transition:all 0.3s; }
        .match-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(124,58,237,0.15); }
      `}</style>

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'0 48px', height:64, display:'flex', justifyContent:'space-between', alignItems:'center', background:'#0a0a0a' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:32, height:32, background:'#7c3aed', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'white', fontWeight:900, fontSize:14 }}>K</span>
          </div>
          <span style={{ color:'white', fontWeight:900, fontSize:16, letterSpacing:2 }}>KOLPRO</span>
        </div>
        {step !== 'form' && (
          <button onClick={() => setStep('form')} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', fontSize:13 }}>← 重新開始</button>
        )}
      </nav>

      {/* Step 1: Form */}
      {step === 'form' && (
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:64 }}>
          <div style={{ maxWidth:640, margin:'0 auto', padding:'80px 48px', width:'100%' }}>
            <div style={{ marginBottom:48 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', background:'#f3e8ff', borderRadius:20, marginBottom:20 }}>
                <span style={{ fontSize:12, color:'#7c3aed', fontWeight:700, letterSpacing:1 }}>⚡ AI POWERED</span>
              </div>
              <h1 style={{ fontWeight:900, fontSize:'clamp(32px,5vw,52px)', lineHeight:1.05, margin:'0 0 16px', color:'#0a0a0a', letterSpacing:'-1px' }}>
                30 秒找到<br /><span className="purple-text">最適合的網紅</span>
              </h1>
              <p style={{ fontSize:16, color:'#666', lineHeight:1.7 }}>填寫基本需求，AI 即時為您配對最適合的網紅人選</p>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
              {/* Industry */}
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#0a0a0a', letterSpacing:1, marginBottom:10 }}>產業類型 *</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {industries.map(ind => (
                    <button type="button" key={ind} onClick={() => setForm(p => ({...p, industry: ind}))}
                      className={`option-btn ${form.industry === ind ? 'selected' : ''}`}
                      style={{ padding:'9px 18px', borderRadius:8, background: form.industry === ind ? '#f3e8ff' : 'white', border:`1px solid ${form.industry === ind ? '#7c3aed' : '#e0e0e0'}`, color: form.industry === ind ? '#7c3aed' : '#555', fontFamily:"'Noto Sans TC',sans-serif" }}>
                      {ind}
                    </button>
                  ))}
                </div>
                {errors.industry && <p style={{ color:'#dc2626', fontSize:12, marginTop:6 }}>{errors.industry}</p>}
              </div>

              {/* Budget */}
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#0a0a0a', letterSpacing:1, marginBottom:10 }}>合作預算 *</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {budgets.map(b => (
                    <button type="button" key={b} onClick={() => setForm(p => ({...p, budget: b}))}
                      className={`option-btn ${form.budget === b ? 'selected' : ''}`}
                      style={{ padding:'9px 18px', borderRadius:8, background: form.budget === b ? '#f3e8ff' : 'white', border:`1px solid ${form.budget === b ? '#7c3aed' : '#e0e0e0'}`, color: form.budget === b ? '#7c3aed' : '#555', fontFamily:"'Noto Sans TC',sans-serif" }}>
                      {b}
                    </button>
                  ))}
                </div>
                {errors.budget && <p style={{ color:'#dc2626', fontSize:12, marginTop:6 }}>{errors.budget}</p>}
              </div>

              {/* Campaign type */}
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#0a0a0a', letterSpacing:1, marginBottom:10 }}>合作形式 *</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {campaignTypes.map(c => (
                    <button type="button" key={c} onClick={() => setForm(p => ({...p, campaignType: c}))}
                      className={`option-btn ${form.campaignType === c ? 'selected' : ''}`}
                      style={{ padding:'9px 18px', borderRadius:8, background: form.campaignType === c ? '#f3e8ff' : 'white', border:`1px solid ${form.campaignType === c ? '#7c3aed' : '#e0e0e0'}`, color: form.campaignType === c ? '#7c3aed' : '#555', fontFamily:"'Noto Sans TC',sans-serif" }}>
                      {c}
                    </button>
                  ))}
                </div>
                {errors.campaignType && <p style={{ color:'#dc2626', fontSize:12, marginTop:6 }}>{errors.campaignType}</p>}
              </div>

              {/* Contact */}
              <div style={{ borderTop:'2px solid #0a0a0a', paddingTop:28 }}>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#0a0a0a', letterSpacing:1, marginBottom:16 }}>您的聯絡資訊</label>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {[{n:'name',p:'姓名',t:'text'},{n:'company',p:'公司名稱',t:'text'},{n:'email',p:'Email',t:'email'}].map(f => (
                    <div key={f.n}>
                      <input name={f.n} type={f.t} value={(form as any)[f.n]} onChange={e => setForm(p => ({...p, [e.target.name]: e.target.value}))}
                        placeholder={f.p} style={{ width:'100%', padding:'14px 16px', border:'1px solid #e0e0e0', borderRadius:8, fontSize:15, outline:'none', fontFamily:"'Inter','Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                      {errors[f.n] && <p style={{ color:'#dc2626', fontSize:12, marginTop:4 }}>{errors[f.n]}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <button type="button" onClick={handleStartMatching}
                style={{ padding:'18px', background:'#7c3aed', color:'white', fontWeight:900, fontSize:16, border:'none', borderRadius:8, cursor:'pointer', letterSpacing:1 }}>
                ⚡ 開始 AI 配對 →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Matching animation */}
      {step === 'matching' && <MatchingAnimation onComplete={handleMatchingComplete} />}

      {/* Results */}
      {step === 'results' && !isSuccess && (
        <section style={{ minHeight:'100vh', paddingTop:64 }}>
          <div style={{ maxWidth:900, margin:'0 auto', padding:'60px 48px' }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', background:'#f3e8ff', borderRadius:20, marginBottom:16 }}>
                <span style={{ fontSize:14 }}>⚡</span>
                <span style={{ fontSize:13, color:'#7c3aed', fontWeight:700 }}>AI 配對完成</span>
              </div>
              <h2 style={{ fontWeight:900, fontSize:36, color:'#0a0a0a', margin:'0 0 8px', letterSpacing:'-1px' }}>
                找到 <span className="purple-text">5 位</span> 高度匹配網紅
              </h2>
              <p style={{ color:'#888', fontSize:15 }}>根據您的需求（{form.industry} · {form.budget} · {form.campaignType}）最佳配對</p>
            </div>

            {/* Match cards */}
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
              {mockMatches.map((m, i) => (
                <div key={i} className="match-card fade-up" style={{ display:'flex', alignItems:'center', gap:20, padding:'20px 24px', borderRadius:12, border:'1px solid #e0e0e0', background:'white', animationDelay:`${i * 0.1}s` }}>
                  <div style={{ width:52, height:52, borderRadius:'50%', background:'#f3e8ff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, color:'#7c3aed', fontSize:15, flexShrink:0 }}>
                    {m.avatar}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                      <span style={{ fontWeight:700, fontSize:16, color:'#0a0a0a' }}>{m.name}</span>
                      <span style={{ fontSize:12, color:'#888', background:'#f5f5f5', padding:'2px 8px', borderRadius:10 }}>{m.platform}</span>
                      <span style={{ fontSize:12, color:'#888' }}>{m.followers} 粉絲</span>
                    </div>
                    <div style={{ fontSize:13, color:'#666' }}>{m.specialty}</div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontWeight:900, fontSize:24, color:'#7c3aed' }}>{m.score}<span style={{ fontSize:13 }}>/100</span></div>
                    <div style={{ fontSize:11, color:'#aaa', letterSpacing:1 }}>匹配度</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Proposal form */}
            <div style={{ border:'2px solid #0a0a0a', borderRadius:16, padding:'40px' }}>
              <h3 style={{ fontWeight:900, fontSize:22, color:'#0a0a0a', margin:'0 0 8px' }}>索取完整提案單</h3>
              <p style={{ color:'#888', fontSize:14, margin:'0 0 24px' }}>我們的經紀顧問會根據這 5 位網紅提供詳細合作方案與報價</p>
              <textarea name="message" value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} rows={3}
                placeholder="補充說明（希望合作的網紅、特殊需求、合作時程）"
                style={{ width:'100%', padding:'14px 16px', border:'1px solid #e0e0e0', borderRadius:8, fontSize:15, outline:'none', resize:'none', fontFamily:"'Inter','Noto Sans TC',sans-serif", boxSizing:'border-box', marginBottom:16 }} />
              <button type="button" onClick={handleSubmitProposal} disabled={isSubmitting}
                style={{ width:'100%', padding:'16px', background: isSubmitting ? '#ccc' : '#0a0a0a', color:'white', fontWeight:900, fontSize:15, border:'none', borderRadius:8, cursor:isSubmitting?'not-allowed':'pointer', letterSpacing:1 }}>
                {isSubmitting ? '傳送中...' : '索取完整提案 →'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Success */}
      {isSuccess && (
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ textAlign:'center', maxWidth:480, padding:'48px 32px' }}>
            <div style={{ fontSize:64, marginBottom:20 }}>⚡</div>
            <h2 style={{ fontWeight:900, fontSize:32, color:'#0a0a0a', margin:'0 0 12px' }}>提案已送出！</h2>
            <p style={{ color:'#666', fontSize:16, lineHeight:1.8, margin:'0 0 32px' }}>
              我們的經紀顧問會根據您的 AI 配對結果，提供包含詳細網紅資料、報價與執行時間表的完整提案單。通常在 12 小時內送出。
            </p>
            <button onClick={() => { setIsSuccess(false); setStep('form'); setForm({ industry:'', budget:'', campaignType:'', name:'', email:'', company:'', message:'' }); }}
              style={{ padding:'14px 32px', background:'#7c3aed', color:'white', fontWeight:700, fontSize:14, border:'none', borderRadius:8, cursor:'pointer' }}>
              再次配對
            </button>
          </div>
        </section>
      )}

      <footer style={{ padding:'24px 48px', background:'#0a0a0a', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ color:'rgba(255,255,255,0.15)', fontSize:12, letterSpacing:1, margin:0, textAlign:'center' }}>© 2026 KOLPRO 潮界經紀 · 一站式網紅變現合作平台</p>
      </footer>
    </div>
  );
}
