import * as fs from 'fs'
import * as Env from '@/env'

jest.mock('fs')

describe('Env#getRepositoryId', () => {
  beforeEach(() => {
    const mocked: jest.Mocked<typeof fs> = fs as any
    mocked.readFileSync.mockReturnValue(JSON.stringify({'repo-id': 12345}))
  })
  afterEach(() => {
    delete process.env.GITHUB_REPO_ID
  })
  it('from process.env', () => {
    process.env.GITHUB_REPO_ID = '123'
    const repoId = Env.getRepositoryId()

    expect(repoId).toBe(123)
  })
  it('from dev.json', () => {
    const repoId = Env.getRepositoryId()

    expect(repoId).toBe(12345)
  })
})

describe('Env#getGithubPAT', () => {
  beforeEach(() => {
    const mocked: jest.Mocked<typeof fs> = fs as any
    mocked.readFileSync.mockReturnValue(JSON.stringify({'github-pat': 'mocked pat'}))
  })
  afterEach(() => {
    delete process.env.GITHUB_PAT
  })
  it('from process.env', () => {
    process.env.GITHUB_PAT = 'aaa'
    const pat = Env.getGitHubPAT()

    expect(pat).toBe('aaa')
  })
  it('from dev.json', () => {
    const pat = Env.getGitHubPAT()

    expect(pat).toBe('mocked pat')
  })
})
