import gitUrlParse from "git-url-parse";

const parseGitUrl = (url: string) => {
  try {
    return gitUrlParse(url);
  } catch {
    // resource - first occurrence of "@"" until "":"", full_name - first occurrence of ":" until "."
    const regex = /@([^:]+):([^\.]+)/;
    const [, resource, full_name] = url.match(regex) || [];
    // just a regular url.
    if (!resource || !full_name) {
      return { showRaw: true, rawUrl: url };
    }
    return { resource, full_name };
  }
};
export default parseGitUrl;
