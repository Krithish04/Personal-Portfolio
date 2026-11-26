"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function ProjectDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete project.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-1.5 rounded hover:bg-bg text-text-muted hover:text-red-500 transition-colors disabled:opacity-50"
      title="Delete project"
      aria-label={`Delete ${title}`}
    >
      <Trash2 size={13} />
    </button>
  );
}
