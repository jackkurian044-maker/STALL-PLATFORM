export default function Navbar() {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e5e5e5",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "72px",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#1D7A3F",
          }}
        >
          STALL
        </div>

        <nav
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Explore
          </button>

          <button
            style={{
              background: "#1D7A3F",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
