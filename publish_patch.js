const { spawn } = require('child_process');

const publish = spawn('vsce', ['publish', 'patch'], {
	stdio: 'pipe',
	shell: true
});

publish.stdout.on('data', (data) => {
	if (data.toString().includes('Do you want to continue?')) {
		publish.stdin.write('N\n');
	}
});

publish.stdout.pipe(process.stdout);
publish.stderr.pipe(process.stderr);

publish.on('close', (code) => {
	console.log(`Publish process exited with code ${code}`);
});