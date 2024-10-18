import { Request, Response } from "express";
import { json } from "stream/consumers";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
  constructor(
    private readonly gitHubService: GitHubService,
    private readonly discordService: DiscordService
  ) {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknown";
    const payload = req.body;
    let message = "";

    switch (githubEvent) {
      case "star":
        message = this.gitHubService.onStar(payload);
        break;
      case "issues":
        message = this.gitHubService.onIssue(payload);
        break;
      default:
        message = `Unknown event: ${githubEvent}`;
    }

    this.discordService
      .notify(message)
      .then(() => res.status(202).send("Accepted"))
      .catch((error) => {res.status(500).send("Internal server error")
        console.log(error);
        
      });
  };
}
