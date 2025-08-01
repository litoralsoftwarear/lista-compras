import IProduct from "./Product.interface"

interface IStore {
    id: number
    name: string
    description: string
    image: string

    products: IProduct[]

    createdAt: Date
}

export default IStore