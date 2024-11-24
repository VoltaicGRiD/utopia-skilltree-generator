import { useEffect, useState } from 'react';
import styles from './chevron.module.css';

interface ChevronProps {
  position: number;
  scale: number;
}

export function Chevron({ position, scale }: ChevronProps) {
  const [textSize, setTextSize] = useState(0.72);
  const [showMenu, setShowMenu] = useState(false);

  const [fill, setFill] = useState('url(#myGradient)');

  const [color1, setColor1] = useState('#474747');
  const [color2, setColor2] = useState('#555555');

  const [stop1, setStop1] = useState(0);
  const [stop2, setStop2] = useState(100);

  const [descriptionTop, setDescriptionTop] = useState(46);

  function updateTextSize(event: React.ChangeEvent<HTMLInputElement>): void {
    const newSize = Number(event.target.value);
    setTextSize(newSize);
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--text-size', `${textSize}rem`);
  }
  
  const marginTop = -30;

  let imageBottom = 0;
  let bodySoulBottom = 0;
  let mindBottom = 0;
  switch (scale) {
    case 3:
      imageBottom = -20;
      bodySoulBottom = 3;
      mindBottom = -2.5;
      break;
    case 4:
      imageBottom = -25;
      bodySoulBottom = -1;
      mindBottom = -7;
      break;
    case 5:
      imageBottom = -30;
      bodySoulBottom = -6;
      mindBottom = -12;
      break;
  }

  const height = (700 + (26 * scale)) / scale;
  const zIndex = 100 - position;

  let display = 'block';
  if ((position) > scale) {
    display = 'none';
  }

  function updateDescriptionTop(event: React.ChangeEvent<HTMLInputElement>): void {
    const newTop = Number(event.target.value);
    setDescriptionTop(newTop);
  }

  function updateColorOne(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-${position})`);
    const newColor = event.target.value;
    setColor1(newColor);
  }

  function updateStopOne(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-${position})`);
    const newStop = Number(event.target.value);
    setStop1(newStop);
  }

  function updateColorTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-${position})`);
    const newColor = event.target.value;
    setColor2(newColor);
  }

  function updateStopTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-${position})`);
    const newStop = Number(event.target.value);
    setStop2(newStop);
  }

  function reset(): void {
    setFill('url(#myGradient)');
  }

  useEffect(() => {
    document.querySelector(`#inner-gradient-${position}`)?.setAttribute('value', color1);
    document.querySelector(`#outer-gradient-${position}`)?.setAttribute('value', color2);
    document.querySelector(`#inner-position-${position}`)?.setAttribute('value', stop1.toString());
    document.querySelector(`#outer-position-${position}`)?.setAttribute('value', stop2.toString());
  }, []);

  return (
    <div className={styles['chevron-container']} onMouseEnter={() => {setShowMenu(true)}} onMouseLeave={() => {setShowMenu(false)}} style={{display: display}}>

      <div className={styles['chevron-svg']} style={{marginTop: `${marginTop}px`, height: `${height}px`, zIndex: zIndex}}>
        <svg className={styles.chevron} id="chevron" viewBox="0 0 159 173" preserveAspectRatio='none'>
          <defs>
            <radialGradient className='radial' id={`myGradient-${position}`}>
              <stop className="chevron-radial-1" offset={`${stop1}%`} stopColor={color1} />
              <stop className="chevron-radial-2" offset={`${stop2}%`} stopColor={color2} />
            </radialGradient>
          </defs>
          <polyline fill={fill} points="159 1 159 154 79 172 0 154 0 1 159 1"/>
          <clipPath id="chevronClip">
            <polyline points="159 1 159 154 79 172 0 154 0 1 159 1"/>
          </clipPath>
        </svg>
      </div>
      <div className={styles['chevron-controls']}>
        <textarea className={styles.title}></textarea>
        <img src="points.png" alt="points" className={styles['points-img']} style={{bottom: imageBottom, height: 104}} />
        <textarea className={styles.skillbody} style={{fontSize: `${textSize}em`, top: `${descriptionTop}%`}}></textarea>
        <input className={styles.body} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{bottom: bodySoulBottom}}/>
        <input className={styles.mind} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{bottom: mindBottom}}/>
        <input className={styles.soul} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{bottom: bodySoulBottom}}/>
      </div>

      <div className={styles['chevron-extras']} style={{display: showMenu ? "flex" : "none", top: marginTop}}>
        <div className={styles['control-label']}>
          <label htmlFor="text-size">Font Size: {textSize}em (Default: 0.72em)</label>
          <input id="text-size" name="text-size" step={0.01} min={0.3} max={2} type="range" onChange={updateTextSize} />
        </div>
        <div className={styles['control-label']}>
          <label htmlFor={`description-top-${position}`}>Description Position: {descriptionTop}% (Default: 46%)</label>
          <input id={`description-top-${position}`} name={`description-top-${position}`} step={0.1} min={0} max={100} type="range" onChange={updateDescriptionTop}/>
        </div>
        <div className={styles['control-label']}>
          <label htmlFor={`inner-gradient-${position}`}>Inner Gradient</label>
          <input id={`inner-gradient-${position}`} name={`inner-gradient-${position}`} type="color" onChange={updateColorOne} />
        </div>
        <div className={styles['control-label']}>
          <label htmlFor={`inner-position-${position}`}>Inner Gradient Position</label>
          <input id={`inner-position-${position}`} name={`inner-position-${position}`} type="number" onChange={updateStopOne} placeholder="10"/>
        </div>
        <div className={styles['control-label']}>
          <label htmlFor={`outer-gradient-${position}`}>Outer Gradient</label>
          <input id={`outer-gradient-${position}`} name={`outer-gradient-${position}`} type="color" onChange={updateColorTwo}/>
        </div>
        <div className={styles['control-label']}>
          <label htmlFor={`outer-position-${position}`}>Outer Gradient Position</label>
          <input id={`outer-position-${position}`} name={`outer-position-${position}`} type="number" onChange={updateStopTwo} placeholder="95"/>
        </div>
        <button onClick={reset}>Reset Gradients</button>
      </div>

    </div>
  )
}

