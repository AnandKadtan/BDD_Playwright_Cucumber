module.exports = {
    default: {
        paths: ['features/**/*.feature'],

        require: [
            'features/step-definitions/**/*.js',
            'support/**/*.js'
        ],

        format: [
            'progress',
            'json:reports/cucumber-report.json'
        ],

        publishQuiet: true
    }
};