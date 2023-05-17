console.log(process.argv)
console.log(process.argv[2])
const prBody = process.argv[2];
const sectionCheckArr = ["## Description", "## Implemention Details", "## Link to Jira Ticket"];
const seperator = "***";

sectionCheckArr.forEach((x,i) => {
  const indexx = prBody.indexOf(x);
})
