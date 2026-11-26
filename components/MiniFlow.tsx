export default function MiniFlow({ nodes }: { nodes: string[] }) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="my-3 py-3 px-3.5 sm:px-4 rounded-lg bg-surface border border-border">
      <div className="text-[10px] sm:text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2">
        Architecture Flow
      </div>
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {nodes.map((label, idx) => (
          <div key={label} className="inline-flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[11px] sm:text-xs text-text px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-border bg-bg font-medium break-words">
              {label}
            </span>
            {idx < nodes.length - 1 && (
              <span className="text-text-muted text-xs select-none">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
