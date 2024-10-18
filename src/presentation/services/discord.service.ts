import { json } from "stream/consumers";
import { envs } from "../../config";

export class DiscordService {
  private readonly discordWebHookUrl = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
    };

    const resp = await fetch(this.discordWebHookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.log("Error sending message to discord");

      return false;
    }

    return true;
  }
}
