"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {z} from "zod"
import {useQuery} from "@tanstack/react-query"
import {fetchAvailableMuscleGroups} from "@/actions/muscleGroupApiActions"
import {ImageIcon, Loader2} from "lucide-react"
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
        <CardTitle className="font-headline text-2xl">Demo</CardTitle>
        <CardDescription>Go ahead and test out the basic endpoint of the API. Select your muscle groups and customize the color.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending || !availableMuscleGroups ? (
          <div className="flex h-[300px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <MuscleGroupAPIDemoForm
              muscleGroupApiInputSchema={muscleGroupApiInputSchema}
              availableMuscleGroups={availableMuscleGroups}
              onSubmit={onSubmit}
            />

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative h-[300px] w-[300px] bg-muted/50 border border-border shadow-sm shrink-0 overflow-hidden rounded-xl flex items-center justify-center">
                {imageUrl === "" ? (
                  <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground text-sm text-center p-6 gap-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                    <span>Select muscle groups and a color to generate a preview</span>
                  </div>
                ) : (
                  <>
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    )}
                    <Image
                      src={imageUrl}
                      width={300}
                      height={300}
                      alt="Selected muscle groups"
                      className={`transition-opacity duration-300 object-contain ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => setIsImageLoading(false)}
                    />
                  </>
                )}
              </div>
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