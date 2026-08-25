"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialQuery: string;
}

export default function SearchBar({ initialQuery }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const encoded = encodeURIComponent(query.trim());
    if (!encoded) {
      return;
    }

    router.push(`/search?q=${encoded}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search businesses..."
        style={{
          width: "500px",
          maxWidth: "90%",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          fontSize: "16px",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#1D7A3F",
          color: "#fff",
          border: "none",
          padding: "16px 28px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Search
      </button>
    </form>
  );
}
