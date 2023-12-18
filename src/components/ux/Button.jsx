export default function Button({ children }) {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid black",
        margin: "1rem auto",
        width: "200px",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
}
