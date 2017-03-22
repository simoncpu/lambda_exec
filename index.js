/* jshint node: true, esversion: 6 */

'use strict';

process.env['PATH'] = process.env['PATH'] + ':/tmp/lambda_exec';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin/lib';

module.exports = {
    exec: function(command, options, callback) {
        const exec = require('child_process').exec;

        // Hack to allow binaries to execute in a Lambda environment
        const init_env =`
            mkdir -p /tmp/lambda_exec

            for i in \`ls ${process.env['LAMBDA_TASK_ROOT']}/bin/*\`; do
                cp -n $i /tmp/lambda_exec;
                chmod +x /tmp/lambda_exec/\`basename $i\`
            done; 
        `;

        return exec(`${init_env} ${command}`, options, callback);
    }
};
