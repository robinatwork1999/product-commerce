const aa = JSON.stringify(process.argv[2])
console.log(JSON.parse(aa).event.pull_request.body)

