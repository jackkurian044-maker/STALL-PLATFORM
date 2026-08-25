"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../search/SearchBar";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const encoded = encodeURIComponent(query.trim());
    if (!encoded) {
      return;
    }

    router.push(`/search?q=${encoded}`);
  };

  return (
    <section
      style={{
        padding: "80px 0",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "54px",
          marginBottom: "20px",
          fontWeight: 700,
        }}
      >
        Discover Local Businesses
        <br />
        Around You
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#666",
          maxWidth: "700px",
          margin: "0 auto 40px",
        }}
      >
        Find trusted flower shops, salons, grocery stores, tailors,
        restaurants and every neighbourhood business in seconds.
      </p>

      <SearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />

    </section>
  );
}
