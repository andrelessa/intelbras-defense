"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  mac: z.string().regex(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, "MAC inválido"),
  modelId: z.string().nonempty("Modelo obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function EditCentral() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: central } = useQuery({
    queryKey: ["central", id],
    queryFn: () =>
      fetch(`http://localhost:3001/centrals/${id}`).then((res) => res.json()),
  });

  const { data: models = [] } = useQuery({
    queryKey: ["models"],
    queryFn: () =>
      fetch(`http://localhost:3001/models`).then((res) => res.json()),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (central) {
      setValue("name", central.name);
      setValue("mac", central.mac);
      setValue("modelId", central.modelId);
    }
  }, [central, setValue]);

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      fetch(`http://localhost:3001/centrals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrals"] });
      router.push("/centrais");
    },
  });

  function onSubmit(data: FormData) {
    mutation.mutate(data);
  }

  function formatMac(value: string) {
    return (
      value
        .replace(/[^A-Fa-f0-9]/g, "")
        .match(/.{1,2}/g)
        ?.join(":")
        .slice(0, 17) || ""
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Editar Central</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label>Nome:</label>
          <input {...register("name")} />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>

        <div>
          <label>MAC:</label>
          <input
            {...register("mac")}
            onChange={(e) => setValue("mac", formatMac(e.target.value))}
          />
          {errors.mac && (
            <span style={{ color: "red" }}>{errors.mac.message}</span>
          )}
        </div>

        <div>
          <label>Modelo:</label>
          <select {...register("modelId")}>
            <option value="">Selecione...</option>
            {models.map((model: any) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          {errors.modelId && (
            <span style={{ color: "red" }}>{errors.modelId.message}</span>
          )}
        </div>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
