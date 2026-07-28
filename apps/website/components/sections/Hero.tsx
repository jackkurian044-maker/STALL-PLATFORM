export default function Hero() {
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <input
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
      </div>
    </section>
  );
}