interface ParentChevronProps {
  scale: number;
}

export function ParentChevron({ scale }: ParentChevronProps) {
  const [textSize, setTextSize] = useState(0.72);
  const [showMenu, setShowMenu] = useState(false);

  const [fill, setFill] = useState('url(#myGradient)');

  const [color1, setColor1] = useState('#474747');
  const [color2, setColor2] = useState('#555555');

  const [stop1, setStop1] = useState(0);
  const [stop2, setStop2] = useState(100);

  const [descriptionTop, setDescriptionTop] = useState(46);

  function updateTextSize(event: React.ChangeEvent<HTMLInputElement>): void {
    const newSize = Number(event.target.value);
    setTextSize(newSize);
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--text-size', `${textSize}rem`);
  }

  const height = (700 + (26 * scale)) / scale;

  let imageBottom = 0;
  let bodySoulBottom = 0;
  let mindBottom = 0;
  switch (scale) {
    case 3:
      imageBottom = -20;
      bodySoulBottom = 2;
      mindBottom = -2.5;
      break;
    case 4:
      imageBottom = -25;
      bodySoulBottom = -1;
      mindBottom = -7;
      break;
    case 5:
      imageBottom = -30;
      bodySoulBottom = -6;
      mindBottom = -12;
      break;
  }

  function updateDescriptionTop(event: React.ChangeEvent<HTMLInputElement>): void {
    const newTop = Number(event.target.value);
    setDescriptionTop(newTop);
  }

  function updateColorOne(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-parent)`);
    const newColor = event.target.value;
    setColor1(newColor);
  }

  function updateStopOne(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-parent)`);
    const newStop = Number(event.target.value);
    setStop1(newStop);
  }

  function updateColorTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-parent)`);
    const newColor = event.target.value;
    setColor2(newColor);
  }

  function updateStopTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-parent)`);
    const newStop = Number(event.target.value);
    setStop2(newStop);
  }

  function reset(): void {
    setFill('url(#myGradient)');
  }

  useEffect(() => {
    document.querySelector(`#inner-gradient-parent`)?.setAttribute('value', color1);
    document.querySelector(`#outer-gradient-parent`)?.setAttribute('value', color2);
    document.querySelector(`#inner-position-parent`)?.setAttribute('value', stop1.toString());
    document.querySelector(`#outer-position-parent`)?.setAttribute('value', stop2.toString());
  }, []);


  return (
    <div className={styles['chevron-container']} onMouseEnter={() => {setShowMenu(true)}} onMouseLeave={() => {setShowMenu(false)}}>

      <div className={styles['chevron-svg']} style={{height: `${height}px`, zIndex: 100}}>
        <svg className={styles.chevron} id="chevron" viewBox="0 0 159 173" preserveAspectRatio='none'>
          <defs>
            <radialGradient className='radial' id={`myGradient-parent`}>
              <stop className="chevron-radial-1" offset={`${stop1}%`} stopColor={color1} />
              <stop className="chevron-radial-2" offset={`${stop2}%`} stopColor={color2} />
            </radialGradient>
          </defs>
          <polyline fill={fill} points="159 1 159 154 79 172 0 154 0 1 159 1"/>
          <clipPath id="chevronClip">
            <polyline points="159 1 159 154 79 172 0 154 0 1 159 1"/>
          </clipPath>
        </svg>
      </div>
      <div className={styles['parent-chevron-controls']}>
        <textarea className={styles.title} placeholder='Epic Talent' ></textarea>
        <img src="points.png" alt="points" className={styles['points-img']} style={{bottom: imageBottom, height: 104}} />
        <textarea className={styles.skillbody} style={{fontSize: `${textSize}em`, top: `${descriptionTop}%`}} placeholder="Some awesome, incredible, homebrew'd talent" ></textarea>
        <input className={styles.body} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{ bottom: bodySoulBottom}}/>
        <input className={styles.mind} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{ bottom: mindBottom}}/>
        <input className={styles.soul} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{ bottom: bodySoulBottom}}/>
      </div>

      <div className={styles['chevron-extras']} style={{display: showMenu ? "flex" : "none"}}>
        <div className={styles['control-label']}>
          <label htmlFor="text-size">Font Size: {textSize}em (Default: 0.72em)</label>
          <input id="text-size" name="text-size" step={0.01} min={0.3} max={2} type="range" onChange={updateTextSize} />
        </div>
        <div className={styles['control-label']}>
          <label htmlFor="description-top-parent">Description Position: {descriptionTop}% (Default: 46%)</label>
          <input id="description-top-parent" name="description-top-parent" step={0.1} min={0} max={100} type="range" onChange={updateDescriptionTop}/>
        </div>
        <div className={styles['control-label']}>
          <label htmlFor="inner-gradient-parent">Inner Gradient</label>
          <input id="inner-gradient-parent" name="inner-gradient-parent" type="color" onChange={updateColorOne} />
        </div>
        <div className={styles['control-label']}>
          <label htmlFor="inner-position-parent">Inner Gradient Position</label>
          <input id="inner-position-parent" name="inner-position-parent" type="number" onChange={updateStopOne} placeholder="10"/>
        </div>
        <div className={styles['control-label']}>
          <label htmlFor="outer-gradient-parent">Outer Gradient</label>
          <input id="outer-gradient-parent" name="outer-gradient-parent" type="color" onChange={updateColorTwo}/>
        </div>
        <div className={styles['control-label']}>
          <label htmlFor="outer-position-parent">Outer Gradient Position</label>
          <input id="outer-position-parent" name="outer-position-parent" type="number" onChange={updateStopTwo} placeholder="95"/>
        </div>
        <button onClick={reset}>Reset Gradients</button>
      </div>

    </div>
  );
}