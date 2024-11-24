import { useEffect, useState } from 'react';
import styles from './chevron.module.css';

interface ChevronProps {
  position: number;
  scale: number;
  column: number;
}

export function Chevron({ position, scale, column }: ChevronProps) {
  const [textSize, setTextSize] = useState(0.88);
  const [showMenu, setShowMenu] = useState(false);

  const [fill, setFill] = useState('url(#myGradient)');

  const [color1, setColor1] = useState('#474747');
  const [color2, setColor2] = useState('#555555');

  const [stop1, setStop1] = useState(0);
  const [stop2, setStop2] = useState(100);

  const [descriptionTop, setDescriptionTop] = useState(50);

  function updateTextSize(event: React.ChangeEvent<HTMLInputElement>): void {
    const newSize = Number(event.target.value);
    setTextSize(newSize);
  }
  
  const marginTop = -30;

  let imageBottom = 0;
  let bodySoulBottom = 0;
  let mindBottom = 0;
  switch (scale) {
    case 3:
      imageBottom = -30;
      bodySoulBottom = 10;
      mindBottom = 5;
      break;
    case 4:
      imageBottom = -30;
      bodySoulBottom = 10;
      mindBottom = 5;
      break;
    case 5:
      imageBottom = -30;
      bodySoulBottom = 10;
      mindBottom = 5;
      break;
  }

  const height = (660 + (26 * scale)) / scale;
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
    setFill(`url(#myGradient-${position}-${column})`);
    const newColor = event.target.value;
    setColor1(newColor);
  }

  function updateStopOne(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-${position}-${column})`);
    const newStop = Number(event.target.value);
    setStop1(newStop);
  }

  function updateColorTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-${position}-${column})`);
    const newColor = event.target.value;
    setColor2(newColor);
  }

  function updateStopTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-${position}-${column})`);
    const newStop = Number(event.target.value);
    setStop2(newStop);
  }

  function reset(): void {
    setFill('url(#myGradient)');
  }

  useEffect(() => {
    document.querySelector(`#text-size-${position}-${column}`)?.setAttribute('value', textSize.toString());
    document.querySelector(`#description-top-${position}-${column}`)?.setAttribute('value', descriptionTop.toString());
    document.querySelector(`#inner-gradient-${position}-${column}`)?.setAttribute('value', color1);
    document.querySelector(`#outer-gradient-${position}-${column}`)?.setAttribute('value', color2);
    document.querySelector(`#inner-position-${position}-${column}`)?.setAttribute('value', stop1.toString());
    document.querySelector(`#outer-position-${position}-${column}`)?.setAttribute('value', stop2.toString());
  }, []);

  return (
    <div className={styles['chevron-container']} onMouseEnter={() => {setShowMenu(true)}} onMouseLeave={() => {setShowMenu(false)}} style={{display: display}}>

      <div className={styles['chevron-svg']} style={{marginTop: `${marginTop}px`, height: `${height}px`, zIndex: zIndex}}>
        <svg className={styles.chevron} id="chevron" viewBox="0 0 159 169" preserveAspectRatio='none'>
          <defs>
            <radialGradient className='radial' id={`myGradient-${position}-${column}`}>
              <stop className="chevron-radial-1" offset={`${stop1}%`} stopColor={color1} />
              <stop className="chevron-radial-2" offset={`${stop2}%`} stopColor={color2} />
            </radialGradient>
          </defs>
          <polyline fill={fill} points="159 1 159 153 79 168 0 153 0 1 159 1"/>
        </svg>
      </div>
      <div className={styles['chevron-controls']}>
        <textarea className={styles.title} style={{top: '2%'}}></textarea>
        <img src="points.png" alt="points" className={styles['points-img']} style={{bottom: imageBottom, height: 104}} />
        <textarea className={styles.skillbody} style={{fontSize: `${textSize}em`, top: `${descriptionTop}%`}}></textarea>
        <input className={styles.body} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{bottom: bodySoulBottom}}/>
        <input className={styles.mind} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{bottom: mindBottom}}/>
        <input className={styles.soul} type="number" maxLength={1} min="0" max="9" defaultValue="0" style={{bottom: bodySoulBottom}}/>
      </div>

      <div className={styles['chevron-extras']} style={{display: showMenu ? "flex" : "none", top: `${marginTop} - 20px`}}>
        <div className={styles['control-group']}>
          <div className={styles['control-label']}>
            <label htmlFor={`text-size-${position}-${column}`}>Font size: {textSize} [0.88]</label>
            <input id={`text-size-${position}-${column}`} name={`text-size-${position}-${column}`} step={0.01} min={0.3} max={2} placeholder='0.88' type="number" onChange={updateTextSize} />
          </div>
          <div className={styles['control-label']}>
            <label htmlFor={`description-top-${position}-${column}`}>Height: {descriptionTop}% [50%]</label>
            <input id={`description-top-${position}-${column}`} name={`description-top-${position}-${column}`} step={0.1} min={0} max={100} type="number" onChange={updateDescriptionTop}/>
          </div>
        </div>
        <div className={styles['control-group']}>
          <div className={styles['control-label']}>
            <label htmlFor={`inner-gradient-${position}-${column}`}>Inner gradient color</label>
            <input id={`inner-gradient-${position}-${column}`} name={`inner-gradient-${position}-${column}`} type="color" onChange={updateColorOne} />
          </div>
          <div className={styles['control-label']}>
            <label htmlFor={`inner-position-${position}-${column}`}>and position</label>
            <input id={`inner-position-${position}-${column}`} name={`inner-position-${position}-${column}`} type="number" onChange={updateStopOne} placeholder="10"/>
          </div>
        </div>
        <div className={styles['control-group']}>
          <div className={styles['control-label']}>
            <label htmlFor={`outer-gradient-${position}-${column}`}>Outer gradient color</label>
            <input id={`outer-gradient-${position}-${column}`} name={`outer-gradient-${position}-${column}`} type="color" onChange={updateColorTwo}/>
          </div>
          <div className={styles['control-label']}>
            <label htmlFor={`outer-position-${position}-${column}`}>and position</label>
            <input id={`outer-position-${position}-${column}`} name={`outer-position-${position}-${column}`} type="number" onChange={updateStopTwo} placeholder="95"/>
          </div>
        </div>
        <button onClick={reset}>Reset Gradients</button>
      </div>

    </div>
  )
}

