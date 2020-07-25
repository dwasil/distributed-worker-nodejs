const Status = require('./job/status').Status

class Worker {
  constructor (props) {
    this.jobRepository = props.jobRepository
    this.requester = props.requester

    this.sleepTime = props.sleepTime || 200 // ms

    this.finishFlag = false
  }

  start () {
    this.processJobs()
  }

  async processJobs () {
    while (!this.finishFlag) {
      const res = await this.processNextJob()

      if (!res) {
        setTimeout(this.processJobs.bind(this), this.sleepTime)
        return
      }
    }
  }

  async processNextJob () {
    const job = await this.jobRepository.getNextJob()

    if (!job) {
      return false
    }

    let httpCode = 0
    let status = Status.DONE

    try {
      httpCode = await this.requester.getHttpCode(job.url)
    } catch (e) {
      status = Status.ERROR
    }

    job.httpCode = httpCode
    job.status = status
    this.jobRepository.updateJob(job)
    return true
  }

  setFinishFlag () {
    this.finishFlag = true
  }
}

module.exports.Worker = Worker
