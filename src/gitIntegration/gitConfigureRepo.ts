import config from "./gitConfig.json";
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
 
const options: SimpleGitOptions = {
   baseDir: config.repoDir,
   binary: 'git',
   maxConcurrentProcesses: 6,
};
 
// when setting all options in a single object
export const git: SimpleGit = simpleGit(options);
