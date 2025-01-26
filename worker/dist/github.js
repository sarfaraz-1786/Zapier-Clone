"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommitMessages = getAllCommitMessages;
const rest_1 = require("@octokit/rest");
const octokit = new rest_1.Octokit({ auth: process.env.GITHUB_TOKEN });
function getAllCommitMessages(owner_1, repo_1) {
    return __awaiter(this, arguments, void 0, function* (owner, repo, branch = "main") {
        console.log('octokit', octokit);
        const commitMessages = [];
        let page = 1;
        const perPage = 100; // GitHub API supports up to 100 items per page
        while (true) {
            const response = yield octokit.repos.listCommits({
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
    });
}
