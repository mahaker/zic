import https from 'https'

export type IssueOnBoard = {
  estimate?: number,
  pipeline?: {
    name: string,
    position?: 'top' | 'bottom' | number
  }
}

export class ZenHub {
  private pipelines: Map<string, string> = new Map()

  constructor(
    private token: string,
    private workspaceId: string,
    private repoId: number
  ) {}

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = https.request({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authentication-Token': this.token
        },
        host: 'api.zenhub.com',
        path: `/p2/workspaces/${this.workspaceId}/repositories/${this.repoId}/board`
      }, (response) => {
        let res: any = ''

        response.on('data', (chunk) => {
          res += chunk
        })

        response.on('end', () => {
          res = JSON.parse(res)
          res.pipelines.forEach((p: {id: string, name: string}) => this.pipelines.set(p.name, p.id))

          resolve()
        })

        response.on('error', (err: Error) => reject(err))
      })

      req.on('error', (err: Error) => reject(err))
      req.end()
    })
  }

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
          resolve()
        })

        response.on('error', (err: Error) => reject(err))
      })
      req.write(this.buildSetEstimateBody(estimate))

      req.on('error', (err: Error) => reject(err))
      req.end()
    })
  }

  setPipeline(issueNo: number, pipelineName: string, position?: string | number): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = https.request({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authentication-Token': this.token
        },
        host: 'api.zenhub.com',
        path: `/p2/workspaces/${this.workspaceId}/repositories/${this.repoId}/issues/${issueNo}/moves`
      }, (response) => {
        let res: any = ''

        response.on('data', (chunk) => {
          res += chunk
        })

        response.on('end', () => {
          resolve()
        })

        response.on('error', (err: Error) => reject(err))
      })
      const pipelineId = this.pipelines.get(pipelineName)
      if(pipelineId === undefined) reject(new Error(`pipeline name ${pipelineName} is not found.`))

      req.write(this.buildSetPipelineBody(pipelineId!, position))

      req.on('error', (err: Error) => reject(err))
      req.end()
    })   
  }

  private buildSetEstimateBody(estimate: number): string {
    return JSON.stringify({ estimate })
  }

  private buildSetPipelineBody(pipelineId: string, position?: string | number): string {
    return JSON.stringify({
      'pipeline_id': pipelineId,
      'position': position || 'top'
    })
  }
}
