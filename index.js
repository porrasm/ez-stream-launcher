/* var child = require('child_process').exec('../ez-stream/run.sh')
child.stdout.pipe(process.stdout)
child.on('exit', function () {
    process.exit()
})

 */

const { exec, spawn } = require('node:child_process');


async function wait() {
    let waitInProgress = true

    console.log("starting thing...")
    const child = exec('sh ./launch.sh', (err, stdout, stderr) => {
        waitInProgress = false

        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });

    child.stdout.pipe(process.stdout)

    while (waitInProgress) {
        console.log('waiting...')
        await new Promise(resolve => setTimeout(resolve, 5000))
    }
}

wait()
