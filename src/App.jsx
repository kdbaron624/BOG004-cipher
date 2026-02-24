import { useState, useEffect } from 'react'
import './App.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function caesarCipher(text, shift, mode) {
  const s = mode === 'encode' ? shift : (26 - shift) % 26;
  return text.split("").map((ch) => {
    const upper = ch.toUpperCase();
    if (ALPHABET.includes(upper)) {
      const idx = (ALPHABET.indexOf(upper) + s) % 26;
      return ALPHABET[idx];
    }
    return ch;
  }).join("");
}

export default function CeaserCipher() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(0);
  const [mode, setMode] = useState("encode");
  const [copied, setCopied] = useState(false);

  const output = caesarCipher(input, shift, mode) || "";

  const handleShift = (delta) => {
    setShift((prev) => ((prev + delta + 26) % 26) || (delta > 0 ? 1 : 25));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const shiftedAlphabet = ALPHABET.split("").map(
    (_, i) => ALPHABET[(i + shift) % 26]
  );

  return (
    <>
<div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">Caesar Cipher</h1>
          <p className="subtitle">Cipher · Decoder</p>
        </div>

        {/* Mode toggle */}
        <div>
          <div className="mode-toggle">
            <button
              className={`mode-btn ${mode === "encode" ? "active" : ""}`}
              onClick={() => setMode("encode")}
            >
              Encode
            </button>
            <button
              className={`mode-btn ${mode === "decode" ? "active" : ""}`}
              onClick={() => setMode("decode")}
            >
              Decode
            </button>
          </div>

          {/* Input */}
          <textarea
            className="text-area"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Write the message to encrypt..."
                : "Paste the encrypted message..."
            }
            spellCheck={false}
          />
        </div>

        {/* Shift control */}
        <div>
          <p className="section-label">Displacement</p>
          <div className="shift-section">
            <div className="shift-label-group">
              <div className="shift-value">{String(shift).padStart(2, "0")}</div>
              <input
                type="range"
                className="shift-slider"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => setShift(Number(e.target.value))}
              />
            </div>
            <div className="shift-controls">
              <button className="shift-btn" onClick={() => handleShift(1)}>
                +
              </button>
              <button className="shift-btn" onClick={() => handleShift(-1)}>
                −
              </button>
            </div>
          </div>
        </div>

        {/* Output */}
        <div>
          <p className="section-label">Result</p>
          <div className="output-box">
            <p className="output-text">
              {output || (
                <span className="output-placeholder">
                  The result will appear here...
                </span>
              )}
            </p>
            <button
              className={`copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>

        {/* Alphabet map */}
        <div>
          <p className="section-label">Substitution Table</p>
          <div className="alphabet-display">
            <div className="alpha-row">
              {ALPHABET.split("").map((ch) => (
                <div key={ch} className="alpha-char original">
                  {ch}
                </div>
              ))}
            </div>
            <div className="alpha-row">
              {shiftedAlphabet.map((ch, i) => (
                <div key={i} className="alpha-char shifted">
                  {ch}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer">Caesar Cipher · Monoalphabetic Substitution</div>
      </div>
    </>
  )

}