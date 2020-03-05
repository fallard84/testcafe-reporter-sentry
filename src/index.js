const Sentry = require('@sentry/node');

module.exports = function () {
    return {

        reportTaskStart (/* startTime, userAgents, testCount */) {
            // do nothing
        },

        reportFixtureStart (/* name, path, meta */) {
            // do nothing
        },

        reportTestDone (name, testRunInfo, meta) {
            var hasErr = !!testRunInfo.errs.length;
            const sentryDsn = meta !== null && meta.sentryDsn || process.env.SENTRY_DSN;

            if (hasErr) {
                Sentry.init({
                    dsn: sentryDsn
                });
                Sentry.captureEvent({ message: `Error with testcafe test ${name}. ${testRunInfo}`, level: Sentry.Severity.Error, extra: testRunInfo });
            }
            
        },

        reportTaskDone (/* endTime, passed, warnings, results */) {
            // do nothing
        }
    };
};
