import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as styles from "./styles.css";

const schema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  mac: z.string().regex(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, "MAC inválido"),
  modelId: z.string().nonempty("Modelo obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function CreateCentralModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const macValue = watch("mac") || "";

  const { data: models = [] } = useQuery({
    queryKey: ["models"],
    queryFn: () =>
      fetch("http://localhost:3001/models").then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: (newCentral: FormData) =>
      fetch("http://localhost:3001/centrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCentral),
      }).then((res) => {
        if (!res.ok) throw new Error("Erro ao criar central");
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrals"] });
      toast.success("Central criada com sucesso!");
      onClose();
      router.push("/centrais");
    },
    onError: () => {
      toast.error("Erro ao criar central.");
    },
  });

  function onSubmit(data: FormData) {
    mutation.mutate(data);
  }

  if (!isOpen) return null;

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
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Criar Central</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <label>Nome:</label>
            <input
              className={styles.input}
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <span role="alert" className={styles.error}>
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label>MAC:</label>
            <input
              className={styles.input}
              {...register("mac")}
              value={macValue}
              onChange={(e) => setValue("mac", formatMac(e.target.value))}
              placeholder="XX:XX:XX:XX:XX:XX"
              aria-invalid={errors.mac ? "true" : "false"}
            />
            {errors.mac && (
              <span role="alert" className={styles.error}>
                {errors.mac.message}
              </span>
            )}
          </div>
          <div>
            <label>Modelo:</label>
            <select
              className={styles.input}
              {...register("modelId")}
              aria-invalid={errors.modelId ? "true" : "false"}
            >
              <option value="">Selecione...</option>
              {models.map((model: any) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            {errors.modelId && (
              <span role="alert" className={styles.error}>
                {errors.modelId.message}
              </span>
            )}
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Criar
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
