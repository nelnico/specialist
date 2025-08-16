import { DEFAULT_PAGE_SIZE } from "@/lib/config/config";
import { z } from "zod";

export const SelectOption = z.object({
  label: z.string(),
  value: z.string(),
});

export const SpecialistSearchSchema = z.object({
  page: z.number().optional().default(0),
  pageSize: z.number().optional().default(60),
  query: z.string().trim().optional().default(""),
  genderIds: z.array(SelectOption).optional(),
  provinceId: z.number().optional(),
  sortOption: z.string().optional(),
});

export type SpecialistSearchForm = z.infer<typeof SpecialistSearchSchema>;

export const DefaultSpecialistSearchParams: SpecialistSearchForm =
  SpecialistSearchSchema.parse({
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    query: "",
    genderIds: [],
    provinceId: undefined,
    sortOption: "newest",
  });
