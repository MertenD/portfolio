import { zodResolver } from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {z} from "zod";
import {MultiSelect} from "@/components/ui/multi-select";
import {
  ColorPicker, ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent, ColorPickerEyeDropper, ColorPickerFormatSelect, ColorPickerHueSlider, ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger
} from "@/components/ui/color-picker";
import {getMuscleGroupApiInputSchema} from "@/components/demo/muscle-group-api-demo";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ImageIcon} from "lucide-react";

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
      <label>MuscleGroups</label>
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
      {errors.muscleGroups && <span className="text-red-400">{errors.muscleGroups.message}</span>}
    </div>

    {/* Color */}
    <div className="flex flex-col gap-2">
      <label>Color</label>
      <Controller
        control={control}
        name="color"
        render={({field}) => (
          <ColorPicker
            defaultFormat="hex"
            defaultValue={field.value}
            onValueChange={(value) => field.onChange(value)}
          >
            <ColorPickerTrigger asChild>
              <ColorPickerSwatch className="w-full h-[60px]"/>
            </ColorPickerTrigger>
            <ColorPickerContent className="w-full">
              <ColorPickerArea/>
              <div className="flex items-center gap-2">
                <ColorPickerEyeDropper/>
                <div className="flex flex-1 flex-col gap-2">
                  <ColorPickerHueSlider/>
                  <ColorPickerAlphaSlider/>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ColorPickerFormatSelect/>
                <ColorPickerInput/>
              </div>
            </ColorPickerContent>
          </ColorPicker>
        )}
      />
      {errors.color && <span className="text-red-400">{errors.color.message}</span>}
    </div>

    {/* Transparent Background */}
    <div className="flex flex-col gap-2">
      <label>TransparentBackground</label>
      <Controller
        control={control}
        name="transparentBackground"
        render={({field}) => (
          <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)}/>
        )}
      />
      {errors.transparentBackground && <span className="text-red-400">{errors.transparentBackground.message}</span>}
    </div>

    <Button type="submit" className="max-w-xs self-end">
      <ImageIcon />
      Generate Image
    </Button>
  </form>
}

export default MuscleGroupAPIDemoForm