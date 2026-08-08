import RoxyOrb from "./RoxyOrb";

function formatText(text) {
  // Very small formatter: fenced code blocks -> <pre>, line breaks -> <p>
  const parts = text.split(/```([\s\S]*?)```/g);
  return parts.map((chunk, i) => {
    if (i % 2 === 1) {
      return (
        <pre key={i}>
          <code>{chunk.trim()}</code>
        </pre>
      );
    }
    return chunk
      .split(/\n{2,}/)
      .filter(Boolean)
      .map((para, j) => <p key={`${i}-${j}`}>{para}</p>);
  });
}

export default function ChatMessage({ role, text, pending }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 animate-rise ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {!isUser && (
        <div className="mt-1">
          <RoxyOrb size={26} thinking={pending} />
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
          isUser
            ? "bg-indigo-500 text-white rounded-tr-sm"
            : "bg-surface2 text-fog border border-line rounded-tl-sm"
        }`}
      >
        {pending ? (
          <span className="inline-flex gap-1 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-mist animate-pulseSoft [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-mist animate-pulseSoft [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-mist animate-pulseSoft" />
          </span>
        ) : (
          <div className="prose-chat">{formatText(text)}</div>
        )}
      </div>
    </div>
  );
}
