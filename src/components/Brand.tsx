export default function Brand({ number }: { number?: number }) {
  return <div className="brand"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2.4"/><circle cx="12" cy="6" r="2.4"/><circle cx="18" cy="12" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8 10 10.3 7.7M13.7 7.7 16 10M16 14l-2.3 2.3M10.3 16.3 8 14"/></svg><span>SYNAPSE</span>{number !== undefined && <small>#{number}</small>}</div>;
}
