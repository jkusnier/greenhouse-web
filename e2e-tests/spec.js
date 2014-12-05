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
        browser.get('index.html#/devices');

        it('should render devices when user navigates to /devices', function () {
            expect(element.all(by.css('p.navbar-text')).first().getText()).
                toMatch(/Temperature Monitors/);
        });
    });

    describe('device', function () {
        browser.get('index.html#/devices');

        var device = element.all(by.css('.row.device')).first();
        var a = device.element(by.css('a'));
        var description;
        var loc;
        // FIXME we need q to manage these promises
        device.element(by.css('.description')).getText().then(function(name) {
            description = name;
        });
        a.getAttribute('href').then(function (val) {
            loc = val;
        });
        //device.element(by.css('.description')).getText().then(function (name) {
        //    description = name;
        //});

        it('should have a title that matches the link', function () {
            a.click().then(function() {
                expect(element(by.css('p.navbar-text')).getText()).toEqual(description);
            });
        });

        it('should show the temperature', function () {
            browser.get(loc);

            expect(element(by.css('.temperature-value')).getText()).toBeGreaterThan(-100);
        });
    });
});