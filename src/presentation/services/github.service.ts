import { send } from "process";
import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {
  constructor() {}

  onStar(payload: GitHubStarPayload) {
    let message: string;
    const {action,starred_at, sender, repository} = payload
    if(starred_at){
      return message = `User ${sender.login} star on ${ repository.full_name}`
    }
    return message = `User ${sender.login} removed the star from ${ repository.full_name}`
  }

  onIssue(payload: GitHubIssuePayload) {
    let message: string;
    const {action,issue , sender, repository} = payload
    if(action === 'opened'){
      return `User ${sender.login} opened an issue with title: ${issue.title} in ${ repository.full_name}`
    }
    if(action === 'closed'){
      return `User ${sender.login} closed an issue with title: ${issue.title} in ${ repository.full_name}`
    }
    if(action === 'reopened'){
      return `User ${sender.login} reopened an issue with title: ${issue.title} in ${ repository.full_name}`
    }
    return `Unhandled issue event by ${sender.login} on ${repository.full_name}`
  }
}
