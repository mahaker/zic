import * as Env from './env'
import { GitHub } from './github'
import { ZenHub } from './zenhub'

const zenhub = new ZenHub(Env.getZenHubToken(), Env.getWorkspaceId(), Env.getRepositoryId())
zenhub.init()
  .then(() => {
    const issues = Env.readIssuesJson()
    const github = new GitHub(Env.getGitHubPAT(), issues.organization, issues.repository)

    issues.issues.forEach(async payload => {
      const no = await github.createIssue(payload)

      if (payload.estimate) await zenhub.setEstimate(no, payload.estimate)

      if (payload.pipeline) await zenhub.setPipeline(no, payload.pipeline.name, payload.pipeline.position)
    })
  })
  .catch(reason => {
    console.error('ZenHub initialization error.')
    console.error(reason)
  })

