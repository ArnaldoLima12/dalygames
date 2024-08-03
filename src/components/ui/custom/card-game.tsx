import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { gameProps } from "@/lib/types/game";
import { Gamepad } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

interface gameCardProps {
    data: gameProps
}

export function CardGame({ data }: gameCardProps) {
    return (
        <Link href={`/game/${data.id}`} className="max-md:w-[90%] w-[33%] min-w-[300px] p-3 hover:scale-105 transition-all hover:animate-pulse duration-300">
            <Card className="p-2">
                <CardContent className="h-56 max-h-56 relative">
                    <Image
                        className="rounded-lg object-cover"
                        quality={100}
                        src={data.image_url}
                        alt={data.title}
                        fill={true}
                        sizes="(max-width: 720px) 100vw, (max-width: 1200px) 44vw"
                        priority
                       
                    />
                </CardContent>
                <div className="p-1 flex justify-between items-center gap-2	">
                    <p className=" text-ellipsis truncate whitespace-nowrap">{data.title}</p>
                    <Gamepad/>
                </div>
            </Card>
        </Link>
    )
}