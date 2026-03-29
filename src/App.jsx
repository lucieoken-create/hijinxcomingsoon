import { useRef, useState, useEffect } from 'react'

const VIDEOS = ['ascii-landscape.mp4', 'aura.mp4', 'ripple.mp4']

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function App() {
  const videoSrc = useRef(pickRandom(VIDEOS))
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [email, setEmail] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.target
    const data = new FormData(form)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={styles.root}>
      {/* Video background */}
      <video
        key={videoSrc.current}
        autoPlay
        muted
        loop
        playsInline
        style={styles.video}
      >
        <source src={`/${videoSrc.current}`} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div style={styles.overlay} />

      {/* Content */}
      <div style={styles.content}>
        {/* Top wordmark */}
        <header style={styles.header}>
          <span style={styles.wordmark}>hijinx</span>
        </header>

        {/* Center block */}
        <main style={styles.main}>
          <h1 style={styles.headline}>Coming&nbsp;soon</h1>

          <a href="mailto:lucie@hijinx.studio" style={styles.email}>
            lucie@hijinx.studio
          </a>

          {/* Email sign-up form */}
          <div style={styles.formWrap}>
            {status === 'success' ? (
              <p style={styles.successMsg}>You're on the list.</p>
            ) : (
              <form
                name="waitlist"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                style={styles.form}
              >
                <input type="hidden" name="form-name" value="waitlist" />
                <p style={{ display: 'none' }}>
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  style={styles.input}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={styles.button}
                >
                  {status === 'submitting' ? 'sending…' : 'notify me'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p style={styles.errorMsg}>Something went wrong. Try again.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

const styles = {
  root: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    background: '#1C1446',
  },
  video: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(28, 20, 70, 0.18)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  header: {
    paddingTop: '2rem',
    textAlign: 'center',
  },
  wordmark: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '0.75rem',
    letterSpacing: '0.45em',
    color: '#ffffff',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
    transform: 'translateY(-8vh)',
  },
  headline: {
    fontFamily: "'Space Mono', monospace",
    fontWeight: 400,
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    letterSpacing: '0.18em',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  email: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    color: '#EDE8FB',
    textDecoration: 'none',
    opacity: 0.9,
    marginBottom: '2.5rem',
  },
  formWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0',
    alignItems: 'stretch',
    border: '1px solid rgba(155, 143, 212, 0.55)',
    borderRadius: '2px',
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  input: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    background: 'rgba(237, 232, 251, 0.06)',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    padding: '0.75rem 1.25rem',
    width: '220px',
    caretColor: '#C8BDEF',
  },
  button: {
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    fontSize: '0.68rem',
    letterSpacing: '0.2em',
    textTransform: 'lowercase',
    color: '#ffffff',
    background: 'rgba(155, 143, 212, 0.25)',
    border: 'none',
    borderLeft: '1px solid rgba(155, 143, 212, 0.45)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    padding: '0.75rem 1.25rem',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    whiteSpace: 'nowrap',
  },
  successMsg: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.72rem',
    letterSpacing: '0.2em',
    color: '#EDE8FB',
    opacity: 0.85,
  },
  errorMsg: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    color: '#C8BDEF',
    opacity: 0.8,
  },
}
