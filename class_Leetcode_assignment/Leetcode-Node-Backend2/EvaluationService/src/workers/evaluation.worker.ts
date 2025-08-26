import { Worker } from "bullmq";
import { SUBMISSION_QUEUE } from "../utils/constants";
import logger from "../config/logger.config";
import { createNewRedisConnection } from "../config/redis.config";
import { runCodeInContainer } from "../utils/codeContainer/runCodeInContainer";

async function setupEvaluationWorker() {
    const worker = new Worker(SUBMISSION_QUEUE, async (job) => {
        logger.info(`Processing job JobId${job.id}, data ${job.data}`);
        console.log("see the job from redis", job.data)

        const { submissionId, code, language } = job.data;
        const result = await runCodeInContainer({ submissionId, code, language });

        logger.info(`Result for ${submissionId}:`, result);

    }, {
        connection: createNewRedisConnection()
    });

    worker.on("error", (error) => {
        logger.error(`Evaluation worker error: ${error}`);
    });

    worker.on("completed", (job) => {
        logger.info(`Evaluation job completed: ${job}`);
    });

    worker.on("failed", (job, error) => {
        logger.error(`Evaluation job failed: ${job}`, error);
    });
}


export async function startworkers() {
    await setupEvaluationWorker();
}







// const worker = new Worker(SUBMISSION_QUEUE, async (job) => {
//     logger.info(`Processing submission ${job.id}`);

//     const { submissionId, code, language } = job.data;
//     const result = await runCodeInContainer({ submissionId, code, language });

//     logger.info(`Result for ${submissionId}:`, result);

//     // TODO: Update DB submission status
//     // e.g. PASSED, FAILED, RUNTIME_ERROR, TIMEOUT
//     return result;
// }, {
//     connection: createNewRedisConnection()
// });