interface ParentChevronProps {
  scale: number;
  column: number;
}

export function ParentChevron({ scale, column }: ParentChevronProps) {
  const [textSize, setTextSize] = useState(0.88);
  const [showMenu, setShowMenu] = useState(false);

  const [fill, setFill] = useState('url(#myGradient)');

  const [color1, setColor1] = useState('#474747');
  const [color2, setColor2] = useState('#555555');

  const [stop1, setStop1] = useState(0);
  const [stop2, setStop2] = useState(100);

  const [descriptionTop, setDescriptionTop] = useState(50);

  function updateTextSize(event: React.ChangeEvent<HTMLInputElement>): void {
    const newSize = Number(event.target.value);
    setTextSize(newSize);
  }

  const height = (660 + (26 * scale)) / scale;

  let imageBottom = 0;
  let bodySoulBottom = 0;
  let mindBottom = 0;
  switch (scale) {
    case 3:
      imageBottom = -30;
      bodySoulBottom = 10;
      mindBottom = 5;
      break;
    case 4:
      imageBottom = -30;
      bodySoulBottom = 10;
      mindBottom = 5;
      break;
    case 5:
      imageBottom = -30;
      bodySoulBottom = 10;
      mindBottom = 5;
      break;
  }

  function updateDescriptionTop(event: React.ChangeEvent<HTMLInputElement>): void {
    const newTop = Number(event.target.value);
    setDescriptionTop(newTop);
  }

  function updateColorOne(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-parent-${column})`);
    const newColor = event.target.value;
    setColor1(newColor);
  }

  function updateStopOne(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-parent-${column})`);
    const newStop = Number(event.target.value);
    setStop1(newStop);
  }

  function updateColorTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-parent-${column})`);
    const newColor = event.target.value;
    setColor2(newColor);
  }

  function updateStopTwo(event: React.ChangeEvent<HTMLInputElement>): void {
    setFill(`url(#myGradient-parent-${column})`);
    const newStop = Number(event.target.value);
    setStop2(newStop);
  }

  function reset(): void {
    setFill('url(#myGradient)');
  }

  useEffect(() => {
    document.querySelector(`#text-size-parent-${column}`)?.setAttribute('value', textSize.toString());
    document.querySelector(`#description-top-parent-${column}`)?.setAttribute('value', descriptionTop.toString());
    document.querySelector(`#inner-gradient-parent-${column}`)?.setAttribute('value', color1);
    document.querySelector(`#outer-gradient-parent-${column}`)?.setAttribute('value', color2);
    document.querySelector(`#inner-position-parent-${column}`)?.setAttribute('value', stop1.toString());
    document.querySelector(`#outer-position-parent-${column}`)?.setAttribute('value', stop2.toString());
  }, []);


  return (
    <div className={styles['chevron-container']} onMouseEnter={() => {setShowMenu(true)}} onMouseLeave={() => {setShowMenu(false)}}>

      <div className={styles['chevron-svg']} style={{height: `${height}px`, zIndex: 100}}>
        <svg className={styles.chevron} id="chevron" viewBox="0 0 159 169" preserveAspectRatio='none'>
          <defs>
            <radialGradient className='radial' id={`myGradient-parent-${column}`}>
              <stop className="chevron-radial-1" offset={`${stop1}%`} stopColor={color1} />
              <stop className="chevron-radial-2" offset={`${stop2}%`} stopColor={color2} />
            </radialGradient>
          </defs>
          <polyline fill={fill} points="159 1 159 153 79 168 0 153 0 1 159 1"/>
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
        <div className={styles['control-group']}>
          <div className={styles['control-label']}>
            <label htmlFor={`text-size-parent-${column}`}>Font size: {textSize} [0.88]</label>
            <input id={`text-size-parent-${column}`} name={`text-size-parent-${column}`} step={0.01} min={0.3} max={2} placeholder='0.88' type="number" onChange={updateTextSize} />
          </div>
          <div className={styles['control-label']}>
            <label htmlFor={`description-top-parent-${column}`}>Height: {descriptionTop}% [50%]</label>
            <input id={`description-top-parent-${column}`} name={`description-top-parent-${column}`} step={0.1} min={0} max={100} type="number" onChange={updateDescriptionTop}/>
          </div>
        </div>
        <div className={styles['control-group']}>
          <div className={styles['control-label']}>
            <label htmlFor={`inner-gradient-parent-${column}`}>Inner gradient color</label>
            <input id={`inner-gradient-parent-${column}`} name={`inner-gradient-parent-${column}`} type="color" onChange={updateColorOne} />
          </div>
          <div className={styles['control-label']}>
            <label htmlFor={`inner-position-parent-${column}`}>and position</label>
            <input id={`inner-position-parent-${column}`} name={`inner-position-parent-${column}`} type="number" onChange={updateStopOne} placeholder="10"/>
          </div>
        </div>
        <div className={styles['control-group']}>
          <div className={styles['control-label']}>
            <label htmlFor={`outer-gradient-parent-${column}`}>Outer gradient color</label>
            <input id={`outer-gradient-parent-${column}`} name={`outer-gradient-parent-${column}`} type="color" onChange={updateColorTwo}/>
          </div>
          <div className={styles['control-label']}>
            <label htmlFor={`outer-position-parent-${column}`}>and position</label>
            <input id={`outer-position-parent-${column}`} name={`outer-position-parent-${column}`} type="number" onChange={updateStopTwo} placeholder="95"/>
          </div>
        </div>
        <button onClick={reset}>Reset Gradients</button>
      </div>

    </div>
  );
}