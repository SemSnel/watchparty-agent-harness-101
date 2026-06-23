"use client";

import { useState } from "react";
import { splitFairly } from "@/lib/split";

const formatUSD = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Home() {
  const [total, setTotal] = useState("42.00");
  const [people, setPeople] = useState(3);

  // ponytail: parse dollars -> integer cents; Math.round avoids float drift.
  const totalCents = Math.round(Number(total) * 100);
  const valid = Number.isFinite(totalCents) && totalCents >= 0 && people >= 1;
  const parts = valid ? splitFairly(totalCents, people) : [];

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Bill Splitter</h1>

      <div className="flex w-full max-w-xs flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Bill total ($)
          <input
            type="number"
            min="0"
            step="0.01"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-base dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          People
          <input
            type="number"
            min="1"
            step="1"
            value={people}
            onChange={(e) =>
              setPeople(Math.max(1, Math.floor(Number(e.target.value) || 1)))
            }
            className="rounded-lg border border-zinc-300 px-3 py-2 text-base dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
      </div>

      {valid ? (
        <ul className="flex w-full max-w-xs flex-col gap-2">
          {parts.map((cents, i) => (
            <li
              key={i}
              className="flex justify-between rounded-lg border border-zinc-200 px-4 py-2 dark:border-zinc-800"
            >
              <span className="text-zinc-600 dark:text-zinc-400">
                Person {i + 1}
              </span>
              <strong>{formatUSD(cents)}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-600">Enter a valid total and at least 1 person.</p>
      )}
    </main>
  );
}
