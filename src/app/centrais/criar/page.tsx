"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCentralsCountStore } from "../../../stores/useCentralsCountStore";
const { incrementCount } = useCentralsCountStore();

const macRegex = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;

const CentralSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  mac: z.string().regex(macRegex, "MAC inválido"),
  modelId: z.string().min(1, "Modelo obrigatório"),
});

type CentralForm = z.infer<typeof CentralSchema>;

export default function CreateCentral() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CentralForm>({
    resolver: zodResolver(CentralSchema),
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [models, setModels] = useState<{ id: number; name: string }[]>([]);

  const { data: modelsData } = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models`);
      return res.json();
    },
  });

  useEffect(() => {
    if (modelsData) {
      setModels(modelsData);
    }
  }, [modelsData]);

  const { data: centralsData = [] } = useQuery({
    queryKey: ["centrals"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/centrals`);
      return res.json();
    },
  });

  const createCentral = useMutation({
    mutationFn: (newCentral: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/centrals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCentral),
      }),
    onSuccess: () => {
      incrementCount();
      queryClient.invalidateQueries({ queryKey: ["centrals"] });
      router.push("/centrais");
    },
  });

  const onSubmit = (data: CentralForm) => {
    const macExists = centralsData.some((c: any) => c.mac === data.mac);
    if (macExists) {
      setError("mac", { message: "MAC já cadastrado" });
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("mac", data.mac);
    formData.append("modelId", data.modelId);

    createCentral.mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Criar Central</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Nome</label>
          <input {...register("name")} className="border p-2 w-full" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block">MAC</label>
          <input
            {...register("mac")}
            placeholder="XX:XX:XX:XX:XX:XX"
            className="border p-2 w-full"
          />
          {errors.mac && <p className="text-red-500">{errors.mac.message}</p>}
        </div>

        <div>
          <label className="block">Modelo</label>
          <select {...register("modelId")} className="border p-2 w-full">
            <option value="">Selecione um modelo</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          {errors.modelId && (
            <p className="text-red-500">{errors.modelId.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Criar
        </button>
      </form>
    </div>
  );
}
