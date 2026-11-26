"use client";

import { useState, useEffect } from "react";
import { ToggleLeft, ToggleRight, CheckCircle2, ShieldAlert } from "lucide-react";

interface FeatureItem {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
  updatedAt: string;
}

export default function AdminFeaturesPage() {
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/features");
      const data = await res.json();
      if (Array.isArray(data)) setFeatures(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleToggle = async (key: string, currentEnabled: boolean) => {
    setUpdatingKey(key);
    try {
      const res = await fetch("/api/admin/features", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, enabled: !currentEnabled }),
      });

      if (res.ok) {
        setFeatures((prev) =>
          prev.map((f) =>
            f.key === key ? { ...f, enabled: !currentEnabled, updatedAt: new Date().toISOString() } : f
          )
        );
      }
    } finally {
      setUpdatingKey(null);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
          Features Panel
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Toggle public site features instantly with zero redeployment. Turning a feature off retains all stored data in the database.
        </p>
      </div>

      {loading ? (
        <div className="text-sm font-mono text-text-muted py-6">Loading feature toggles...</div>
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border bg-surface overflow-hidden">
          {features.map((feature) => (
            <div
              key={feature.key}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-text">
                    {feature.label}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      feature.enabled
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 font-medium"
                        : "bg-surface border border-border text-text-muted"
                    }`}
                  >
                    {feature.enabled ? "ACTIVE" : "DISABLED"}
                  </span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-[10px] font-mono text-text-muted/70">
                  Last updated: {new Date(feature.updatedAt).toLocaleString()}
                </div>
              </div>

              <button
                type="button"
                disabled={updatingKey === feature.key}
                onClick={() => handleToggle(feature.key, feature.enabled)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                  feature.enabled
                    ? "bg-accent text-white hover:opacity-90"
                    : "bg-bg border border-border text-text-muted hover:text-text"
                }`}
                aria-label={`Toggle ${feature.label}`}
              >
                {feature.enabled ? (
                  <>
                    <ToggleRight size={16} />
                    <span>Enabled</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft size={16} />
                    <span>Disabled</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
