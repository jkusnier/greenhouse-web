// conf.js
exports.config = {
    allScriptsTimeout: 11000,

    specs: ['spec.js'],

    //seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:63342/greenhouse-web/app/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
}