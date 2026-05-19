import { zodResolver } from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {z} from "zod";
import {MultiSelect} from "@/components/ui/multi-select";
import {getMuscleGroupApiInputSchema} from "@/components/demo/muscle-group-api-demo";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ImageIcon} from "lucide-react";
import {Label} from "@/components/ui/label";
import { ThemedTwitterPicker } from "@/components/ui/themed-twitter-picker";

interface MuscleGroupApiDemoForm {
  muscleGroupApiInputSchema: ReturnType<typeof getMuscleGroupApiInputSchema>,
  availableMuscleGroups: string[],
  onSubmit: (data: z.infer<ReturnType<typeof getMuscleGroupApiInputSchema>>) => void
  className?: string
}

function MuscleGroupAPIDemoForm({muscleGroupApiInputSchema, availableMuscleGroups, onSubmit, className}: MuscleGroupApiDemoForm) {

  const {handleSubmit, control, formState: {errors}} = useForm<z.infer<typeof muscleGroupApiInputSchema>>({
    resolver: zodResolver(muscleGroupApiInputSchema),
    defaultValues: {
      muscleGroups: [],
      color: "#b0d09c",
      transparentBackground: true,
    }
  })

  return <form onSubmit={handleSubmit(onSubmit)} className={`flex w-full flex-col gap-6 ${className}`}>
    {/* Muscle Groups */}
    <div className="flex flex-col gap-2">

      <Label>Muscle Groups</Label>
      <Controller
        control={control}
        name="muscleGroups"
        render={({field}) => (
          <MultiSelect
            variant="inverted"
            options={availableMuscleGroups.map(group => {
              return {value: group, label: group}
            })}
            onValueChange={(value) => {
              field.onChange(value)
            }}
          />
        )}
      />
      {errors.muscleGroups && <span className="text-destructive text-sm">{errors.muscleGroups.message}</span>}
    </div>

    {/* Color */}
    <div className="flex flex-col gap-2">
      <Label>Color</Label>
      <Controller
        control={control}
        name="color"
        render={({field}) => (
          <ThemedTwitterPicker value={field.value} onChangeAction={(hex) => field.onChange(hex)} />
        )}
      />
      {errors.color && <span className="text-destructive text-sm">{errors.color.message}</span>}
    </div>

    {/* Transparent Background */}
    <div className="flex items-center gap-2">
      <Controller
        control={control}
        name="transparentBackground"
        render={({field}) => (
          <Checkbox id="transparentBackground" checked={field.value} onCheckedChange={(checked) => field.onChange(checked)}/>
        )}
      />
      <Label htmlFor="transparentBackground">Transparent Background</Label>
      {errors.transparentBackground && <span className="text-destructive text-sm">{errors.transparentBackground.message}</span>}
    </div>

    <Button type="submit" className="max-w-xs self-end mt-2">
      <ImageIcon className="mr-2 h-4 w-4" />
      Generate Image
    </Button>
  </form>
}

export default MuscleGroupAPIDemoForm