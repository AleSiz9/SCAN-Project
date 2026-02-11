import { z } from 'zod';

export const SearchSchema = z.object({
  inn: z.string()
    .min(1, "ИНН обязателен")
    .regex(/^\d+$/, "Введите корректные данные")
    .min(10, "ИНН должен содержать минимум 10 цифр")
    .max(12, "ИНН должен содержать максимум 12 цифр"),

  tonality: z.enum(["positive", "negative", "neutral", "any"], {
    errorMap: () => ({
      message: "Выберите корректную тональность"
    })
  }),

  documentCount: z.coerce
    .number()
    .min(1, "Обязательное поле")
    .max(100, "Максимум 100 документов"),

  startDate: z.string()
    .min(1, "Начальная дата обязательна")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate <= today;
    }, {
      message: "Введите корректные данные"
    }),
  endDate: z.string()
    .min(1, "Конечная дата обязательна")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return selectedDate <= today;
    }, {
      message: "Введите корректные данные"
    }),
  maxFullness: z.boolean().default(true),
  inBusinessNews: z.boolean().default(false),
  onlyMainRole: z.boolean().default(true),
  onlyWithRiskFactors: z.boolean().default(false),
  includeTechNews: z.boolean().default(false),
  includeAnnouncements: z.boolean().default(false),
  includeDigests: z.boolean().default(false),
}).refine((data) => {
  if (!data.startDate || !data.endDate) return true;
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: "Введите корректные данные",
  path: ["endDate"]
});