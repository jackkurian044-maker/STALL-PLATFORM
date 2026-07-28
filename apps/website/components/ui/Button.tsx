type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#1D7A3F",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "14px 24px",
        cursor: "pointer",
        fontWeight: 600,
        transition: "0.2s",
      }}
    >
      {children}
    </button>
  );
}
