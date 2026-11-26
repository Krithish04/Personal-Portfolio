"use client";

import { useState, useEffect } from "react";
import { Eye, Users, Download, Send, AlertCircle } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<"7" | "30" | "90">("7");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics?range=${range}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
            Analytics & Traffic
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            100% privacy-friendly audience telemetry with zero cookies and zero IP address persistence.
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex rounded-md border border-border bg-surface p-0.5 font-mono text-xs self-start sm:self-auto">
          {(["7", "30", "90"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded transition-colors ${
                range === r
                  ? "bg-bg text-accent font-semibold shadow-sm"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {r} Days
            </button>
          ))}
        </div>
      </div>

      {data && !data.isEnabled && (
        <div
          role="alert"
          className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2 font-mono"
        >
          <AlertCircle size={15} className="shrink-0" />
          <span>Analytics tracking is currently disabled via the Features panel. No new visits are being recorded.</span>
        </div>
      )}

      {loading ? (
        <div className="text-sm font-mono text-text-muted py-8">Aggregating telemetry metrics...</div>
      ) : !data ? (
        <div className="text-sm text-text-muted py-8">Failed to load analytics metrics.</div>
      ) : (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between text-text-muted mb-1 font-mono text-xs">
                <span>Page Views</span>
                <Eye size={15} />
              </div>
              <div className="text-2xl font-serif font-semibold text-text">{data.totalViews}</div>
              <div className="text-[11px] text-text-muted font-mono mt-1">Past {range} days</div>
            </div>

            <div className="p-4 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between text-text-muted mb-1 font-mono text-xs">
                <span>Unique Visitors</span>
                <Users size={15} />
              </div>
              <div className="text-2xl font-serif font-semibold text-text">{data.uniqueVisitors}</div>
              <div className="text-[11px] text-text-muted font-mono mt-1">Daily salted hash</div>
            </div>

            <div className="p-4 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between text-text-muted mb-1 font-mono text-xs">
                <span>Resume Downloads</span>
                <Download size={15} />
              </div>
              <div className="text-2xl font-serif font-semibold text-text">{data.resumeDownloads}</div>
              <div className="text-[11px] text-text-muted font-mono mt-1">PDF conversions</div>
            </div>

            <div className="p-4 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between text-text-muted mb-1 font-mono text-xs">
                <span>Contact Submissions</span>
                <Send size={15} />
              </div>
              <div className="text-2xl font-serif font-semibold text-text">{data.contactSubmits}</div>
              <div className="text-[11px] text-text-muted font-mono mt-1">Form messages</div>
            </div>
          </div>

          {/* Daily Views Bar Chart */}
          <div className="p-4 sm:p-6 rounded-lg bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-base font-semibold text-text">Daily Page Views</h2>
              <span className="font-mono text-xs text-text-muted">Total: {data.totalViews}</span>
            </div>

            <div className="overflow-x-auto w-full pb-2">
              <div
                className="h-44 flex items-end gap-1 sm:gap-2 pt-6 pb-2 border-b border-border"
                style={{
                  minWidth: data.dailyViews.length > 14 ? `${data.dailyViews.length * 16}px` : "100%",
                }}
              >
                {(() => {
                  const max = Math.max(...data.dailyViews.map((d: any) => d.count), 5);
                  return data.dailyViews.map((d: any) => {
                    const pct = Math.round((d.count / max) * 100);
                    return (
                      <div
                        key={d.date}
                        className="flex-1 flex flex-col items-center justify-end h-full group relative min-w-[8px]"
                      >
                        <div
                          className="w-full bg-accent/80 hover:bg-accent rounded-t transition-all"
                          style={{ height: `${Math.max(pct, 4)}%` }}
                          title={`${d.date}: ${d.count} views`}
                        />
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-text-muted">
              <span>{data.dailyViews[0]?.date}</span>
              <span>{data.dailyViews[data.dailyViews.length - 1]?.date}</span>
            </div>
          </div>

          {/* Top Pages and Referrers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Pages */}
            <div className="p-5 rounded-lg bg-surface border border-border">
              <h3 className="font-serif text-base font-semibold text-text mb-3">Top Visited Pages</h3>
              {data.topPages.length === 0 ? (
                <p className="text-xs text-text-muted">No page hits recorded yet.</p>
              ) : (
                <div className="space-y-2">
                  {data.topPages.map((p: any) => (
                    <div key={p.path} className="flex justify-between items-center text-xs font-mono py-1 border-b border-border/40 last:border-0">
                      <span className="text-text truncate max-w-[240px]">{p.path}</span>
                      <span className="text-accent font-semibold">{p.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Referrers */}
            <div className="p-5 rounded-lg bg-surface border border-border">
              <h3 className="font-serif text-base font-semibold text-text mb-3">Top Referrers</h3>
              {data.topReferrers.length === 0 ? (
                <p className="text-xs text-text-muted">No referrer information recorded yet.</p>
              ) : (
                <div className="space-y-2">
                  {data.topReferrers.map((r: any) => (
                    <div key={r.referrer} className="flex justify-between items-center text-xs font-mono py-1 border-b border-border/40 last:border-0">
                      <span className="text-text truncate max-w-[240px]">{r.referrer}</span>
                      <span className="text-accent font-semibold">{r.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Devices Breakdown */}
          <div className="p-5 rounded-lg bg-surface border border-border">
            <h3 className="font-serif text-base font-semibold text-text mb-3">Device Breakdown</h3>
            <div className="flex flex-wrap gap-6 text-xs font-mono">
              {data.devices.map((dev: any) => (
                <div key={dev.device} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-text font-medium">{dev.device}:</span>
                  <span className="text-text-muted">{dev.count} ({data.totalViews > 0 ? Math.round((dev.count / data.totalViews) * 100) : 0}%)</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
