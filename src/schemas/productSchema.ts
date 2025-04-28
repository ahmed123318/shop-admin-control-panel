
import { z } from "zod";
import { ProductStatus } from "@/types/product";

export const productSchema = z.object({
  name: z.string()
    .min(3, "Product name must be at least 3 characters")
    .max(255, "Product name cannot exceed 255 characters"),
  description: z.string()
    .min(10, "Description must be at least 10 characters"),
  quantity: z.coerce.number()
    .min(0, "Quantity cannot be negative"),
  price: z.coerce.number()
    .min(0, "Price cannot be negative"),
  coverImage: z.string()
    .min(1, "Cover image is required"),
  images: z.array(z.string())
    .min(1, "At least one product image is required"),
  colors: z.array(
    z.object({
      name: z.string().min(1, "Color name is required"),
      code: z.string().optional(),
    })
  ).optional(),
  weight: z.coerce.number()
    .min(0, "Weight cannot be negative")
    .optional(),
  weightUnit: z.enum(["g", "kg"]).default("g"),
  dimensions: z.object({
    length: z.coerce.number().min(0, "Length cannot be negative"),
    width: z.coerce.number().min(0, "Width cannot be negative"),
    height: z.coerce.number().min(0, "Height cannot be negative"),
  }).optional(),
  warranty: z.string().optional(),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.ACTIVE),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  brandId: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
