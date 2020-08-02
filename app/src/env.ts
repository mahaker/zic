import fs from 'fs'

export type Issues = {
  organization: string
  repository: string
}

export const readIssuesJson = (): Issues => {
  const path = process.env.NODE_ENV === 'development' ? `${__dirname}/issues.json` : '/data/issues.json'
  const raw = fs.readFileSync(path, { encoding: 'utf-8'})
  return JSON.parse(raw) as Issues
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