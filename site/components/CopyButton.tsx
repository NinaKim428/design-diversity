"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback for non-secure contexts
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      onClick={copy}
      style={{
        fontFamily: "inherit",
        fontSize: 13.5,
        fontWeight: 700,
        padding: "9px 16px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        background: copied ? "#1f6b35" : "#1a1a1a",
        color: "#fff",
        transition: "background 0.15s ease",
        whiteSpace: "nowrap",
      }}
      aria-live="polite"
    >
      {copied ? "복사됨 ✓" : "prompt.md 복사"}
    </button>
  );
}
