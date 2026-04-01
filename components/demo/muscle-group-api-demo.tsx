"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {z} from "zod"
import {useQuery} from "@tanstack/react-query"
import {fetchAvailableMuscleGroups} from "@/actions/muscleGroupApiActions"
import {HeartPulseIcon, Loader, Loader2} from "lucide-react"
import {useMemo, useState} from "react"
import MuscleGroupAPIDemoForm from "@/components/demo/muscle-group-api-demo-form";
import Image from "next/image";

export default function MuscleGroupAPIDemo() {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false) // Neuer State

  const {isPending, data: availableMuscleGroups} = useQuery({
    queryKey: ["availableMuscleGroups"],
    queryFn: fetchAvailableMuscleGroups
  })

  const muscleGroupApiInputSchema = useMemo(() => {
    return getMuscleGroupApiInputSchema(availableMuscleGroups || [])
  }, [availableMuscleGroups])

  const onSubmit = (data: z.infer<typeof muscleGroupApiInputSchema>) => {
    const url = new URL("https://gym-api.mertendieckmann.de/getImage")
    url.searchParams.append("muscleGroups", data.muscleGroups.join(","))
    url.searchParams.append("color", data.color)
    url.searchParams.append("transparentBackground", data.transparentBackground ? "1" : "0")

    if (url.toString() === imageUrl) return

    setIsImageLoading(true)
    setImageUrl(url.toString())
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="font-headline text-base">Demo</CardTitle>
        <CardDescription>Go ahead and test out the basic endpoint of the API.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending || !availableMuscleGroups ? (
          <Loader/>
        ) : (
          <div className="flex flex-row gap-16 justify-between items-end flex-wrap md:flex-nowrap">
            <MuscleGroupAPIDemoForm
              muscleGroupApiInputSchema={muscleGroupApiInputSchema}
              availableMuscleGroups={availableMuscleGroups}
              onSubmit={onSubmit}
            />

            <div className="relative h-[300px] w-[300px] bg-muted shrink-0 overflow-hidden rounded-md">
              {imageUrl === "" ? (
                <div className="flex items-center justify-center h-full w-full text-muted-foreground text-xs text-center p-4">
                  Select muscle groups and a color to generate a preview
                </div>
              ) : (
                <>
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                  <Image
                    src={imageUrl}
                    width={300}
                    height={300}
                    alt="Muscle groups"
                    className={`transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsImageLoading(false)} // Versteckt Loader, wenn fertig
                  />
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function getMuscleGroupApiInputSchema(availableMuscleGroups: string[]) {
  return z.object({
    muscleGroups: z
      .array(z.string())
      .min(1, "At least one muscle group must be provided")
      .refine((data) => data.every((group) => availableMuscleGroups.includes(group)), {
        message: "At least one muscle group is not available",
      }),
    color: z
      .string()
      .regex(
        /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$|^(?:\d{1,3},){2}\d{1,3}$/,
        "Invalid color format. Use HEX (#FF0000) or RGB (255,0,0)"
      ),
    transparentBackground: z.boolean()
  })
}