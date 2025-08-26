import path from "path";

 function toDockerPath(winPath: string) {

            let normalized = path.resolve(winPath).replace(/\\/g, "/");

            if (process.platform === "win32") {
                normalized = normalized.replace(/^([A-Za-z]):/, (_, drive) => `/host_mnt/${drive.toLowerCase()}`);
            }

            return normalized;
        }
export default toDockerPath;