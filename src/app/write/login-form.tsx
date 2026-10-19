"use client";

import { Window } from "@/components/os/window";
import { Caret } from "@/components/os/widgets";
import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <Window title="Write.app — Sign in" tone="chrome" bodyClassName="p-5">
      <h1 className="font-display text-5xl">Write.</h1>
      <p className="mono-xs mt-3">
        $ sudo write --new-post
        <Caret />
      </p>
      <form action={action} className="mt-6 flex flex-col gap-3">
        <label className="mono-xs" htmlFor="password">
          password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          required
          autoComplete="current-password"
          className="h-11 border border-ink bg-paper px-3 font-mono outline-none focus:shadow-[3px_3px_0_0_var(--magenta)]"
        />
        {error && <p className="mono-xs bg-ink px-2 py-1 text-pink">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="h-11 bg-ink font-semibold text-paper transition-colors hover:bg-pink hover:text-[#1e1e1e] disabled:opacity-60"
        >
          {pending ? "Checking…" : "Unlock editor"}
        </button>
      </form>
    </Window>
  );
}
