import cliProgress from "cli-progress";
import { roundToTwo } from "../vector";

/** simple console reporter for Node (HuggingFace model pipeline download) */
export const getNodePipelineReporter = () => {
  const multibar = new cliProgress.MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: " {bar} | {filename} | {total} MiB",
    },
    cliProgress.Presets.shades_grey,
  );

  const progressMap = {};

  let mustDownload = false;

  return (progress) => {
    if (progress.status === "download" && !mustDownload) {
      console.log("Loading model...");
      mustDownload = true;
    }

    if (!progressMap[progress.file] && progress.status === "progress") {
      progressMap[progress.file] = multibar.create(
        roundToTwo(progress.total / 1024 / 1024),
        0,
        {
          filename: progress.file,
        },
      );
    }

    if (progressMap[progress.file] && progress.status === "progress") {
      progressMap[progress.file].update(
        roundToTwo(progress.loaded / 1024 / 1024),
        {
          filename: progress.file,
        },
      );
      progressMap[progress.file].setTotal(
        roundToTwo(progress.total / 1024 / 1024),
      );
    }

    if (progressMap[progress.file] && progress.status === "done") {
      multibar.remove(progressMap[progress.file]);
    }
  };
};
