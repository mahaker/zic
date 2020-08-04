import * as Env from './env'
import { GitHub } from './github'
import { ZenHub } from './zenhub'

const issues = Env.readIssuesJson()
const github = new GitHub(Env.getGitHubPAT(), issues.organization, issues.repository)
const zenhub = new ZenHub(Env.getZenHubToken(), 123, Env.getRepositoryId())

issues.issues.forEach(async payload => {
  const no = await github.createIssue(payload)
  console.log(`issue ${no} was created.`)

  if(payload.estimate) zenhub.setEstimate(no, payload.estimate)
})
