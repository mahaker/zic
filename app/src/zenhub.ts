import https from 'https'

export type IssueOnBoard = {
  estimate?: number,
  pipeline?: {
    id: string,
    position?: 'top' | 'bottom' | number
  }
}

export class ZenHub {
  constructor(
    private token: string,
    private workspaceId: number,
    private repoId: number
  ) {}

  setEstimate(issueNo: number, estimate: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = https.request({
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Authentication-Token': this.token
        },
        host: 'api.zenhub.com',
        path: `/p1/repositories/${this.repoId}/issues/${issueNo}/estimate`
      }, (response) => {
        let res: any = ''

        response.on('data', (chunk) => {
          res += chunk
        })

        response.on('end', () => {
          res = JSON.parse(res)
          resolve(res.number)
        })

        response.on('error', (err: Error) => reject(err))
      })
      req.write(this.buildSetEstimateBody(estimate))

      req.on('error', (err: Error) => reject(err))
      req.end()
    })
  }

  private buildSetEstimateBody(estimate: number): string {
    return JSON.stringify({ estimate })
  }
}
