import z from "zod"

export const storeSchema = z.object({
    name: z.string("Tiene que ser un String").nonempty("Este campo no debe estar vacío"),
    image: z.url("Debe ser una URL (ej: https://dominio.com/image.png)").nonempty("Este campo no debe estar vacío"),
    description: z.string().optional().or(z.literal(""))
})

export type StoreSchema = z.infer<typeof storeSchema>
