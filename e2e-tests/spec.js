'use strict';

// spec.js
describe('my app', function () {
    it('should have a title', function () {
        browser.get('index.html');

        expect(browser.getTitle()).toEqual('Temperature Sensors');
    });

    it('should automatically redirect to /devices when location hash/fragment is empty', function () {
        browser.get('index.html');

        expect(browser.getLocationAbsUrl()).toMatch('/devices');
    });

    it('should have a version', function () {
        browser.get('index.html');

        expect(element.all(by.css('span.app-version')).count()).toBe(1);
    });

    describe('devices', function () {
        beforeEach(function () {
            browser.get('index.html#/devices');
        });

        it('should render devices when user navigates to /devices', function () {
            expect(element.all(by.css('p.navbar-text')).first().getText()).
                toMatch(/Temperature Monitors/);
        });
    });
});