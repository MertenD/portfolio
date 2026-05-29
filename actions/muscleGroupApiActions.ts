"use server"

export async function fetchAvailableMuscleGroups(): Promise<string[]> {
  return ["biceps", "triceps", "shoulders", "chest", "back", "legs", "core", "glutes", "calves", "forearms"]

  return await fetch("https://gym-api.mertendieckmann.de/getMuscleGroups")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch muscle groups");
      }
      return response.json()
    }) as string[]
}