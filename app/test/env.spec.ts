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

describe('Env#getZenhubToken', () => {
  beforeEach(() => {
    const mocked: jest.Mocked<typeof fs> = fs as any
    mocked.readFileSync.mockReturnValue(JSON.stringify({'zenhub-token': 'mocked token'}))
  })
  afterEach(() => {
    delete process.env.ZENHUB_TOKEN
  })
  it('from process.env', () => {
    process.env.ZENHUB_TOKEN = 'aaa'
    const token = Env.getZenHubToken()

    expect(token).toBe('aaa')
  })
  it('from dev.json', () => {
    const token = Env.getZenHubToken()

    expect(token).toBe('mocked token')
  })
})

describe('Env#getWorkspaceId', () => {
  beforeEach(() => {
    const mocked: jest.Mocked<typeof fs> = fs as any
    mocked.readFileSync.mockReturnValue(JSON.stringify({'workspace-id': 'mocked workspace id'}))
  })
  afterEach(() => {
    delete process.env.ZENHUB_WORKSPACE_ID
  })
  it('from process.env', () => {
    process.env.ZENHUB_WORKSPACE_ID = 'aaa'
    const id = Env.getWorkspaceId()

    expect(id).toBe('aaa')
  })
  it('from dev.json', () => {
    const id = Env.getWorkspaceId()

    expect(id).toBe('mocked workspace id')
  })
})
