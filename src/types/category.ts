
import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  status: z.enum(["Active", "Inactive"]),
  image: z.string().optional()
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export interface Category {
  id: number;
  name: string;
  slug: string;
  products: number;
  subcategories: number;
  status: "Active" | "Inactive";
  image: string;
}
