import * as Env from './env'
import { GitHub } from './github'

const issues = Env.readIssuesJson()
const github = new GitHub(Env.getGitHubPAT(), issues.organization, issues.repository)

issues.issues.forEach(async payload => {
  const id = await github.createIssue(payload)
  console.log(`issue ${id} was created.`)
})
