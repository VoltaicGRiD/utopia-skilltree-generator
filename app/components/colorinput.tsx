'use client';

import { useEffect, useState } from 'react';
import styles from './colorinput.module.css';

const hexPattern = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

// Returns a canonical #rrggbb string, or null when the text isn't a hex color yet
function normalizeHex(text: string): string | null {
  const match = text.trim().match(hexPattern);
  if (!match) return null;

  const digits = match[1];
  const expanded = digits.length === 3
    ? digits.split('').map((digit) => digit + digit).join('')
    : digits;

  return `#${expanded.toLowerCase()}`;
}

interface ColorInputProps {
  id: string;
  value: string;
  onChange: (color: string) => void;
}

// A native swatch paired with a hex field, since some mobile browsers only offer
// a handful of preset colors and give no way to type a hex code
export function ColorInput({ id, value, onChange }: ColorInputProps) {
  const [hexDraft, setHexDraft] = useState(value);

  // Keep the field in step when the color changes from the swatch or elsewhere
  useEffect(() => {
    setHexDraft(value);
  }, [value]);

  function updateFromHex(event: React.ChangeEvent<HTMLInputElement>): void {
    const text = event.target.value;
    setHexDraft(text);

    const hex = normalizeHex(text);
    if (hex) {
      onChange(hex);
    }
  }

  // Drop half-typed or invalid text back to the color that's actually applied
  function commitHex(): void {
    setHexDraft(normalizeHex(hexDraft) ?? value);
  }

  return (
    <div className={styles['color-input']}>
      <input
        id={id}
        name={id}
        type="color"
        className={styles.swatch}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <input
        id={`${id}-hex`}
        name={`${id}-hex`}
        type="text"
        className={styles.hex}
        value={hexDraft}
        onChange={updateFromHex}
        onBlur={commitHex}
        maxLength={7}
        size={7}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        aria-label="Hex color code"
        placeholder="#000000"
      />
    </div>
  );
}
