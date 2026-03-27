"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import book00 from "../assets/images/00-book.jpeg";
import book01 from "../assets/images/01-look-1.jpeg";
import book02 from "../assets/images/02-dinner-red.jpeg";
import book03 from "../assets/images/03-snow.jpeg";
import book04 from "../assets/images/04-dinner-black.jpeg";
import book05 from "../assets/images/05-mirror-black.jpeg";
import book06 from "../assets/images/06-leather.jpeg";
import book07 from "../assets/images/07-beach.jpeg";
import book08 from "../assets/images/08-green-yellow.jpeg";
import book09 from "../assets/images/09-closeup-smile.jpeg";
import book10 from "../assets/images/10-closeup-black.jpeg";

type Memory = {
  image: StaticImageData;
  text: string;
  label: string;
  title?: string;
};

const SLIDE_DURATION = 8500;
const TEXT_TYPING_SPEED = 10;

const memories: Memory[] = [
  {
    image: book00,
    label: "OPENING NOTE",
    title: "Happy 30th Birthday, Naawal",
    text: `It’s your 30th, so I figured… normal birthday messages just wouldn’t cut it. So yeah, I made you a whole little website — because clearly, you’re not a “just send a text” kind of person 😌

This is for your smiles, your moments, your beauty, and all the little things that make you you (and make the rest of us look like we need to step our game up).

Enjoy your special corner of the internet — carefully curated by me, because nothing about you deserves low effort.

Happy birthday, you absolute problem 😏🎉`,
  },
  {
    image: book01,
    label: "01",
    text: "You didn’t just grow a year older… you somehow got even more beautiful. I’m still trying to understand how that’s fair.",
  },
  {
    image: book02,
    label: "02",
    text: "Every picture of you feels like proof that God took His time with you.",
  },
  {
    image: book03,
    label: "03",
    text: "If I had to choose a favorite version of you, I’d fail… because you outdo yourself every single time.",
  },
  {
    image: book04,
    label: "04",
    text: "You make looking this good seem effortless, but I know it’s just you being naturally you.",
  },
  {
    image: book05,
    label: "05",
    text: "Some people take pictures… you create moments people wish they were in.",
  },
  {
    image: book06,
    label: "06",
    text: "I hope you see what I see when I look at you — because it’s honestly something special.",
  },
  {
    image: book07,
    label: "07",
    text: "You’re not just beautiful, you’re the kind of beautiful that makes people pause.",
  },
  {
    image: book08,
    label: "08",
    text: "This smile right here? Yeah… this is my favorite place.",
  },
  {
    image: book09,
    label: "09",
    text: "You carry yourself like someone who knows her worth — and I love that about you.",
  },
  {
    image: book10,
    label: "10",
    text: "If this is you now, I can’t wait to see how even more amazing you become.",
  },
];

function useTypedText(
  text: string,
  active: boolean,
  speed = TEXT_TYPING_SPEED,
) {
  const [displayed, setDisplayed] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }

    setDisplayed("");
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, active, speed]);

  return displayed;
}

function SlideText({
  memory,
  index,
  total,
  active,
}: {
  memory: Memory;
  index: number;
  total: number;
  active: boolean;
}) {
  const typedText = useTypedText(memory.text, active);

  return (
    <motion.div
      className="cinema-content"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="cinema-kicker">
        {memory.label} <span>•</span> {String(index + 1).padStart(2, "0")}/
        {String(total).padStart(2, "0")}
      </p>

      {memory.title ? <h1>{memory.title}</h1> : null}

      <p className={memory.title ? "cinema-text opening-text" : "cinema-text"}>
        {typedText}
        <span className="typing-caret" aria-hidden="true">
          |
        </span>
      </p>
    </motion.div>
  );
}

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);

  useEffect(() => {
    if (pausedByUser) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(interval);
  }, [pausedByUser]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.72;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    };

    void tryPlay();

    const startOnFirstInteraction = async () => {
      if (!audio.paused) return;

      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setIsPlaying(false);
      }
    };

    const onceOptions = { once: true } as AddEventListenerOptions;
    window.addEventListener("click", startOnFirstInteraction, onceOptions);
    window.addEventListener("touchstart", startOnFirstInteraction, onceOptions);
    window.addEventListener("keydown", startOnFirstInteraction, onceOptions);

    return () => {
      window.removeEventListener("click", startOnFirstInteraction);
      window.removeEventListener("touchstart", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const goNext = () => {
    setPausedByUser(true);
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const goPrev = () => {
    setPausedByUser(true);
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const toggleAutoPlaySlides = () => {
    setPausedByUser((prev) => !prev);
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  const currentMemory = memories[currentIndex];

  return (
    <main className="cinema-page">
      <audio ref={audioRef} loop preload="auto">
        <source
          src="/music/happy-birthday-simi-adekunle.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="cinema-topbar">
        <div className="topbar-left">
          <div className="brand-pill">for Naawal Farah ✨</div>
        </div>

        <div className="topbar-right">
          <button
            type="button"
            className="music-button"
            onClick={toggleAudio}
            aria-label="Toggle birthday music"
          >
            <span>{isPlaying ? "Now playing" : "Tap to play"}</span>
            <strong>Happy Birthday 🎵</strong>
          </button>
        </div>
      </div>

      {autoplayBlocked ? (
        <div className="autoplay-note">
          Your browser blocked autoplay with sound — tap anywhere or use the
          music button.
        </div>
      ) : null}

      <section className="cinema-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="cinema-image-layer"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={currentMemory.image}
              alt={`Naawal birthday photo ${currentIndex + 1}`}
              fill
              priority={currentIndex < 2}
              className="cinema-image"
              sizes="100vw"
            />
            <div className="cinema-overlay" />
          </motion.div>
        </AnimatePresence>

        <div className="cinema-shell">
          <AnimatePresence mode="wait">
            <SlideText
              key={`text-${currentIndex}`}
              memory={currentMemory}
              index={currentIndex}
              total={memories.length}
              active
            />
          </AnimatePresence>
        </div>

        <div className="cinema-controls">
          <button type="button" className="nav-button" onClick={goPrev}>
            ← Prev
          </button>

          <button
            type="button"
            className="nav-button nav-button--primary"
            onClick={toggleAutoPlaySlides}
          >
            {pausedByUser ? "Resume auto" : "Pause auto"}
          </button>

          <button type="button" className="nav-button" onClick={goNext}>
            Next →
          </button>
        </div>

        <div className="progress-wrap" aria-hidden="true">
          {memories.map((_, index) => (
            <span
              key={index}
              className={`progress-dot ${index === currentIndex ? "is-active" : ""}`}
            />
          ))}
        </div>
      </section>

      <footer className="end-cap">
        <p>Made with love, style, and exactly the right amount of extra.</p>
        <span>{year} · happybirthdaynaawal.com vibe</span>
      </footer>
    </main>
  );
}
