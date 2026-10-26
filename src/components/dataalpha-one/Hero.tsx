import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DataFlowBackground } from "@/components/ui/DataFlowBackground";
import { Container } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const LOGIN_URL = "https://dataalphaone.netlify.app/login";

const EXAMPLE_PROMPTS = [
  "Analyze my data",
  "Find key insights",
  "Build a report",
] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-canvas pb-12 pt-20 sm:pb-16 sm:pt-24">
      <DataFlowBackground />
      <Container className="relative max-w-[1200px] px-4 xl:max-w-[1400px] 2xl:max-w-[1600px]">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Ask your data. Get the report.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted sm:text-base">
              DA One turns data from any source into trusted insights and faster reporting — no dashboards to build, no SQL to write.
            </p>
          </div>
          <HeroChat />
        </div>
      </Container>
    </section>
  );
}

function HeroChat() {
  const inputId = useId();
  const hintId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigating = useRef(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  function goToLogin() {
    if (navigating.current) return;
    navigating.current = true;
    setPending(true);
    window.location.assign(LOGIN_URL);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goToLogin();
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) return;
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }

  function useExample(prompt: string) {
    setMessage(prompt);
    inputRef.current?.focus();
  }

  return (
    <div
      className="w-full max-w-[720px] justify-self-center rounded-[20px] border border-line bg-card text-ink shadow-card md:justify-self-end"
      style={{
        boxShadow:
          "0 0 70px 18px color-mix(in srgb, var(--color-accent) 22%, transparent), var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <img
          src={site.logo}
          alt={site.name}
          className="h-8 w-auto max-w-[148px] object-contain object-left dark:brightness-0 dark:invert"
        />
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
          Ready
        </span>
      </div>

      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
          What would you like to explore?
        </p>
        <p className="mt-1.5 text-sm leading-6 text-muted">
          Analyze your data, uncover the patterns that matter, and turn them into a clear report.
        </p>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="rounded-[18px] border border-line bg-canvas transition-[border-color,box-shadow] duration-200 focus-within:border-accent focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_22%,transparent)]">
            <label htmlFor={inputId} className="sr-only">
              Ask anything about your data
            </label>
            <textarea
              ref={inputRef}
              id={inputId}
              name="message"
              rows={3}
              value={message}
              placeholder="Ask anything about your data..."
              aria-describedby={hintId}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={onKeyDown}
              className="block w-full resize-none bg-transparent px-3.5 pt-3.5 pb-1 text-[15px] leading-6 text-ink outline-none placeholder:text-muted"
            />
            <div className="flex flex-col gap-2.5 px-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <p id={hintId} className="text-xs leading-5 text-muted">
                Enter to continue. Shift+Enter for a new line.
              </p>
              <Button
                type="submit"
                aria-label="Explore"
                aria-busy={pending}
                className="w-full sm:w-auto"
              >
                {pending ? "Opening…" : "Explore"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Example prompts">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => useExample(prompt)}
                className="min-h-9 rounded-full border border-line bg-canvas px-3.5 text-sm text-ink-2 transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {prompt}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
