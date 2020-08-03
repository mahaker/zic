import https from 'https'

export class GitHub {
  constructor(
    private pat: string,
    private organization: string,
    private repository: string
  ) {}

  async createIssue(title: string, body: string, labels: string[]): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = https.request({
        method: 'POST',
        headers: {
          'User-Agent': 'mahaker/zic',
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'Authorization': `token ${this.pat}`
        },
        host: 'api.github.com',
        path: `/repos/${this.organization}/${this.repository}/issues`,
      }, (response) => {
        let res: any = ''

        response.on('data', (chunk) => {
          res += chunk
        })

        response.on('end', () => {
          res = JSON.parse(res)
          resolve(res.id)
        })

        response.on('error', (err: Error) => reject(err))
      })
      req.write(this.buildIssue(title, body, labels))

      req.on('error', (err: Error) => reject(err))
      req.end()
    })
  }

  private buildIssue(title: string, body: string, labels: string[]): string {
    return JSON.stringify({
      title, body, labels
    })
  }
}

