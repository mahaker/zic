import fs from 'fs'
import type { Issue } from './github'
import type { IssueOnBoard } from './zenhub'


export type IssuesJson = {
  organization: string
  repository: string
  issues: ReadonlyArray<Issue & IssueOnBoard>
}

export const readIssuesJson = (): IssuesJson => {
  const path = process.env.NODE_ENV === 'development' ? `${__dirname}/issues.json` : '/data/issues.json'
  const raw = fs.readFileSync(path, { encoding: 'utf-8'})
  return JSON.parse(raw) as IssuesJson
}

export const getRepositoryId = (): number => {
  if(process.env.GITHUB_REPO_ID) return parseInt(process.env.GITHUB_REPO_ID)

  const raw = fs.readFileSync(`${__dirname}/dev.json`, { encoding: 'utf-8'})
  return JSON.parse(raw)['repo-id']
}

export const getGitHubPAT = (): string => {
  if(process.env.GITHUB_PAT) return process.env.GITHUB_PAT

  const raw = fs.readFileSync(`${__dirname}/dev.json`, { encoding: 'utf-8'})
  return JSON.parse(raw)['github-pat']
}

export const getZenHubToken = (): string => {
  if(process.env.ZENHUB_TOKEN) return process.env.ZENHUB_TOKEN

  const raw = fs.readFileSync(`${__dirname}/dev.json`, { encoding: 'utf-8'})
  return JSON.parse(raw)['zenhub-token']
}
