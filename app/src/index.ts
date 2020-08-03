import * as Env from './env'
import { GitHub } from './github'

console.log('hello ts.')

const issues = Env.readIssuesJson()
console.log(issues.organization, issues.repository)

const createIssue = async (gh: GitHub) => {
  const id = await gh.createIssue('title', 'body<br>body', [])
  console.log(`issue was created. issueId=${id}`)
}

const github = new GitHub(Env.getGitHubPAT(), issues.organization, issues.repository)
createIssue(github)
