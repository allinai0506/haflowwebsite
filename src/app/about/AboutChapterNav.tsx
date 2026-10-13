"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./about.module.css";

type Chapter = { id: string; label: string };

export function AboutChapterNav({ chapters }: { chapters: readonly Chapter[] }) {
  const [active, setActive] = useState(chapters[0].id);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 72;
      const marker = headerHeight + (navRef.current?.offsetHeight ?? 56) + 32;
      let current = chapters[0].id;
      for (const chapter of chapters) {
        const section = document.getElementById(chapter.id);
        if (section && section.getBoundingClientRect().top <= marker) current = chapter.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [chapters]);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!list || !link) return;
    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    if (linkBox.left < listBox.left || linkBox.right > listBox.right) {
      list.scrollTo({ left: list.scrollLeft + linkBox.left - listBox.left - (list.clientWidth - linkBox.width) / 2, behavior: "auto" });
    }
  }, [active]);

  return (
    <nav ref={navRef} aria-label="关于我们页内导航" data-about-nav="sticky" className={styles.chapterNav}>
      <div ref={listRef} className={styles.chapterList}>
        {chapters.map((chapter, i) => (
          <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? "location" : undefined} className={styles.chapterLink}>
            <span className={styles.chapterNumber}>0{i + 1}</span>
            {chapter.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
