import { CardGame } from "@/components/ui/custom/card-game";
import { Badge } from "@/components/ui/badge";
import { gameProps } from "@/lib/types/game"
import { redirect } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";



interface PageProps {
    params: {
        id: string
    }
}

export async function generateMetadata( {params} : PageProps) : Promise<Metadata> {
    try 
    {
        const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { cache: 'force-cache' })
        .then(response => response.json())
        .catch(() => {
            return {
                title : 'DalyGames'
            }
        });

        return {
            title: `DalyGames - ${response.title}`,
            description: `${response.description.slice(0, 100)}...`,
            openGraph: {
                title: response.title,
                images: [response.image_url]
            }
        }

    }
    catch (error)
    {
        return {
            title: 'DalyGames'
        }
    }
}

async function gameDetails(id: number) {

    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { cache: 'force-cache' });
        return response.json();
    }
    catch (error) {
        console.log(error);
    }
}

async function gameRecommended() {
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { next: { revalidate: 120 } });
        return response.json();
    }
    catch (error) {
        console.log(error);
    }
}




export default async function Games({ params: { id } }:{ params: { id: number } }) {

    const game: gameProps = await gameDetails(id);
    if(!game) redirect('/');
    const recommended: gameProps = await gameRecommended();


    return (
        <main className="flex flex-col items-center justify-between gap-5">
            <section className="w-full relative h-80 bg-black rounded-md">
                <Image
                    className="object-cover rounded-md opacity-50 hover:opacity-90 transition-all duration-300"
                    quality={100}
                    fill={true}
                    priority={true}
                    sizes="(max-width: 720px) 100vw, (max-width: 1200px) 44vw"
                    src={game.image_url}
                    alt={game.title}
                />
            </section>

            <section className="w-full">
                <article>
                    <h2 className="font-bold text-2xl mb-5">{game.title}</h2>
                    <p className="text-justify">{game.description}</p>

                    <h3 className="font-bold text-xl mt-5 mb-2">Plataformas disponíveis:</h3>
                    <div className="flex gap-3">
                        {game.platforms.map(platform => (
                            <Badge key={platform.length}>{platform}</Badge>
                        ))}
                    </div>

                    <h4 className="font-bold text-xl mt-5 mb-2">Categorias:</h4>
                    <div className="flex gap-3">
                        {game.categories.map(categorie => (
                            <Badge key={categorie.length} variant={'secondary'}>{categorie}</Badge>
                        ))}
                    </div>

                    <h5 className="font-bold text-xl mt-5">Lançamento: <span className="text-md font-normal text-base">{game.release}</span></h5>
                </article>
            </section>

            <section className="w-full">
                <p className="font-bold text-xl mt-5">Recomendamos:</p>
                <CardGame data={recommended} />
            </section>
        </main>
    )
}