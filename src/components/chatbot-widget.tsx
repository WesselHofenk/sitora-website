"use client";

import {
  ArrowUp,
  LoaderCircle,
  MessageSquareText,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
};

type ChatAction = {
  label: string;
  href?: string;
  message?: string;
};

type ChatApiResult = {
  ok?: boolean;
  answer?: string;
  actions?: ChatAction[];
  message?: string;
};

const STORAGE_KEY = "sitora-24-7-session";
const WELCOME_MESSAGE = "Hoi! Ik ben Sitora 24/7. Waarmee kan ik je vandaag helpen?";
const quickChoices = ["Diensten", "Prijzen", "Afspraak maken", "Contact"];

function safeActions(input: unknown): ChatAction[] | undefined {
  if (!Array.isArray(input)) return undefined;
  const actions = input.filter((action): action is ChatAction => {
    if (!action || typeof action !== "object") return false;
    const value = action as Record<string, unknown>;
    if (typeof value.label !== "string" || value.label.length > 50) return false;
    const safeHref = typeof value.href === "string" && (
      /^\/(?!\/)/.test(value.href) || /^https:\/\/wa\.me\/\d+$/.test(value.href)
    );
    const safeMessage = typeof value.message === "string" && value.message.length <= 200;
    return safeHref || safeMessage;
  }).slice(0, 3);
  return actions.length ? actions : undefined;
}

function initialMessages(): ChatMessage[] {
  return [{ id: "welkom", role: "assistant", content: WELCOME_MESSAGE }];
}

