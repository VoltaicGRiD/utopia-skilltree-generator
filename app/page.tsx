'use client';

import styles from "./page.module.css";
import { ParentChevron, Chevron } from "./components/chevron";
import { useState, useRef, useEffect } from "react";
import domtoimage from 'dom-to-image-more';

export default function Home() {
  const divRef = useRef<HTMLDivElement>(null);

  // This state variable is used for the scale of the tree
  const [columnOneScale, setColumnOneScale] = useState(3);
  const [columnTwoScale, setColumnTwoScale] = useState(3);
  const [columnThreeScale, setColumnThreeScale] = useState(3);

  // These state variables are used for the gradient colors
  const [color1, setColor1] = useState('#474747');
  const [color2, setColor2] = useState('#555555');

  // Add state variables for text colors
  const [textColor] = useState('#ffffff');
  const [pointColor] = useState('#ffffff');
  const [shadowColor] = useState('#000000');

  // Add state variables for gradient stops
  const [stop1, setStop1] = useState(0);
  const [stop2, setStop2] = useState(100);

  const handleExport = async (file: boolean) => {
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
    const _ = domtoimage.toPng(node, { scale: 5 }).then((dataUrl) => {
      return;
    });

    domtoimage.toPng(node, { scale: 5 })
      .then((dataUrl) => {
        // Revert spans back to inputs
        const spans = node.querySelectorAll('span');
        spans.forEach((span, index) => {
          if (span.parentNode) {
            span.parentNode.replaceChild(inputs[index], span);
          }
        });

        if (file) {
          const link = document.createElement('a');
          link.download = 'exported-image.png';
          link.href = dataUrl;
          link.click();
        }
      })
      .catch((error) => {
        console.error('Failed to export image:', error);
      });
  };

  useEffect(() => {
    handleExport(false);
  }, []);

  function updateTextColor(event: React.ChangeEvent<HTMLInputElement>): void {
    const newColor = event.target.value;
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--text-color', newColor);
  }

  function updatePointColor(event: React.ChangeEvent<HTMLInputElement>): void {
    const newColor = event.target.value;
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--point-color', newColor);
  }

  function updateShadowColor(event: React.ChangeEvent<HTMLInputElement>): void {
    const newColor = event.target.value;
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--text-shadow', newColor);
  }

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
    document.querySelector('#text-color')?.setAttribute('value', textColor);
    document.querySelector('#point-color')?.setAttribute('value', pointColor);
    document.querySelector('#text-shadow-color')?.setAttribute('value', shadowColor);
    document.querySelector('#inner-gradient')?.setAttribute('value', color1);
    document.querySelector('#outer-gradient')?.setAttribute('value', color2);
    document.querySelector('#inner-position')?.setAttribute('value', stop1.toString());
    document.querySelector('#outer-position')?.setAttribute('value', stop2.toString());
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles['control-row']}>
          <div className={styles['tier-controls']}>
            <h3>Column 1 Size</h3>
            <input type="range" min="3" max="5" value={columnOneScale} onChange={(event) => setColumnOneScale(Number(event.target.value))} />
          </div>
          <div className={styles['tier-controls']}>
            <h3>Column 2 Size</h3>
            <input type="range" min="3" max="5" value={columnTwoScale} onChange={(event) => setColumnTwoScale(Number(event.target.value))} />
          </div>
          <div className={styles['tier-controls']}>
            <h3>Column 3 Size</h3>
            <input type="range" min="3" max="5" value={columnThreeScale} onChange={(event) => setColumnThreeScale(Number(event.target.value))} />
          </div>
          <div className={styles.controls}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.trees} ref={divRef}>
            <div className={styles.treehome}>
              <svg style={{ position: 'absolute', left: 0, top: 0 }}>
                <defs>
                  <radialGradient id="myGradient">
                    <stop className="chevron-radial-1" offset={`${stop1}%`} stopColor={color1} />
                    <stop className="chevron-radial-2" offset={`${stop2}%`} stopColor={color2} />
                  </radialGradient>
                </defs>
              </svg>

              <ParentChevron scale={columnOneScale} />
              <Chevron position={2} scale={columnOneScale} />
              <Chevron position={3} scale={columnOneScale} />
              <Chevron position={4} scale={columnOneScale} />
              <Chevron position={5} scale={columnOneScale} />

            </div>

            <div className={styles.treehome}>
              <svg style={{ position: 'absolute', left: 0, top: 0 }}>
                <defs>
                  <radialGradient id="myGradient">
                    <stop className="chevron-radial-1" offset={`${stop1}%`} stopColor={color1} />
                    <stop className="chevron-radial-2" offset={`${stop2}%`} stopColor={color2} />
                  </radialGradient>
                </defs>
              </svg>

              <ParentChevron scale={columnTwoScale} />
              <Chevron position={2} scale={columnTwoScale} />
              <Chevron position={3} scale={columnTwoScale} />
              <Chevron position={4} scale={columnTwoScale} />
              <Chevron position={5} scale={columnTwoScale} />

            </div>

            <div className={styles.treehome}>
              <svg style={{ position: 'absolute', left: 0, top: 0 }}>
                <defs>
                  <radialGradient id="myGradient">
                    <stop className="chevron-radial-1" offset={`${stop1}%`} stopColor={color1} />
                    <stop className="chevron-radial-2" offset={`${stop2}%`} stopColor={color2} />
                  </radialGradient>
                </defs>
              </svg>

              <ParentChevron scale={columnThreeScale} />
              <Chevron position={2} scale={columnThreeScale} />
              <Chevron position={3} scale={columnThreeScale} />
              <Chevron position={4} scale={columnThreeScale} />
              <Chevron position={5} scale={columnThreeScale} />

            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles['control-label']}>
              <label htmlFor="text-color">Text Color</label>
              <input id="text-color" name="text-color" type="color" onChange={updateTextColor} />
            </div>
            <div className={styles['control-label']}>
              <label htmlFor="point-color">Point Number Text Color</label>
              <input id="point-color" name="point-color" type="color" onChange={updatePointColor} />
            </div>
            <div className={styles['control-label']}>
              <label htmlFor="point-shadow">Point Number Shadow Color</label>
              <input id="point-shadow" name="point-shadow" type="color" onChange={updateShadowColor} />
            </div>
            <hr />
            <h3>Changing these settings<br /> overrides individual changes</h3>
            <div className={styles['control-label']}>
              <label htmlFor="inner-gradient">Inner Gradient</label>
              <input id="inner-gradient" name="inner-gradient" type="color" onChange={updateColorOne} />
            </div>
            <div className={styles['control-label']}>
              <label htmlFor="inner-position">Inner Gradient Position</label>
              <input id="inner-position" name="inner-position" type="number" onChange={updateStopOne} placeholder="10" />
            </div>
            <div className={styles['control-label']}>
              <label htmlFor="outer-gradient">Outer Gradient</label>
              <input id="outer-gradient" name="outer-gradient" type="color" onChange={updateColorTwo} />
            </div>
            <div className={styles['control-label']}>
              <label htmlFor="outer-position">Outer Gradient Position</label>
              <input id="outer-position" name="outer-position" type="number" onChange={updateStopTwo} placeholder="95" />
            </div>
            <hr />
            <div className={styles['control-label']}>
              <button className={styles.control} onClick={() => handleExport(true)}>Export Image</button>
            </div>
          </div>
        </div>

      </main>
      {/* <footer className={styles.footer}>
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
      </footer> */}
    </div>
  );
}