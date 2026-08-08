"use client";

import { useEffect, useRef, useState } from "react";
import RoxyOrb from "@/components/RoxyOrb";
import ChatMessage from "@/components/ChatMessage";

const SUGGESTIONS = [
  { title: "Explain a concept", detail: "like quantum entanglement, simply" },
  { title: "Draft an email", detail: "asking for a deadline extension" },
  { title: "Brainstorm names", detail: "for a new coffee shop" },
  { title: "Debug some code", detail: "paste an error and I'll take a look" },
];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    setError(null);
    const nextHistory = [...messages, { role: "user", text: trimmed }];
    setMessages(nextHistory);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
        setMessages(nextHistory);
      } else {
        setMessages([...nextHistory, { role: "assistant", text: data.text }]);
      }
    } catch (err) {
      setError("Couldn't reach Roxy. Check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-roxy-aurora opacity-60 animate-drift" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-ink" />

      <header className="flex items-center gap-2.5 px-5 py-4 sm:px-8">
        <RoxyOrb size={28} />
        <span className="font-display text-lg font-semibold tracking-tight text-paper">
          Roxy
        </span>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 pb-4 sm:px-8"
      >
        <div className="mx-auto flex h-full max-w-3xl flex-col">
          {!hasMessages ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-8 py-10 text-center">
              <RoxyOrb size={56} />
              <div>
                <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                  What's on your mind?
                </h1>
                <p className="mt-2 text-mist">
                  Ask Roxy anything — she thinks fast and explains clearly.
                </p>
              </div>
              <div className="grid w-full max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => sendMessage(`${s.title} — ${s.detail}`)}
                    className="rounded-xl border border-line bg-surface/80 px-4 py-3 text-left transition hover:border-roxy-500/60 hover:bg-surface2"
                  >
                    <div className="text-sm font-medium text-paper">
                      {s.title}
                    </div>
                    <div className="text-xs text-mist">{s.detail}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 py-6">
              {messages.map((m, i) => (
                <ChatMessage key={i} role={m.role} text={m.text} />
              ))}
              {isSending && <ChatMessage role="assistant" pending />}
            </div>
          )}

          {error && (
            <div className="mb-3 rounded-xl border border-roxy-700/60 bg-roxy-700/10 px-4 py-2.5 text-sm text-roxy-200">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-6 sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-line bg-surface/90 p-2.5 shadow-lg shadow-black/20 backdrop-blur"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Message Roxy..."
            className="max-h-40 flex-1 resize-none bg-transparent px-2.5 py-2 text-[15px] text-paper placeholder:text-mist focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-roxy-500 to-indigo-500 text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
        <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-mist">
          Roxy can make mistakes. Consider checking important information.
        </p>
      </div>
    </main>
  );
}
