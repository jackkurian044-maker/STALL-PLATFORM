"use client";

import type { ChangeEvent } from "react";
import type { BusinessFilterOptions } from "@/lib/business";

interface BusinessFiltersProps {
  categories: string[];
  cities: string[];
  states: string[];
  services?: string[];
  filters: BusinessFilterOptions;
  onChange: (filters: BusinessFilterOptions) => void;
  onClear?: () => void;
}

export default function BusinessFilters({
  categories,
  cities,
  states,
  services = [],
  filters,
  onChange,
  onClear,
}: BusinessFiltersProps) {
  const updateFilter = (key: keyof BusinessFilterOptions, value: string | boolean | undefined) => {
    onChange({ ...filters, [key]: value });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilter(event.target.name as keyof BusinessFilterOptions, event.target.value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value || undefined;
    updateFilter(event.target.name as keyof BusinessFilterOptions, value);
  };

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilter(event.target.name as keyof BusinessFilterOptions, event.target.checked);
  };

  return (
    <section
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        marginBottom: 24,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 14, color: "#333", fontWeight: 600 }} htmlFor="category-filter">
          Category
        </label>
        <select
          id="category-filter"
          name="category"
          value={filters.category ?? ""}
          onChange={handleSelect}
          style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 14, color: "#333", fontWeight: 600 }} htmlFor="city-filter">
          City
        </label>
        <select
          id="city-filter"
          name="city"
          value={filters.city ?? ""}
          onChange={handleSelect}
          style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
        >
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 14, color: "#333", fontWeight: 600 }} htmlFor="state-filter">
          State
        </label>
        <select
          id="state-filter"
          name="state"
          value={filters.state ?? ""}
          onChange={handleSelect}
          style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
        >
          <option value="">All states</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 14, color: "#333", fontWeight: 600 }} htmlFor="service-filter">
          Service
        </label>
        <select
          id="service-filter"
          name="service"
          value={filters.service ?? ""}
          onChange={handleSelect}
          style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
        >
          <option value="">All services</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 14, color: "#333", fontWeight: 600 }} htmlFor="query-filter">
          Search term
        </label>
        <input
          id="query-filter"
          name="query"
          value={filters.query ?? ""}
          onChange={handleInput}
          placeholder="Search businesses..."
          style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input
            type="checkbox"
            name="isOpen"
            checked={filters.isOpen ?? false}
            onChange={handleCheckbox}
          />
          Open now
        </label>

        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            style={{
              background: "transparent",
              border: "1px solid #1D7A3F",
              color: "#1D7A3F",
              borderRadius: 12,
              padding: "12px 18px",
              cursor: "pointer",
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </section>
  );
}
