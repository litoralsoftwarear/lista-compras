import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import IStore from "@/interfaces/Store.interface"
import { Edit } from "lucide-react"
import StoreUpdateForm from "../store-update-form"

const getInitials = (name: string) => {
    const parts = name.split(" ")

    return parts.map(part => part.at(0)).join("")
}

const StoreItem: React.FC<{ data: IStore }> = ({ data }) => {
    return (
        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-75">
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={data.image} />
                        <AvatarFallback>{getInitials(data.name)}</AvatarFallback>
                    </Avatar>
                    <Tooltip>
                        <TooltipTrigger className="overflow-hidden">
                            <p className="text-left text-sm text-foreground truncate">
                                {data.name}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-left text-sm">{data.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>


                {!data.description && <p className="text-left text-sm">{"Sin descripción"}</p>}
                {data.description &&
                    <Tooltip>
                        <TooltipTrigger className="overflow-hidden">
                            <p className="text-left text-sm text-foreground truncate">
                                {data.description}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-left text-sm">{data.description}</p>
                        </TooltipContent>
                    </Tooltip>
                }

                <div className="flex gap-5">
                    <Button className="flex-auto bg-indigo-500 hover:bg-indigo-700">Gestionar tienda</Button>
                    <StoreUpdateForm
                        data={data}
                        trigger={<Button variant={"outline"}><Edit /></Button>}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default StoreItem