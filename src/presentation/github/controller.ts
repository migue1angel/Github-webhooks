import { Request, Response } from "express";

export class GithubController {
  constructor() {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown';
    console.log(githubEvent);
    
    const payload = req.body;


    res.status(201).json("Accepted");
  };
}
