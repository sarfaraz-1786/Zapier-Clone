import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getAllCommitMessages(owner: string, repo: string, branch: string = "main") {
  const commitMessages: string[] = [];
  let page = 1;
  const perPage = 100; // GitHub API supports up to 100 items per page

  while (true) {
    const response = await octokit.repos.listCommits({
      owner,
      repo,
      sha: branch, // Optional: Specify branch to get commits from
      per_page: perPage,
      page,
    });

    // Extract commit messages
    const messages = response.data.map((commit) => commit.commit.message);
    commitMessages.push(...messages);

    // Break loop if there are no more commits
    if (response.data.length < perPage) {
      break;
    }

    page++;
  }

  return commitMessages;
}
