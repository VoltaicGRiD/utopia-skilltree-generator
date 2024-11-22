import styles from './chevron.module.css';

interface ChevronProps {
  position: number;
  scale: number;
}

export function Chevron({ position, scale }: ChevronProps) {
  console.log(styles);
  console.log(position);

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
      bodySoulBottom = 0;
      mindBottom = -7;
      break;
    case 5:
      imageBottom = -30;
      bodySoulBottom = -5;
      mindBottom = -12;
      break;
  }

  const height = (700 + (26 * scale)) / scale;
  const zIndex = 100 - position;

  let display = 'block';
  console.log(position, scale);
  if ((position) > scale) {
    display = 'none';
  }

  return (
    <div className={styles['chevron-container']} style={{display: display}}>
      <div className={styles['chevron-svg']} style={{marginTop: `${marginTop}px`, height: `${height}px`, zIndex: zIndex}}>
        <svg className={styles.chevron} id="chevron" viewBox="0 0 159 173" preserveAspectRatio='none'>
          <polyline fill="url(#myGradient)" points="159 1 159 154 79 172 0 154 0 1 159 1"/>
          <clipPath id="chevronClip">
            <polyline points="159 1 159 154 79 172 0 154 0 1 159 1"/>
          </clipPath>
        </svg>
      </div>
      <div className={styles['chevron-controls']}>
        <input className={styles.title} type="text"/>
        {/* <Image src={Points} alt="points" className={styles['points-img']} width={313} height={104} style={{bottom: imageBottom}} loading="eager" /> */}
        <img src="/points.png" alt="points" className={styles['points-img']} style={{bottom: imageBottom, height: 104}} />
        <textarea className={styles.skillbody}></textarea>
        <input className={styles.body} type="number" maxLength={1} min="0" max="9" defaultValue="1" style={{bottom: bodySoulBottom}}/>
        <input className={styles.mind} type="number" maxLength={1} min="0" max="9" defaultValue="1" style={{bottom: mindBottom}}/>
        <input className={styles.soul} type="number" maxLength={1} min="0" max="9" defaultValue="1" style={{bottom: bodySoulBottom}}/>
      </div>
    </div>
  )
}

interface ParentChevronProps {
  scale: number;
}

export function ParentChevron({ scale }: ParentChevronProps) {
  const height = (700 + (26 * scale)) / scale;

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
      bodySoulBottom = 0;
      mindBottom = -7;
      break;
    case 5:
      imageBottom = -30;
      bodySoulBottom = -5;
      mindBottom = -12;
      break;
  }

  return (
    <div className={styles['chevron-container']}>
      <div className={styles['chevron-svg']} style={{height: `${height}px`, zIndex: 100}}>
        <svg className={styles.chevron} id="chevron" viewBox="0 0 159 173" preserveAspectRatio='none'>
          <polyline fill="url(#myGradient)" points="159 1 159 154 79 172 0 154 0 1 159 1"/>
          <clipPath id="chevronClip">
          <polyline points="159 1 159 154 79 172 0 154 0 1 159 1"/>
          </clipPath>
        </svg>
      </div>
      <div className={styles['parent-chevron-controls']}>
        <input className={styles.title} type="text" placeholder='Epic Talent'/>
        <img src="/points.png" alt="points" className={styles['points-img']} style={{bottom: imageBottom, height: 104}} />
        <textarea className={styles.skillbody} placeholder="Some awesome, incredible, homebrew'd talent"></textarea>
        <input className={styles.body} type="number" maxLength={1} min="0" max="9" defaultValue="1" style={{bottom: bodySoulBottom}}/>
        <input className={styles.mind} type="number" maxLength={1} min="0" max="9" defaultValue="1" style={{bottom: mindBottom}}/>
        <input className={styles.soul} type="number" maxLength={1} min="0" max="9" defaultValue="1" style={{bottom: bodySoulBottom}}/>
      </div>
    </div>
  );
}