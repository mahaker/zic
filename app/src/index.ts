import * as Lib from './lib'
import { GitHub } from './github'

console.log('hello ts.')

const issues = Lib.readIssuesJson()
console.log(issues.organization, issues.repository)

const github = new GitHub(Lib.getGitHubPAT(), issues.organization, issues.repository)
github.createIssue('Title', 'Body', [])
