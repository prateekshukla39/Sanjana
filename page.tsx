"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Heart, Music2, Volume2, VolumeX, Sparkles } from "lucide-react";

const slides = [
  { tag: "A LITTLE SOMETHING FOR YOU", title: <>Hey, <i>Tutu.</i></>, body: "I made this little world just for you. Tap through, okay? ♡", kind: "cover" },
  { tag: "MY FAVOURITE PERSON", title: <>It's always<br/><i>you.</i></>, body: "Out of all the people in the world, I'm so glad I found you.", kind: "portrait" },
  { tag: "A MOMENT I KEEP", title: <>Look at<br/><i>us.</i></>, body: "Some of my favourite memories are the ones where I'm next to you.", kind: "couple" },
  { tag: "A LITTLE REMINDER", title: <>You're my<br/><i>happy place.</i></>, body: "Even an ordinary day feels better when you're part of it.", kind: "portrait2" },
  { tag: "FROM MY HEART", title: <>I'm so lucky<br/><i>it's you.</i></>, body: "You're everything to me, Sanjana. I'm genuinely blessed to have you.", kind: "together" },
  { tag: "ONE LAST THING…", title: <>I love you,<br/><i>Tutu.</i></>, body: "More than I say, and in more ways than this little page can show. Always. ♡", kind: "final" },
];

const photos = [
  { src: "/photos/memory-1.jpeg", alt: "A festive memory together", cls: "photoOne" },
  { src: "/photos/memory-2.jpeg", alt: "Sanjana smiling", cls: "photoTwo" },
  { src: "/photos/memory-3.jpeg", alt: "A sweet moment together", cls: "photoThree" },
  { src: "/photos/memory-4.jpeg", alt: "A photo together", cls: "photoFour" },
];

export default function Home() {
  const [page, setPage] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Browsers block audible autoplay until a user gesture. Start looping music
    // on the first tap anywhere, then keep it playing across all page transitions.
    const startOnGesture = () => {
      const audio = audioRef.current;
      if (audio && !musicOn) {
        audio.volume = 0.28;
        void audio.play().then(() => setMusicOn(true)).catch(() => {});
      }
    };
    window.addEventListener("pointerdown", startOnGesture, { once: true });
    return () => window.removeEventListener("pointerdown", startOnGesture);
  }, [musicOn]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      audio.volume = 0.28;
      try { await audio.play(); setMusicOn(true); } catch { setMusicOn(false); }
    }
  };

  const next = () => { setSecretOpen(false); setPage((p) => Math.min(slides.length - 1, p + 1)); };
  const prev = () => { setSecretOpen(false); setPage((p) => Math.max(0, p - 1)); };
  const current = slides[page];

  return (
    <main className="stage">
      <audio ref={audioRef} src="/love-theme.wav" loop preload="auto" />
      <div className="grain" aria-hidden="true" />
      <div className="ambient ambientA" /><div className="ambient ambientB" />
      <header className="topbar">
        <div className="brand"><Heart size={15} fill="currentColor" /> FOR TUTU</div>
        <div className="counter">{String(page + 1).padStart(2, "0")} <span>/</span> {String(slides.length).padStart(2, "0")}</div>
        <button className="musicToggle" onClick={toggleMusic} aria-label={musicOn ? "Pause background music" : "Play background music"}>
          {musicOn ? <Volume2 size={17}/> : <Music2 size={17}/>} <span>{musicOn ? "SOUND ON" : "PLAY MUSIC"}</span>
        </button>
      </header>

      <div className="progress" aria-hidden="true"><motion.div animate={{ width: `${((page + 1) / slides.length) * 100}%` }} transition={{ duration: .45 }} /></div>

      <div className="content">
        <AnimatePresence mode="wait">
          <motion.section key={page} className={`slide ${current.kind}`} initial={{ opacity: 0, y: 22, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: .99 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}>
            <div className="copy">
              <div className="eyebrow"><span />{current.tag}</div>
              <h1>{current.title}</h1>
              <p>{current.body}</p>
              {page === 0 && <div className="tiny-note"><Sparkles size={14}/> MADE WITH LOVE, JUST FOR YOU</div>}
              {page === 4 && <button className="secretLink" onClick={() => setSecretOpen(!secretOpen)}>{secretOpen ? "Close our little secret" : "Psst… one little secret"} <ArrowRight size={14}/></button>}
              {page === 4 && <AnimatePresence>{secretOpen && <motion.div className="secret" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>You don't have to do anything special to be important to me. Just being you is enough, Tutu. <Heart size={13} fill="currentColor"/></motion.div>}</AnimatePresence>}
              {page === 5 && <div className="endmark"><Heart size={19} fill="currentColor"/><span>∞</span><Heart size={19} fill="currentColor"/></div>}
            </div>
            <div className={`visual ${current.kind}`}>
              {page === 0 ? <div className="coverArt"><div className="orbit orbit1"/><div className="orbit orbit2"/><div className="heartShape"><Heart size={70} strokeWidth={1} fill="currentColor"/></div><span className="scribble s1">for you</span><span className="scribble s2">♡ always</span><span className="star star1">✳</span><span className="star star2">✧</span></div> :
              page === 1 ? <div className="photoFrame p2"><Image src={photos[1].src} alt={photos[1].alt} fill sizes="(max-width: 700px) 70vw, 340px" priority/><span className="photoLabel">that smile ♡</span></div> :
              page === 2 ? <div className="collage"><div className="photoFrame mainPhoto"><Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 700px) 70vw, 340px" priority/></div><div className="photoFrame miniPhoto"><Image src={photos[2].src} alt={photos[2].alt} fill sizes="160px"/></div><span className="collageStamp">US<br/>♡</span></div> :
              page === 3 ? <div className="photoFrame p3"><Image src={photos[2].src} alt={photos[2].alt} fill sizes="(max-width: 700px) 70vw, 340px"/><span className="photoLabel">my happy place</span></div> :
              page === 4 ? <div className="photoFrame p4"><Image src={photos[3].src} alt={photos[3].alt} fill sizes="(max-width: 700px) 70vw, 340px"/><span className="photoLabel">my person, always</span></div> :
              <div className="finalArt"><div className="finalPhoto"><Image src={photos[0].src} alt={photos[0].alt} fill sizes="180px"/></div><Heart size={52} fill="currentColor" strokeWidth={1}/><div className="sparkles">✦　✧　✦</div><span>with all my heart</span></div>}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>

      <footer className="controls">
        <button className="navBtn back" onClick={prev} disabled={page === 0}><ArrowLeft size={16}/><span>BACK</span></button>
        <div className="dots">{slides.map((s, i) => <button key={s.kind} aria-label={`Go to page ${i + 1}`} onClick={() => {setSecretOpen(false);setPage(i);}} className={i === page ? "dot active" : "dot"}/>)}</div>
        <button className="navBtn next" onClick={page === slides.length - 1 ? () => {setPage(0);setSecretOpen(false);} : next}><span>{page === slides.length - 1 ? "AGAIN" : "NEXT"}</span>{page === slides.length - 1 ? <Heart size={15}/> : <ArrowRight size={16}/>}</button>
      </footer>
      <div className="footnote">A LITTLE PAGE, WITH A LOT OF LOVE <span>♡</span></div>
    </main>
  );
}
