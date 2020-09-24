import * as https from 'https'
import { GitHub } from '@/github'

describe('GitHub#createIssue', () => {
  it('has body and label', async () => {
    const spy = jest.spyOn(https, 'request')
    const github = new GitHub('pat', 'org', 'repo')

    await github.createIssue({title: 'my title', body: 'my body', labels: ['label1', 'label2']})

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toBe([{
      method: 'POST',
      headers: {
        'User-Agent': 'mahaker/zic',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': 'token pat'
      },
      host: 'api.github.com',
      path: '/repos/org/repo/issues'
    }])
    spy.mockClear()
  })

  it('has no body', async () => {})
  it('has no label', async () => {})
})
