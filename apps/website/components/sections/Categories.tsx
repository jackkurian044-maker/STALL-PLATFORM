const categories = [
  { icon: "💐", name: "Flowers" },
  { icon: "✂️", name: "Salon" },
  { icon: "🧵", name: "Tailor" },
  { icon: "🛒", name: "Grocery" },
  { icon: "🍴", name: "Restaurant" },
  { icon: "🔧", name: "Electrician" },
  { icon: "💊", name: "Pharmacy" },
  { icon: "🍰", name: "Bakery" },
];

export default function Categories() {
  return (
    <section style={{ padding: "50px 0" }}>
      <h2
        style={{
          fontSize: "34px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Popular Categories
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
          gap: "20px",
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,.08)",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <div style={{ fontSize: "42px" }}>{cat.icon}</div>

            <h3
              style={{
                marginTop: "15px",
                fontSize: "18px",
              }}
            >
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
