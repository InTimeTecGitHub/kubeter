import { git } from "./gitConfigureRepo";

export async function gitFetch() {
   let fetchSummary = null;
   fetchSummary = await git.fetch();
   return JSON.stringify(fetchSummary);
}


export async function gitPull() {
   let pullSummary = null;
   pullSummary = await git.pull();
   return JSON.stringify(pullSummary);
}
