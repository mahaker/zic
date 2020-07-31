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
