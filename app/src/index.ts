import { readIssuesJson } from './lib'

console.log('hello ts.')

const issues = readIssuesJson()
console.log(issues.organization, issues.repository)
