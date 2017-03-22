# lambda_exec
lambda_exec allows you to run arbitrary binary executables on AWS Lambda 4.3+

# Installation
Make sure that lambda_exec is inside your `node_modules` directory. Simply run:
```
npm install lambda_exec
```

# Requirements
- Binaries must be statically-linked as much as possible.
- Put all your binaries inside the `bin/` directory in your project directory.
- In case your binary needs a shared library, put them inside `bin/lib/`.

# Usage
```
'use strict';

const exec = require('lambda_exec').exec;

exports.handler = (event, context, callback) => {
    const cmd = 'echo Hello world!';
    const child = exec(cmd, (error) => {
        callback(error, 'Process complete!');
    });

    child.stdout.on('data', console.log);
    child.stderr.on('data', console.error);
};
```

