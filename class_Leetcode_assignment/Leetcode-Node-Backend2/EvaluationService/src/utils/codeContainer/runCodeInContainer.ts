import fs from "fs/promises";
import logger from "../../config/logger.config";
import { createNewDockerContainer } from "../containers/createContainer.util";
import { pullAllImages } from "../containers/pullImage.util";
import toDockerPath from "../helpers/docker/docker.pathResolver";
import { prepareSubmissionFiles } from "../helpers/docker/docker.prepareSubmissionFiles";


interface RunCodeOptions {
    submissionId: string;
    code: string;
    language: string;
}

export async function runCodeInContainer({ submissionId, code, language }: RunCodeOptions) {

    try {
      
        // Prepare temp files & command
        const { tempDir, imageName, cmd } = await prepareSubmissionFiles(submissionId, code, language);

        // pull docker image available
        await pullAllImages();

        // Create docker container
        const dockerPath = toDockerPath(tempDir);

        const containerOption = {
            imageName: imageName,
            cmdExecutable: cmd,
            memoryLimit: 512 * 1024 * 1024,
            bindCodePath: [`${dockerPath}:/code:ro`]
        }

        const container = await createNewDockerContainer(containerOption);

        if (!container) return;

        logger.info(`Container created for submission ${submissionId}`);

        // Start container
        await container.start();

        // Waiting for given script/code execution
        const result = await container.wait();

        // Capture logs --->> it's required when something went wrong while running
        // code on docker although docker gives error in logs on docker desktop
        //  but if we want to show error to 
        // the user then we can store this log to our db and show to the user.
        const logs = await container.logs({
            stdout: true,
            stderr: true,
            follow: false
        });

        const output = logs.toString("utf-8");

        // removing created container and tempDir
        await container.remove({ force: true });
        await fs.rm(tempDir, { recursive: true, force: true });

        return {
            exitCode: result.StatusCode,
            output
        };

    } catch (err: any) {
        logger.error(`Error running code in container for ${submissionId}`, err);
        return {
            exitCode: -1,
            output: `Error: ${err.message}`
        };
    }
}
