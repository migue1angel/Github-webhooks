import { json } from "stream/consumers";
import { envs } from "../../config";

export class DiscordService {
  private readonly discordWebHookUrl = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
      // embeds: [
      //   {
      //     image: {
      //       url: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDR4amd0c3Jycmp0aWthcWhrbjQ4bWkwYXM1b3ZzNXFhcmc2bDd4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d9RbxjZ8QXesiYoerE/giphy.gif",
      //     },
      //   },
      // ],
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
