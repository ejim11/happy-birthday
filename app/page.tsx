"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const memories = [
  {
    image: "/images/01-look-1.jpeg",
    text: "You didn’t just grow a year older… you somehow got even more beautiful. I’m still trying to understand how that’s fair.",
  },
  {
    image: "/images/02-dinner-red.jpeg",
    text: "Every picture of you feels like proof that God took His time with you.",
  },
  {
    image: "/images/03-snow.jpeg",
    text: "If I had to choose a favorite version of you, I’d fail… because you outdo yourself every single time.",
  },
  {
    image: "/images/04-dinner-black.jpeg",
    text: "You make looking this good seem effortless, but I know it’s just you being naturally you.",
  },
  {
    image: "/images/05-mirror-black.jpeg",
    text: "Some people take pictures… you create moments people wish they were in.",
  },
  {
    image: "/images/06-leather.jpeg",
    text: "I hope you see what I see when I look at you — because it’s honestly something special.",
  },
  {
    image: "/images/07-beach.jpeg",
    text: "You’re not just beautiful, you’re the kind of beautiful that makes people pause.",
  },
  {
    image: "/images/08-green-yellow.jpeg",
    text: "This smile right here? Yeah… this is my favorite place.",
  },
  {
    image: "/images/09-closeup-smile.jpeg",
    text: "You carry yourself like someone who knows her worth — and I love that about you.",
  },
  {
    image: "/images/10-closeup-black.jpeg",
    text: "If this is you now, I can’t wait to see how even more amazing you become.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    };

    void tryAutoplay();

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
    window.addEventListener("scroll", startOnFirstInteraction, onceOptions);
    window.addEventListener("keydown", startOnFirstInteraction, onceOptions);

    return () => {
      window.removeEventListener("click", startOnFirstInteraction);
      window.removeEventListener("touchstart", startOnFirstInteraction);
      window.removeEventListener("scroll", startOnFirstInteraction);
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
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const yearLabel = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="page-shell">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      <audio ref={audioRef} loop preload="auto">
        <source
          src="/music/happy-birthday-simi-adekunle.mp3"
          type="audio/mpeg"
        />
      </audio>

      <button
        className="music-button"
        onClick={toggleAudio}
        aria-label="Toggle music playback"
      >
        <span>{isPlaying ? "Now playing" : "Tap to play"}</span>
        <strong>Happy Birthday — Simi & Adekunle</strong>
      </button>

      <motion.section
        className="hero"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div className="hero-copy" variants={fadeUp}>
          <p className="eyebrow">for Naawal Farah</p>
          <h1>Happy 30th Birthday, Naawal.</h1>

          <p className="lead">
            It’s your 30th, so I figured… normal birthday messages just wouldn’t
            cut it. So yeah, I made you a whole little website — because
            clearly, you’re not a “just send a text” kind of person 😌
          </p>

          <p className="lead muted">
            This is for your smiles, your moments, your beauty, and all the
            little things that make you <em>you</em> (and make the rest of us
            look like we need to step our game up).
          </p>

          <p className="lead muted">
            Enjoy your special corner of the internet — carefully curated by me,
            because nothing about you deserves low effort.
          </p>

          <p className="signoff">Happy birthday, you absolute problem 😏🎉</p>

          {autoplayBlocked && (
            <p className="audio-note">
              Your browser blocked autoplay with sound — tap, scroll, or use the
              music button and it’ll start.
            </p>
          )}
        </motion.div>

        <motion.div className="hero-card" variants={imageReveal}>
          <div className="poster-wrap">
            <Image
              src="/images/00-book.jpeg"
              alt="Birthday poster"
              fill
              priority
              className="poster"
              sizes="(max-width: 900px) 100vw, 40vw"
            />
            <div className="image-shine" />
          </div>
        </motion.div>
      </motion.section>

      <section className="timeline">
        {memories.map((memory, index) => (
          <motion.article
            className="memory-card"
            key={memory.image}
            variants={{
              hidden: { opacity: 0, y: 60 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              className="memory-image-wrap"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={memory.image}
                alt={`Naawal birthday memory ${index + 1}`}
                fill
                className="memory-image"
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className="image-shine" />
            </motion.div>

            <motion.div
              className="memory-copy"
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            >
              <p className="memory-number">0{index + 1}</p>
              <p>{memory.text}</p>
            </motion.div>
          </motion.article>
        ))}
      </section>

      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>
          Made for Naawal Farah, with love, style, and a little unnecessary
          effort — exactly how it should be.
        </p>
        <p className="footer-small">
          {yearLabel} · happybirthdaynaawal.com vibe
        </p>
      </motion.footer>
    </main>
  );
}
