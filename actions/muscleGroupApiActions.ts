"use server"

export async function fetchAvailableMuscleGroups(): Promise<string[]> {
  return await fetch("https://gym-api.mertendieckmann.de/getMuscleGroups")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch muscle groups");
      }
      return response.json()
    }) as string[]
}