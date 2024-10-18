import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { GitHubService } from "./presentation/services/github.service";
import { DiscordService } from "./presentation/services/discord.service";

(() => {
  main();
})();

function main() {
  const app = express();
  const discordService = new DiscordService();
  const service = new GitHubService();
  const controller = new GithubController(service, discordService);

  app.use(express.json());

  app.post("/api/github", controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
}
