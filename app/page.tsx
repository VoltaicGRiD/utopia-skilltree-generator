'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { ParentChevron, Chevron } from "./components/chevron";
import { useState, useRef, useEffect } from "react";
import domtoimage from 'dom-to-image-more';

export default function Home() {
  const divRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(3);

  // Add state variables for gradient colors
  const [color1, setColor1] = useState('#474747');
  const [color2, setColor2] = useState('#555555');

  // Add state variables for gradient stops
  const [stop1, setStop1] = useState(0);
  const [stop2, setStop2] = useState(100);

  const handleExport = async () => {
    const node = divRef.current;
    if (!node) return;
    const inputs = node.querySelectorAll('input');

    // Replace inputs with spans
    inputs.forEach((input) => {
      const span = document.createElement('span');
      span.textContent = input.value;
      span.setAttribute('style', input.getAttribute('style') || '');
      span.className = input.className;
      span.style.webkitTextStroke = '1px white;';
      span.style.fontWeight = 'bold';
      if (input.parentNode) {
        input.parentNode.replaceChild(span, input);
      }
    });

    // We discard this since the image needs to be processed twice to get the correct alignment of objects
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = domtoimage.toPng(node, { scale: 5 });

    domtoimage.toPng(node, { scale: 5 })
      .then((dataUrl) => {
        // Revert spans back to inputs
        const spans = node.querySelectorAll('span');
        spans.forEach((span, index) => {
          if (span.parentNode) {
            span.parentNode.replaceChild(inputs[index], span);
          }
        });

        const link = document.createElement('a');
        link.download = 'exported-image.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Failed to export image:', error);
      });
  };

  function updateColorOne(event: React.ChangeEvent<HTMLInputElement>): void {
    const newColor = event.target.value;
    setColor1(newColor);
  }

  function updateStopOne(event: React.ChangeEvent<HTMLInputElement>): void {
    const newStop = Number(event.target.value);
    setStop1(newStop);
  }

  function updateColorTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    const newColor = event.target.value;
    setColor2(newColor);
  }

  function updateStopTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    const newStop = Number(event.target.value);
    setStop2(newStop);
  }

  useEffect(() => {

  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles.controls}>
          <button className={styles.control} onClick={() => setScale(3)}>3 Tiers</button>
          <button className={styles.control} onClick={() => setScale(4)}>4 Tiers</button>
          <button className={styles.control} onClick={() => setScale(5)}>5 Tiers</button>
        </div>

        <div className={styles.treehome} ref={divRef}>
          <svg style={{position: 'absolute', left: 0, top: 0}}>
            <defs>
              <radialGradient id="myGradient">
                <stop className="chevron-radial-1" offset={`${stop1}%`} stopColor={color1} />
                <stop className="chevron-radial-2" offset={`${stop2}%`} stopColor={color2} />
              </radialGradient>
            </defs>
          </svg>
          <ParentChevron scale={scale}/>
          <Chevron position={2} scale={scale}/>
          <Chevron position={3} scale={scale}/>
          <Chevron position={4} scale={scale}/>
          <Chevron position={5} scale={scale}/>
        </div>

        <div className={styles.controls}>
          <div className={styles['control-label']}>
            <label htmlFor="inner-gradient">Inner Gradient</label>
            <input name="inner-gradient" type="color" onChange={updateColorOne}/>
          </div>
          <div className={styles['control-label']}>
            <label htmlFor="inner-position">Inner Gradient Position</label>
            <input name="inner-position" type="number" onChange={updateStopOne} placeholder="10"/>
          </div>
          <div className={styles['control-label']}>
            <label htmlFor="outer-gradient">Outer Gradient</label>
            <input name="outer-gradient" type="color" onChange={updateColorTwo}/>
          </div>
          <div className={styles['control-label']}>
            <label htmlFor="outer-position">Outer Gradient Position</label>
            <input name="outer-position" type="number" onChange={updateStopTwo} placeholder="95"/>
          </div>
          <div className={styles['control-label']}>
            <button className={styles.control} onClick={handleExport}>Export Image</button>
          </div>
        </div>

        {/* <div className={`${styles.treehome} ${styles.threetier}`}>
          <ParentChevron scale={3}/>
          <Chevron position={2} scale={3}/>
          <Chevron position={3} scale={3}/>
        </div>

        <div className={`${styles.treehome} ${styles.fourtier}`}>
          <ParentChevron scale={4}/>
          <Chevron position={2} scale={4}/>
          <Chevron position={3} scale={4}/>
          <Chevron position={4} scale={4}/>
        </div>

        <div className={`${styles.treehome} ${styles.fivetier}`}>
          <ParentChevron scale={5}/>
          <Chevron position={2} scale={5}/>
          <Chevron position={3} scale={5}/>
          <Chevron position={4} scale={5}/>
          <Chevron position={5} scale={5}/>
        </div> */}

      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );

}

