"use client"

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Search } from 'lucide-react';

interface search {
  game: string
}

export function FormC() {

  const router = useRouter();

  const { register, handleSubmit } = useForm<search>();
 
  const onSubmit = ( { game } : search) => {

    if(game === '') return;
    router.push(`/game/search/${game}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center">
      <Input placeholder="Procurando algum jogo?" {...register('game')} />
      <Button type="submit" variant={'outline'} size="icon" ><Search size={20} /></Button>
    </form>
  )
}
