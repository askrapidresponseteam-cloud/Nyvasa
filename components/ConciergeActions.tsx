"use client";

import { useState } from "react";

const CONFIRM: Record<string, string> = {
  message: "Aarav has been notified - expect a reply within the hour.",
  call: "Pick a slot on the call that follows - Aarav's calendar is open to you.",
  callback: "Requested. Aarav will call you back before 8 PM today.",
};

export default function ConciergeActions() {
  const [note, setNote] = useState("");

  return (
    <div>
      <div className="cz-actions">
        <button className="cz-btn primary" onClick={() => setNote(CONFIRM.message)}>
          Message concierge
        </button>
        <button className="cz-btn" onClick={() => setNote(CONFIRM.call)}>
          Schedule a call
        </button>
        <button className="cz-btn" onClick={() => setNote(CONFIRM.callback)}>
          Request callback
        </button>
      </div>
      <div className="cz-note" role="status" aria-live="polite">{note}</div>
    </div>
  );
}
