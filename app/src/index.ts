import * as Env from './env'
import { GitHub } from './github'

console.log('hello ts.')

const issues = Env.readIssuesJson()
console.log(issues.organization, issues.repository)

const github = new GitHub(Env.getGitHubPAT(), issues.organization, issues.repository)
github.createIssue('Title', 'Body', [])
