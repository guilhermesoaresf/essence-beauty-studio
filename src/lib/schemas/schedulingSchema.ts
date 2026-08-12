import { z } from "zod";

export const schedulingSchema = z.object({
  fullName: z.string().trim()
             .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().trim()
          .nonempty('E-mail obrigatório')
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail inválido"),
  phone: z.string()
          .nonempty("O telefone é obrigatório")
          .regex(
            /^\(\d{2}\) \d{5}-\d{4}$/,
            "Formato inválido"
          ),
  desiredService: z.string()
                   .min(1, "Selecione um serviço"),
  preferredDate: z.string().trim()
                  .nonempty('A data é obrigatória')
                  .regex(
                    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                    "Data inválida"
                  )
                  .refine((value) => {
                    const [day, month, year] = value.split('/').map(Number);
                    const date = new Date(year, month-1, day);
                    return (
                      date.getFullYear() === year &&
                      date.getMonth() === month - 1 &&
                      date.getDate() === day
                    )
                  }, "Data inválida")
                  .refine((value) => {
                    const [day, month, year] = value.split('/').map(Number);
                    const inputDate = new Date(year, month-1, day);
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    return inputDate >= today;
                  }, "A data não pode estar no passado")
                  .refine((value) => {
                    const [day, month, year] = value.split('/').map(Number);
                    const date = new Date(year, month-1, day);
                    const weekDay = date.getDay();
                    return weekDay !== 0;
                  }, "O estabelecimento está fechado nos domingos"),
  preferredTime: z.string().trim()
                  .nonempty('O horário é obrigatório')
                  .regex(
                   /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
                   "Horário inválido"
                  )
                  .refine((value) => {
                   const [hour, minute] = value.split(':').map(Number);
                   return (
                     hour >= 8 && (hour <= 21 || (hour === 22 && minute === 0))
                   )
                  }, "Estabelecimento fechado nesse horário"),
  observations: z.string().optional(),
  desiredProfessional: z.string().optional()
}).refine((data) => {
  const [day, month, year] = data.preferredDate.split("/").map(Number);
  const [hour, minute] = data.preferredTime.split(":").map(Number);

  const selectedDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute
  );

  return selectedDate >= new Date();
}, {
  message: "O horário escolhido já passou",
  path: ["preferredTime"]
});

export type SchedulingData = z.infer<typeof schedulingSchema>;
