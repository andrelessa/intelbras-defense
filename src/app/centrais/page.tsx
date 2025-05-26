"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as styles from "./CentralsList.css";
import { CreateCentralModal } from "../../presentation/components/ui/modal/CreateCentralModal";
import toast from "react-hot-toast";
import { useCentralsCountStore } from "../../stores/useCentralsCountStore";
import { Header } from "../../components/Header";

export default function CentralsList() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateTotalCentrals = useCentralsCountStore(
    (state) => state.updateTotalCentrals
  );
  const decrementCount = useCentralsCountStore((state) => state.decrementCount);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "model">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data: centrals = [] } = useQuery({
    queryKey: ["centrals"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/centrals");
      const data = await res.json();

      updateTotalCentrals(data.length);

      return data;
    },
  });

  const { data: models = [] } = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/models");
      return res.json();
    },
  });

  useEffect(() => {
    updateTotalCentrals(centrals.length);
  }, [centrals.length]);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`http://localhost:3001/centrals/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrals"] });
      decrementCount();

      setConfirmDeleteId(null);
      toast.success("Central excluída com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir a central.");
    },
  });

  const enrichedCentrals = useMemo(() => {
    return centrals.map((central: any) => ({
      ...central,
      modelName:
        models.find((m: any) => m.id === central.modelId)?.name ||
        "Desconhecido",
    }));
  }, [centrals, models]);

  const filtered = useMemo(() => {
    return enrichedCentrals.filter(
      (c: any) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.modelName.toLowerCase().includes(search.toLowerCase())
    );
  }, [enrichedCentrals, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const fieldA = sortBy === "name" ? a.name : a.modelName;
      const fieldB = sortBy === "name" ? b.name : b.modelName;
      return sortOrder === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });
  }, [filtered, sortBy, sortOrder]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [sorted, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // Função para exportar CSV
  const exportToCSV = () => {
    if (sorted.length === 0) {
      toast.error("Nenhum dado para exportar");
      return;
    }

    // Cabeçalhos do CSV
    const headers = ["Nome", "MAC", "Modelo"];

    // Dados das centrais (usando os dados filtrados e ordenados)
    const csvData = sorted.map((central: any) => [
      central.name,
      central.mac,
      central.modelName,
    ]);

    // Combinar cabeçalhos com dados
    const allData = [headers, ...csvData];

    // Converter para formato CSV
    const csvContent = allData
      .map((row) =>
        row
          .map((field) =>
            // Escapar aspas duplas e envolver campos que contêm vírgulas/quebras de linha
            typeof field === "string" &&
            (field.includes(",") || field.includes('"') || field.includes("\n"))
              ? `"${field.replace(/"/g, '""')}"`
              : field
          )
          .join(",")
      )
      .join("\n");

    // Criar nome do arquivo com data atual
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const filename = `centrals-export-${currentDate}.csv`;

    // Criar blob e fazer download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Arquivo ${filename} exportado com sucesso!`);
    } else {
      toast.error("Seu navegador não suporta download de arquivos");
    }
  };

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>Centrais</h1>

        <div className={styles.actions}>
          <input
            type="text"
            placeholder="Buscar por Nome ou Modelo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
          />
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className={styles.input}
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n} por página
              </option>
            ))}
          </select>
          <button onClick={() => setModalOpen(true)} className={styles.button}>
            Criar Central
          </button>
          <button
            onClick={exportToCSV}
            className={styles.button}
            style={{ backgroundColor: "#28a745", marginLeft: "0.5rem" }}
          >
            Exportar CSV
          </button>
          <CreateCentralModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th
                className={styles.th}
                onClick={() => {
                  if (sortBy === "name")
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                  else {
                    setSortBy("name");
                    setSortOrder("asc");
                  }
                }}
              >
                Nome {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className={styles.th}
                onClick={() => {
                  if (sortBy === "model")
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                  else {
                    setSortBy("model");
                    setSortOrder("asc");
                  }
                }}
              >
                Modelo {sortBy === "model" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className={styles.th}>MAC</th>
              <th className={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((central: any) => (
              <tr key={central.id}>
                <td
                  className={styles.td}
                  onClick={() => router.push(`/centrais/${central.id}/editar`)}
                >
                  {central.name}
                </td>
                <td className={styles.td}>{central.modelName}</td>
                <td className={styles.td}>{central.mac}</td>
                <td className={styles.td}>
                  <button
                    onClick={() => setConfirmDeleteId(central.id)}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={4} className={styles.td}>
                  Nenhuma central encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={styles.button}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className={styles.button}
          >
            Próxima
          </button>
        </div>

        {confirmDeleteId !== null && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
              <p>Tem certeza que deseja excluir?</p>
              <div
                style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}
              >
                <button
                  onClick={() => deleteMutation.mutate(confirmDeleteId)}
                  className={styles.button}
                  style={{ backgroundColor: "red" }}
                >
                  Sim
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className={styles.button}
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
