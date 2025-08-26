import fs from "fs/promises";
import path from "path";

export interface CodePrepResult {
    tempDir: string;
    fileName: string;
    filePath: string;
    imageName: string;
    cmd: string[];
}

export async function prepareSubmissionFiles(submissionId: string, code: string, language: string): Promise<CodePrepResult> {
    const tempDir = path.join("/tmp", "submissions", submissionId);

    const fileName =
        language === "python" ? "solution.py"
        : language === "cpp" ? "solution.cpp"
        : "Main.txt";

    const filePath = path.join(tempDir, fileName);

    // create directory & write code
    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(filePath, code);

    let imageName: string;
    let cmd: string[];

    if (language === "python") {
        imageName = "python:3.8-slim";
        cmd = ["python3", `/code/${fileName}`];
    } else if (language === "cpp") {
        imageName = "gcc:latest";
        cmd = ["/bin/sh", "-c", `g++ /code/${fileName} -o /code/a.out && /code/a.out`];
    } else {
        throw new Error("Unsupported language");
    }

    return { tempDir, fileName, filePath, imageName, cmd };
}
