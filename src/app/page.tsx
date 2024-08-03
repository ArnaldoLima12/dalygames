import { CardGame } from "@/components/ui/custom/card-game";
import { FormC } from "@/components/ui/custom/input-search";
import { gameProps } from "@/lib/types/game";
import { Gamepad2 } from "lucide-react"
import Image from "next/image";
import Link from "next/link";


async function getDalyGame() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { next: { revalidate: 320 } });
    return response.json();
  }
  catch (error) {
    console.log(error);
  }
}

async function getGames() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, { cache: 'force-cache' });
    return response.json();
  }
  catch (error) {
    console.log(error);
  }
}

export default async function Home() {

  const dalyGame: gameProps = await getDalyGame();
  const games: gameProps[] = await getGames();

  return (
    <main className="flex flex-col items-center justify-between gap-5">
      <div className="w-full flex justify-center flex-col gap-3 text-center mb-10">
        <h1 className="text-2xl font-bold animate-bounce">Separamos um jogo exclusivo para você!</h1>

        <Link href={`game/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative rounded-lg">
              <Image
                className="max-h-96 object-cover rounded-lg opacity-40 hover:opacity-80 transition-all duration-300"
                fill={true}
                sizes="(max-width: 720px) 100vw, (max-width: 1200px) 44vw"
                src={dalyGame.image_url}
                alt={dalyGame.title}
                quality={100}
                priority={true}
              />
              <div className="p-2 absolute flex gap-2 bottom-0 items-center">
                <p className="font-bol text-xl text-white">{dalyGame.title}</p>
                <Gamepad2 size={25} color="white" />
              </div>
            </div>
          </section>
        </Link>
      </div>

      <div className="w-full">
        <FormC />
        <section className="mt-5">
          <h2 className="font-bold text-xl">Jogos para conhecer</h2>

          <article className="w-full flex flex-wrap items-center justify-start gap-1 mt-2 max-sm:flex-col max-lg:justify-center">
            {games.map(game => (
              <CardGame data={game} key={game.id} />
            ))}
          </article>
        </section>
      </div>

    </main>
  );
}
