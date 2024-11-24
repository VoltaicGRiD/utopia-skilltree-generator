import { useState } from "react"
import styles from "./context.module.css"

export interface ContextProps {
  left: number;
  top: number;
}

export const Context = ({ left, top }: ContextProps) => {
  const [textSize, setTextSize] = useState(0.72);

  const updateTextSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(Number(e.target.value));
  }

  return (
    <div className={styles['context-menu']} style={{left: left, top: top}}>
      <div className={styles['control-label']}>
        <label htmlFor="text-size">Description Text Size: {textSize}em</label>
        <input id="text-size" name="text-size" step={0.01} min={0.5} max={2} type="range" onChange={updateTextSize} />
      </div>
    </div>
  )
}