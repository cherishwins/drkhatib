'use client';

import { Mono } from './atoms';

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border border-gold px-4 py-2 font-mono text-[11px] uppercase tracking-tracked text-gold transition-colors hover:bg-gold hover:text-deep-navy"
    >
      <Mono>{label}</Mono>
    </button>
  );
}
