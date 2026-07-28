const businesses = [
  {
    name: "Aya Flowers",
    category: "Flower Shop",
    location: "Whitefield",
    rating: "4.9",
  },
  {
    name: "Style Expres",
    category: "Salon",
    location: "Kadugodi",
    rating: "4.8",
  },
  {
    name: "Fresh Mart",
    category: "Grocery",
    location: "Belathur",
    rating: "4.7",
  },
];

export default function Featured() {
  return (
    <section style={{ padding: "60px 0" }}>
      <h2
        style={{
          fontSize: "34px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Featured Businesses
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "24px",
        }}
      >
        {businesses.map((business) => (
          <div
            key={business.name}
            style={{
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                height: "170px",
                background: "#d9e9d9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
              }}
            >
              🏪
            </div>

            <div style={{ padding: "20px" }}>
              <h3 style={{ margin: 0 }}>{business.name}</h3>

              <p style={{ color: "#666" }}>{business.category}</p>

              <p>📍 {business.location}</p>

              <p>⭐ {business.rating}</p>

              <button
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "12px",
                  background: "#1D7A3F",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
