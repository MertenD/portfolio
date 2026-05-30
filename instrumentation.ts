export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { schedule } = await import("node-cron")
    const { runCleanup } = await import("./lib/cleanup")

    schedule("0 2 * * *", async () => {
      console.log("[cleanup] Starting scheduled data cleanup...")
      try {
        await runCleanup()
      } catch (e) {
        console.error("[cleanup] Scheduled cleanup failed:", e)
      }
    })

    console.log("[cleanup] Daily cleanup scheduled (02:00 UTC)")
  }
}