function storedMessages() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return initialMessages();
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) return initialMessages();
    const messages = parsed.filter((item): item is ChatMessage => (
      !!item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      (item.role === "user" || item.role === "assistant") &&
      typeof item.content === "string" &&
      item.content.length <= 1_000
    )).map((item) => ({
      ...item,
      actions: safeActions(item.actions),
    })).slice(-30);
    return messages.length ? messages : initialMessages();
  } catch {
    return initialMessages();
  }
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMessages(storedMessages());
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
  }, [hydrated, messages]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [open, messages, loading]);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function restartConversation() {
    setMessages(initialMessages());
    setInput("");
    setError("");
    sessionStorage.removeItem(STORAGE_KEY);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  async function sendMessage(content: string) {
    const cleanMessage = content.trim().slice(0, 600);
    if (!cleanMessage || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: cleanMessage,
    };
    const nextMessages = [...messages, userMessage].slice(-30);
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-12).map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        }),
      });
      const result = await response.json().catch(() => ({})) as ChatApiResult;
      if (!response.ok || !result.ok || !result.answer) {
        setError(result.message || "Sitora 24/7 kan nu geen antwoord geven. Probeer het opnieuw.");
        return;
      }
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.answer!,
        actions: safeActions(result.actions),
      };
      setMessages((current) => [...current, assistantMessage].slice(-30));
    } catch {
      setError("Er ging iets mis met de verbinding. Probeer het opnieuw of neem contact op met Sitora.");
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function sendOnEnter(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    void sendMessage(input);
  }

  if (!open) {
    return (
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Sitora 24/7-chat"
        aria-haspopup="dialog"
        className="fixed bottom-24 right-3 z-[60] inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-[#07111f] px-4 font-black text-white shadow-2xl shadow-slate-950/25 transition-[background-color,transform] hover:bg-blue-900 md:bottom-6 md:right-6"
      >
        <span className="relative grid size-8 place-items-center rounded-full bg-orange-700">
          <MessageSquareText className="size-4" aria-hidden="true" />
          <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-[#07111f] bg-emerald-400" aria-hidden="true" />
        </span>
        <span>Sitora 24/7</span>
      </button>
    );
  }

  return (
    <section
      role="dialog"
      aria-labelledby="sitora-chat-title"
      aria-describedby="sitora-chat-status"
      className="fixed inset-x-3 bottom-24 z-[60] flex max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-950/30 md:bottom-6 md:left-auto md:right-6 md:w-[25rem] md:max-h-[min(42rem,calc(100dvh-3rem))]"
    >
      <header className="flex items-center gap-3 bg-[#07111f] px-4 py-4 text-white">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-orange-700">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="sitora-chat-title" className="truncate text-base font-black">Sitora 24/7</h2>
          <p id="sitora-chat-status" className="mt-0.5 flex items-center gap-2 text-xs text-slate-300">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Online
          </p>
        </div>
        <button
          type="button"
          onClick={restartConversation}
          aria-label="Gesprek opnieuw starten"
          title="Gesprek opnieuw starten"
          className="grid size-10 place-items-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            requestAnimationFrame(() => triggerRef.current?.focus());
          }}
          aria-label="Chat sluiten"
          className="grid size-10 place-items-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </header>

      <div
        aria-live="polite"
        aria-busy={loading}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#f6f3ed] px-4 py-5"
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
            <p className={`max-w-[86%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.role === "user"
                ? "rounded-br-md bg-[#07111f] text-white"
                : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
            }`}>
              {message.content}
            </p>
            {message.role === "assistant" && message.actions?.length ? (
              <div className="mt-2 flex max-w-full flex-wrap gap-2" aria-label="Vervolgacties">
                {message.actions.map((action) => action.href ? (
                  <Link
                    key={`${message.id}-${action.label}`}
                    href={action.href}
                    className="inline-flex min-h-9 items-center rounded-full border border-orange-300 bg-white px-3 text-xs font-black text-orange-900 transition-colors hover:border-orange-500 hover:bg-orange-50"
                  >
                    {action.label}
                  </Link>
                ) : (
                  <button
                    key={`${message.id}-${action.label}`}
                    type="button"
                    disabled={loading}
                    onClick={() => void sendMessage(action.message || action.label)}
                    className="min-h-9 rounded-full border border-orange-300 bg-white px-3 text-xs font-black text-orange-900 transition-colors hover:border-orange-500 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        {loading ? (
          <div className="flex justify-start" role="status">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="sr-only">Sitora 24/7 typt een antwoord</span>
              {[0, 1, 2].map((dot) => <span key={dot} className="size-2 animate-pulse rounded-full bg-slate-400" style={{ animationDelay: `${dot * 120}ms` }} aria-hidden="true" />)}
            </div>
          </div>
        ) : null}

        {error ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-900">
            <p>{error}</p>
            <Link href="/contact#advies" className="mt-2 inline-flex min-h-10 items-center font-black underline decoration-2 underline-offset-4">Ga naar contact</Link>
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        <div className="mb-3 flex flex-wrap gap-2 pb-1" aria-label="Snelle keuzes">
          {quickChoices.map((choice) => (
            <button
              key={choice}
              type="button"
              disabled={loading}
              onClick={() => void sendMessage(choice)}
              className="min-h-9 shrink-0 rounded-full border border-slate-300 bg-white px-3 text-xs font-black text-slate-700 transition-colors hover:border-orange-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {choice}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2">
          <label htmlFor="sitora-chat-input" className="sr-only">Schrijf je bericht aan Sitora 24/7</label>
          <input
            ref={inputRef}
            id="sitora-chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={sendOnEnter}
            maxLength={600}
            autoComplete="off"
            placeholder="Typ je vraag…"
            disabled={loading}
            className="h-12 min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 disabled:bg-slate-100"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Bericht versturen"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-orange-700 text-white transition-colors hover:bg-orange-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <ArrowUp className="size-5" aria-hidden="true" />}
          </button>
        </form>
        <Link
          href="/contact#advies"
          className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-orange-50 px-4 text-xs font-black text-orange-800 transition-colors hover:bg-orange-100"
        >
          Contact opnemen of afspraak aanvragen
        </Link>
        <p className="mt-2 text-center text-[10px] leading-4 text-slate-700">AI-assistent · deel geen gevoelige persoonsgegevens</p>
      </div>
    </section>
  );
}
