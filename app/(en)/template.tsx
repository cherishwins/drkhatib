// Per-route render boundary. Next App Router re-runs this on every
// navigation, so the wrapping animation re-plays — giving us a subtle
// 120ms fade-in between routes without ANY client JS or transition library.
// The keyframe lives in app/globals.css and respects prefers-reduced-motion.

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
