import React from "react";
import { useCentralsCountStore } from "../stores/useCentralsCountStore";

export const Header: React.FC = () => {
  const totalCentrals = useCentralsCountStore((state) => state.totalCentrals);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#1f2937",
          margin: "0 0 1rem 0",
        }}
      >
        Sistema de Centrais
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontSize: "1.125rem", color: "#6b7280" }}>
          Total de centrais cadastradas:
        </span>
        <span
          style={{
            backgroundColor: "#449f25",
            color: "#fff",
            fontSize: "1.25rem",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            minWidth: "3rem",
            display: "inline-block",
          }}
        >
          {totalCentrals}
        </span>
      </div>
    </div>
  );
};
