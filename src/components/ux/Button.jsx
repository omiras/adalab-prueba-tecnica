export default function Button({ children }) {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid rgba(0,0,0,0.2)",
        margin: "1rem auto",
        width: "100%",
        maxWidth: "250px",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
}
