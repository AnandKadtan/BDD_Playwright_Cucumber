const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
    jsonDir: './reports',
    reportPath: './reports/html-report',

    metadata: {
        browser: {
            name: 'chrome',
            version: 'latest'
        },
        platform: {
            name: 'Windows',
            version: '11'
        }
    },

    customData: {
        title: 'Automation Execution Report',
        data: [
            { label: 'Project', value: 'Playwright Cucumber Framework' },
            { label: 'Execution', value: 'BDD Automation' }
        ]
    }
});