import { CardGame } from "@/components/ui/custom/card-game";
import { gameProps } from "@/lib/types/game";

async function getSearch(name: string) {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${name}`, { cache: 'no-cache' })
    return response.json();
}

export default async function Search({ params: { name } } : { params: { name: string } }) {

    const decodeName = decodeURI(name);

    const search: gameProps[] = await getSearch(decodeName);

    return (
        <main className="flex flex-col items-start justify-between gap-2">

            <h2 className="text-xl font-bold mt-2">Resultados para: <span className="text-green-400 text-base">{decodeName}</span></h2>

            <article className="w-full flex flex-wrap items-center justify-start gap-1 mt-2 max-sm:flex-col max-lg:justify-center">
                {search !== null ? (
                    search.map(game => (
                        <CardGame key={game.id} data={game} />
                    ))
                ) : (
                    <div className="w-full">
                        <p className="text-center font-bold text-2xl">Nada resultado para a busca...</p>
                    </div>
                )}
            </article>
            
        </main>
    )
}