import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Edit3, Minus, Plus } from "lucide-react"
import IProduct from "@/interfaces/Product.interface"
import { useAppDispatch } from "@/store"
import { editProduct } from "@/store/features/storesSlice"

const ProductQuantity: React.FC<{ data: IProduct }> = ({ data }) => {
    const [editable, setEditable] = useState(false)
    const [quantity, cheCambia] = useState(data.quantity.toString())
    const dispatch = useAppDispatch()

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = e.target.value
        cheCambia(newQuantity)
    }

    const controlQuantity  = (type: "increment" | "decrement") => {
        const newQuantity = type === "increment" ? parseInt(quantity) + 1 : parseInt(quantity) - 1
        cheCambia(newQuantity.toString())
        dispatch(editProduct({ productId: data.id, shopId: data.shopId, data: { quantity: newQuantity } }))
    }

    const handleSave = () => {
        const newQuantity = parseInt(quantity)
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            setEditable(false)
            dispatch(editProduct({ productId: data.id, shopId: data.shopId, data: { quantity: newQuantity } }))
        }
    }

    const handleCancel = () => {
        setEditable(false)
        cheCambia(data.quantity.toString())
    }

    return (
        <>
            {editable ? (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleSave}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                            ✓
                        </Button>
                        <Input className="w-[60px] h-8 text-center" type="text" onChange={handleQuantityChange} value={quantity} />
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancel}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                        >
                            ✕
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => controlQuantity("decrement")}
                            disabled={data.quantity <= 0}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Minus className="w-3 h-3" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditable(true)}
                            className="h-8 w-[60px] px-3 font-medium hover:bg-blue-50 hover:text-blue-600"
                        >
                            {data.quantity}
                            <Edit3 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => controlQuantity("increment")}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-green-600 hover:bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Plus className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductQuantity