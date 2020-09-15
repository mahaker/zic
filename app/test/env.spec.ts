jest.mock('fs')
import * as fs from 'fs'
import * as Env from '@/env'


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
