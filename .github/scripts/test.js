console.log(process.argv[2])

const pullRequestBody = process.argv[2].replace(/\r\n/g, "");
console.log(process.argv[2])
if (pullRequestBody && pullRequestBody.length) {
  const prBodyKeys = [
    "### Description",
    "### Implementation Details",
    "### Link to Jira Ticket",
  ];
  const prBodySeperator = "***";
  const prSeperatorInstance = pullRequestBody.split(prBodySeperator).length - 1;
  const prBodyIssues = [];

  prBodyKeys.forEach((key) => {
    if (pullRequestBody.indexOf(key) === -1) {
      prBodyIssues.push(key);
    }
  });

  if (prBodyIssues.length || prSeperatorInstance != prBodyKeys.length) {
    console.log("Pull Request Template Is Not Being Followed");
    console.log("Exiting....");
    process.exit(1);
  }

  const prKeys = pullRequestBody.split(prBodySeperator).slice(0, -1);
  prKeys.forEach((key) => {
    const currentKey = prBodyKeys.find((x) => key.indexOf(x) > -1);
    const keyInfo = key.split(currentKey)[1].trim();
    if (!(keyInfo && keyInfo.length)) {
      prBodyIssues.push(currentKey);
    }
  });

  if (prBodyIssues.length) {
    prBodyIssues.forEach((x) => {
      console.log(`${x.replace(/#/g, "")} is empty`);
    });
    console.log("Exiting...");
    process.exit(1);
  } else {
    console.log("Pull Request Body Conforms The Validation");
  }
} else {
  console.log("Pull Request Body Is Empty");
  console.log("Exiting....");
  process.exit(1);
}
