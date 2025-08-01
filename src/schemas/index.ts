import z from "zod";

export const loginFormData = z.object({
    username: z.string("Tiene que ser un String").nonempty("Este campo no debe estar vacío"),
    password: z.string("Tiene que ser un String").nonempty("Este campo no debe estar vacío")
})

export type LoginFormData = z.infer<typeof loginFormData>

const USERNAME_PATTERN = /^[a-zA-Z0-9._]+$/
export const registerFormData = z.object({
    name: z.string("El nombre deber ser de tipo 'string'")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre debe tener menos de 50 caracteres"),
    username: z.string("El usuario deber ser de tipo 'string'")
        .regex(USERNAME_PATTERN, "Debe tener solo letras, guiones bajos, puntos o números.")
        .min(3, "El usuario debe tener al menos 3 caracteres")
        .max(50, "El usuario debe tener menos de 50 caracteres"),
    password: z.string("La contraseña deber ser de tipo 'string'")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(50, "La contraseña debe tener menos de 50 caracteres"),
})

export type RegisterFormData = z.infer<typeof registerFormData>


export const shopCreationFormData = z.object({
    name: z.string("Tiene que ser un String").nonempty("Este campo no debe estar vacío"),
    image: z.url("Debe ser una URL (ej: https://dominio.com/image.png)").nonempty("Este campo no debe estar vacío"),
    description: z.string().optional().or(z.literal(""))
})

export type ShopCreationFormData = z.infer<typeof shopCreationFormData>


export const productCreationFormData = z.object({
    name: z.string("Tiene que ser un String").nonempty("Este campo no debe estar vacío"),
    image: z.url("Debe ser una URL (ej: https://dominio.com/image.png)").nonempty("Este campo no debe estar vacío"),
    description: z.string().optional().or(z.literal("")),
    price: z.number("Este campo debe ser de tipo número").min(0),
    quantity: z.number("Este campo debe ser de tipo número").min(1)
})

export type ProductCreationFormData = z.infer<typeof productCreationFormData>