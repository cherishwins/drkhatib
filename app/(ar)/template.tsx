// Mirror of the English template — see app/(en)/template.tsx for the why.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
