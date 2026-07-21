import React, { useState, useEffect, useRef } from 'react';
import './Questionnaire.css';

const MIN_CHARS = 20;
const CALENDAR_LINK = 'https://calendar.google.com/placeholder';

const submitToBackend = async (formData) => {
  try {
    const base = (process.env.NODE_ENV === 'production'
      ? 'https://admin-pyro-backend.vercel.app'
      : 'http://localhost:5000').replace(/\/$/, '');
    const res = await fetch(`${base}/api/questionnaire/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result?.message || `Error ${res.status}`);
    return result;
  } catch (err) {
    console.error('Backend submit error:', err);
    throw err;
  }
};

const Questionnaire = () => {
  const [currentId, setCurrentId] = useState('welcome');
  const [navHistory, setNavHistory] = useState([]);
  const [userName, setUserName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [multiSel, setMultiSel] = useState({ q4: [], q4b: [] });
  const [textAnswer, setTextAnswer] = useState('');
  const [emailDirect, setEmailDirect] = useState('');
  const [emailA, setEmailA] = useState('');
  const [linkedinA, setLinkedinA] = useState('');
  const [reachA, setReachA] = useState('');
  const [trackBEmail, setTrackBEmail] = useState('');
  const [trackBRevealed, setTrackBRevealed] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const nameRef = useRef(null);

  // Session reset on new tab/browser session
  useEffect(() => {
    const key = 'ps_pipeline_session';
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      doRestart();
    }
  }, []);

  // Auto-advance verifying screens
  useEffect(() => {
    if (currentId === 'verifying') {
      const t = setTimeout(() => navigate('outcome_a'), 3200);
      return () => clearTimeout(t);
    }
    if (currentId === 'verifying_b') {
      const t = setTimeout(() => navigate('outcome_b_first'), 1800);
      return () => clearTimeout(t);
    }
  }, [currentId]);

  useEffect(() => {
    if (currentId === 'welcome' && nameRef.current) nameRef.current.focus();
  }, [currentId]);

  const navigate = (id) => {
    setNavHistory(prev => [...prev, currentId]);
    setCurrentId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setNavHistory(prev => {
      if (!prev.length) return prev;
      const copy = [...prev];
      const prevId = copy.pop();
      setCurrentId(prevId);
      return copy;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const doRestart = () => {
    setCurrentId('welcome');
    setNavHistory([]);
    setUserName('');
    setNameInput('');
    setMultiSel({ q4: [], q4b: [] });
    setTextAnswer('');
    setEmailDirect('');
    setEmailA('');
    setLinkedinA('');
    setReachA('');
    setTrackBEmail('');
    setTrackBRevealed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMulti = (id, idx) => {
    setMultiSel(prev => {
      const arr = [...prev[id]];
      const pos = arr.indexOf(idx);
      if (pos === -1) arr.push(idx); else arr.splice(pos, 1);
      return { ...prev, [id]: arr };
    });
  };

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 4000);
  };

  const openCalendar = () => window.open(CALENDAR_LINK, '_blank');

  const submitName = () => {
    setUserName(nameInput.trim() || 'there');
    navigate('q1');
  };

  const submitQ8 = () => {
    if (textAnswer.length < MIN_CHARS) return;
    navigate('verifying');
  };

  const submitEmailCalendar = () => {
    openCalendar();
    navigate('queue_confirm');
  };

  const submitContactA = async () => {
    try {
      await submitToBackend({ name: userName, email: emailA, linkedin: linkedinA, reach: reachA, path: 'queue' });
      showToast('Your spot is reserved!');
    } catch (_) {}
    navigate('queue_confirm');
  };

  const submitTrackB = async () => {
    try {
      await submitToBackend({ name: userName, email: trackBEmail, path: 'track_b' });
    } catch (_) {}
    navigate('outcome_b_confirmed');
  };

  const canGoBack = navHistory.length > 0;
  const charLen = textAnswer.length;
  const q4Sel = multiSel.q4;
  const q4bSel = multiSel.q4b;

  const ProgressRow = ({ pct, showBack }) => (
    <div className="ds-progress-row">
      <button
        className={`ds-nav-icon${showBack ? '' : ' ds-nav-icon--hidden'}`}
        onClick={goBack}
        aria-label="Go back"
      >←</button>
      <div className="ds-progress-track">
        <div className="ds-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <button className="ds-nav-icon" onClick={doRestart} aria-label="Restart">↺</button>
    </div>
  );

  const MultiList = ({ id, options, sel }) => (
    <div className="ds-multi-list">
      {options.map((label, i) => (
        <button
          key={i}
          className={`ds-multi-option${sel.includes(i) ? ' ds-multi-option--on' : ''}`}
          onClick={() => toggleMulti(id, i)}
        >
          <span className="ds-multi-check">{sel.includes(i) ? '✓' : ''}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );

  const renderScreen = () => {
    switch (currentId) {

      case 'welcome':
        return (
          <div className="ds-card">
            <h1 className="ds-title ds-title--warm">Welcome to the<br />Empathetic Pipeline</h1>
            <p className="ds-welcome-label">
              This is how we get to know you before we ever pitch you anything.<br />
              Be honest. Your answers shape everything that comes next.
            </p>
            <p className="ds-sub">First, what can we call you?</p>
            <input ref={nameRef} className="ds-name-input" type="text" placeholder="Enter your name"
              value={nameInput} onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitName()} />
            <div className="ds-btn-row">
              <button className="ds-btn ds-btn--primary" onClick={submitName}>let's begin</button>
            </div>
          </div>
        );

      case 'q1':
        return (
          <div className="ds-card">
            <ProgressRow pct={10} showBack={canGoBack} />
            <h2 className="ds-title">Where is your business right now?</h2>
            <p className="ds-sub">Be honest. There is no wrong answer, only the right fit.</p>
            <div className="ds-grid ds-grid--2col">
              <button className="ds-option" onClick={() => navigate('exit_prerevenue')}>Pre-revenue</button>
              <button className="ds-option" onClick={() => navigate('q2')}>Early revenue</button>
              <button className="ds-option ds-option--wide" onClick={() => navigate('q2')}>Trying to scale</button>
            </div>
          </div>
        );

      case 'q2':
        return (
          <div className="ds-card">
            <ProgressRow pct={22} showBack={canGoBack} />
            <h2 className="ds-title">What is not working the way you imagined?</h2>
            <p className="ds-sub">Pick the one that hits closest.</p>
            <div className="ds-grid ds-grid--2col">
              <button className="ds-option" onClick={() => navigate('q3')}>My brand does not reflect what I actually built</button>
              <button className="ds-option" onClick={() => navigate('q3')}>People do not understand what I do fast enough</button>
              <button className="ds-option" onClick={() => navigate('q3')}>Growing but the foundation feels shaky</button>
              <button className="ds-option ds-option--wide" onClick={() => navigate('q5')}>I just know something is off</button>
            </div>
          </div>
        );

      case 'q3':
        return (
          <div className="ds-card">
            <ProgressRow pct={34} showBack={canGoBack} />
            <h2 className="ds-title">Have you tried to fix this before?</h2>
            <p className="ds-sub">An agency, a freelancer, an in-house hire, DIY. Anything counts.</p>
            <div className="ds-grid ds-grid--1col">
              <button className="ds-option" onClick={() => navigate('q4')}>Yes, and it did not work out</button>
              <button className="ds-option" onClick={() => navigate('q5')}>Yes, partially, but I hit a wall</button>
              <button className="ds-option" onClick={() => navigate('q5')}>No, this is my first real attempt</button>
            </div>
          </div>
        );

      case 'q4':
        return (
          <div className="ds-card">
            <ProgressRow pct={45} showBack={canGoBack} />
            <h2 className="ds-title">What do you think went wrong last time?</h2>
            <p className="ds-sub">Be as honest as you like. Most founders have more than one reason.</p>
            <p className="ds-hint">Select all that apply</p>
            <MultiList id="q4" sel={q4Sel} options={[
              'They did not listen. They just executed what they wanted.',
              'I could not clearly explain what I needed',
              'The cost was too high for what we got',
              'We were just not aligned from the start',
            ]} />
            <div className="ds-btn-row">
              <button className="ds-btn ds-btn--primary" onClick={() => navigate('q4b')} disabled={q4Sel.length === 0}>next</button>
            </div>
          </div>
        );

      case 'q4b':
        return (
          <div className="ds-card">
            <ProgressRow pct={54} showBack={canGoBack} />
            <h2 className="ds-title">What would make you feel confident trying again?</h2>
            <p className="ds-sub">Think about what that version of working together would actually feel like.</p>
            <p className="ds-hint">Select all that apply</p>
            <MultiList id="q4b" sel={q4bSel} options={[
              'Someone who actually listens before they pitch anything',
              'A clear process I can see and follow from the start',
              'Proof that they understand my specific business, not just the category',
              'A lower barrier to start, so I can trust before committing',
            ]} />
            <div className="ds-btn-row">
              <button className="ds-btn ds-btn--primary" onClick={() => navigate('q5')} disabled={q4bSel.length === 0}>next</button>
            </div>
          </div>
        );

      case 'q5':
        return (
          <div className="ds-card">
            <ProgressRow pct={63} showBack={canGoBack} />
            <h2 className="ds-title">Where do you feel you need the most support right now?</h2>
            <p className="ds-sub">Not what you are bad at. Just where you feel the gap the most.</p>
            <div className="ds-grid ds-grid--1col">
              <button className="ds-option" onClick={() => navigate('q6')}>Telling my story. Brand, positioning, how I show up.</button>
              <button className="ds-option" onClick={() => navigate('q6')}>The tech and systems side. Building the right infrastructure.</button>
              <button className="ds-option" onClick={() => navigate('q6')}>Figuring out what the actual problem even is</button>
              <button className="ds-option" onClick={() => navigate('q6')}>I know what I need. I just need the right people to build it.</button>
            </div>
          </div>
        );

      case 'q6':
        return (
          <div className="ds-card">
            <ProgressRow pct={72} showBack={canGoBack} />
            <h2 className="ds-title">When it comes to moving forward, who makes the call?</h2>
            <p className="ds-sub">No right answer. This just helps us know who needs to be in the room.</p>
            <div className="ds-grid ds-grid--1col">
              <button className="ds-option" onClick={() => navigate('q7a')}>Me. I am the founder and I decide.</button>
              <button className="ds-option" onClick={() => navigate('q7a')}>Me, but I want a co-founder or partner aligned first</button>
              <button className="ds-option" onClick={() => navigate('q7b')}>There are stakeholders or investors involved</button>
            </div>
          </div>
        );

      case 'q7a':
        return (
          <div className="ds-card">
            <ProgressRow pct={82} showBack={canGoBack} />
            <h2 className="ds-title">What is your honest timeline on this?</h2>
            <p className="ds-sub">No pressure either way. Knowing this helps us show up for you properly.</p>
            <div className="ds-grid ds-grid--1col">
              <button className="ds-option" onClick={() => navigate('q8')}>Urgent. I need to move in the next few weeks.</button>
              <button className="ds-option" onClick={() => navigate('q8')}>Soon. Within the next month or two.</button>
              <button className="ds-option" onClick={() => navigate('verifying_b')}>Just exploring for now</button>
            </div>
          </div>
        );

      case 'q7b':
        return (
          <div className="ds-card">
            <ProgressRow pct={82} showBack={canGoBack} />
            <h2 className="ds-title">Is there a timeline you are working toward?</h2>
            <p className="ds-sub">A launch, a funding round, a pivot. Something that makes this real.</p>
            <div className="ds-grid ds-grid--1col">
              <button className="ds-option" onClick={() => navigate('q8')}>Yes. There is a hard deadline coming.</button>
              <button className="ds-option" onClick={() => navigate('q8')}>No hard date, but I feel the internal urgency</button>
              <button className="ds-option" onClick={() => navigate('verifying_b')}>No urgency right now. Still exploring.</button>
            </div>
          </div>
        );

      case 'q8': {
        const isOk = charLen >= MIN_CHARS;
        return (
          <div className="ds-card">
            <ProgressRow pct={92} showBack={canGoBack} />
            <h2 className="ds-title">Last one. What made you fill this in today instead of closing the tab?</h2>
            <p className="ds-sub">Be honest. This tells us more than everything else combined.</p>
            <textarea className="ds-textarea" placeholder="There is no right answer here. Just tell us what is true."
              value={textAnswer} onChange={e => setTextAnswer(e.target.value)} />
            <p className={`ds-char-count${isOk ? ' ds-char-count--ok' : ''}`}>
              {isOk ? `${charLen} characters` : `${charLen} / ${MIN_CHARS} minimum`}
            </p>
            <p className="ds-insight-note">"The more honestly you fill this in, the more we can help you before we even speak."</p>
            <div className="ds-btn-row">
              <button className="ds-btn ds-btn--primary" onClick={submitQ8} disabled={!isOk}>next</button>
            </div>
          </div>
        );
      }

      case 'verifying':
      case 'verifying_b':
        return (
          <div className="ds-card">
            <ProgressRow pct={96} showBack={false} />
            <div className="ds-verify-wrap">
              <div className="ds-spinner" />
              <p className="ds-verify-text">Reviewing your answers...</p>
              <div className="ds-dots"><span /><span /><span /></div>
            </div>
          </div>
        );

      case 'outcome_a':
        return (
          <div className="ds-card">
            <ProgressRow pct={100} showBack={false} />
            <span className="ds-emoji">🔥</span>
            <h2 className="ds-outcome-title">You are exactly who we built this for.</h2>
            <p className="ds-outcome-desc">You showed up with honesty. That is rarer than you think.</p>
            <div className="ds-brand-blurb">
              <p>PyroSynergy is a small, empathy-driven agency that helps early-stage founders build the brand, tech, and strategy foundation their idea actually deserves. We do not take every project. We take the right ones.</p>
            </div>
            <p className="ds-sub" style={{ marginBottom: '20px' }}>Now let us figure out the best way to connect.</p>
            <div className="ds-cta-stack">
              <button className="ds-cta-primary" onClick={() => navigate('email_before_calendar')}>
                Book your discovery call now
                <span className="ds-cta-sub">Pick a time that works for you. Instant confirmation.</span>
              </button>
              <button className="ds-cta-secondary" onClick={() => navigate('contact_a')}>
                Reach out to me instead
                <span className="ds-cta-sub">Fill in your details and we will come to you.</span>
              </button>
            </div>
            <button className="ds-restart-link" onClick={doRestart}>Start over</button>
          </div>
        );

      case 'email_before_calendar':
        return (
          <div className="ds-card">
            <ProgressRow pct={99} showBack={canGoBack} />
            <span className="ds-emoji" style={{ fontSize: '36px' }}>📅</span>
            <h2 className="ds-title">One last thing before we open your calendar.</h2>
            <p className="ds-sub">Drop your email so we have a way to follow up in case anything comes up.</p>
            <div className="ds-field-group">
              <label className="ds-field-label" htmlFor="emailDirect">Email address</label>
              <input className="ds-field-input" id="emailDirect" type="email" placeholder="you@example.com"
                value={emailDirect} onChange={e => setEmailDirect(e.target.value)} />
            </div>
            <p className="ds-privacy">We will only use this to confirm your booking and follow up once. That is it.</p>
            <hr className="ds-divider" />
            <button className="ds-cta-calendar" onClick={submitEmailCalendar}>
              Take me to the calendar
              <span className="ds-cta-sub">Opens in a new tab</span>
            </button>
          </div>
        );

      case 'contact_a':
        return (
          <div className="ds-card">
            <ProgressRow pct={98} showBack={canGoBack} />
            <h2 className="ds-title">Where should we reach you?</h2>
            <p className="ds-sub">We will be in touch within 24 to 48 hours to confirm your spot.</p>
            <div className="ds-field-group">
              <label className="ds-field-label" htmlFor="emailA">Email address</label>
              <input className="ds-field-input" id="emailA" type="email" placeholder="you@example.com"
                value={emailA} onChange={e => setEmailA(e.target.value)} />
            </div>
            <div className="ds-field-group">
              <label className="ds-field-label" htmlFor="linkedinA">LinkedIn profile URL</label>
              <input className="ds-field-input" id="linkedinA" type="text" placeholder="linkedin.com/in/yourname"
                value={linkedinA} onChange={e => setLinkedinA(e.target.value)} />
            </div>
            <div className="ds-field-group">
              <label className="ds-field-label" htmlFor="reachA">Best way to reach you</label>
              <input className="ds-field-input" id="reachA" type="text" placeholder="e.g. WhatsApp, morning calls, your time zone"
                value={reachA} onChange={e => setReachA(e.target.value)} />
            </div>
            <p className="ds-privacy">Your details are only used to follow up on this conversation. We do not share them.</p>
            <hr className="ds-divider" />
            <div className="ds-btn-row">
              <button className="ds-btn-reserve" onClick={submitContactA}>Reserve my spot</button>
            </div>
          </div>
        );

      case 'queue_confirm':
        return (
          <div className="ds-card">
            <ProgressRow pct={100} showBack={false} />
            <span className="ds-emoji">✅</span>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span className="ds-slots-badge"><span className="ds-slots-dot" /> Limited slots this week</span>
            </div>
            <h2 className="ds-outcome-title">Your spot is reserved.</h2>
            <p className="ds-outcome-desc">
              We are reviewing your answers personally and will reach out within 24 to 48 hours.<br /><br />
              <strong style={{ color: '#fff' }}>Discovery slots this week are limited.</strong> We prioritise the founders whose answers show the clearest readiness.
            </p>
            <button className="ds-restart-link" onClick={doRestart}>Start over</button>
          </div>
        );

      case 'outcome_b_first':
        return (
          <div className="ds-card">
            <ProgressRow pct={100} showBack={false} />
            <span className="ds-emoji">⏳</span>
            <h2 className="ds-outcome-title">You are not ready to move yet. And that is okay.</h2>
            <p className="ds-outcome-desc">
              We would rather you come in when it is right than rush something that matters.<br /><br />
              We have put together one honest, no-fluff resource on building a brand foundation that actually holds. No pitch. No follow-up sequence. Just something useful.
            </p>
            {!trackBRevealed ? (
              <button className="ds-btn-track-b" onClick={() => setTrackBRevealed(true)}>Send me the resource</button>
            ) : (
              <div className="ds-reveal">
                <div className="ds-field-group">
                  <label className="ds-field-label" htmlFor="emailB">Your email address</label>
                  <input className="ds-field-input" id="emailB" type="email" placeholder="you@example.com"
                    value={trackBEmail} onChange={e => setTrackBEmail(e.target.value)} />
                </div>
                <button className="ds-btn-track-b" onClick={submitTrackB}>Send it over</button>
              </div>
            )}
            <button className="ds-restart-link" onClick={doRestart}>Start over</button>
          </div>
        );

      case 'outcome_b_confirmed':
        return (
          <div className="ds-card">
            <ProgressRow pct={100} showBack={false} />
            <span className="ds-emoji">📬</span>
            <h2 className="ds-outcome-title">It is on its way.</h2>
            <p className="ds-outcome-desc">Check your inbox. When the timing shifts and you are ready to move, you will know where to find us.</p>
            <button className="ds-restart-link" onClick={doRestart}>Start over</button>
          </div>
        );

      case 'exit_prerevenue':
        return (
          <div className="ds-card">
            <ProgressRow pct={100} showBack={false} />
            <span className="ds-emoji">🌱</span>
            <h2 className="ds-outcome-title">You are building something real. We are just not the right fit yet.</h2>
            <p className="ds-outcome-desc">
              PyroSynergy works best when there is already early traction and a paying customer or two. Right now, your energy belongs on validating the idea. Come back when that moment arrives. We will be here.
            </p>
            <p className="ds-privacy" style={{ marginBottom: '16px' }}>Bookmark this page. When you are ready, just fill it in again.</p>
            <button className="ds-restart-link" onClick={doRestart}>Start over</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="questionnaire" className="ds-section">
      {toast.show && (
        <div className="ds-toast-wrap">
          <div className={`ds-toast ds-toast--${toast.type}`}>{toast.msg}</div>
        </div>
      )}
      <div className="ds-shell">
        {renderScreen()}
      </div>
    </section>
  );
};

export default Questionnaire;