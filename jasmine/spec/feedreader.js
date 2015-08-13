/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
        it('url property present for each feed item', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
            });
        });


        /* Loops through each feed in the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         */
        it('name property present for each feed item', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
            });
        });
    });


    describe('The menu', function() {

        var $body = $('body'),
            $menu = $('.menu-icon-link');

        /* Ensures the menu element is hidden by default. */
        it('menu element is hidden by default', function() {
            expect($body.attr('class')).toContain('menu-hidden');
        });

        /* Ensures the menu changes visibility when the menu icon is clicked.
         * Has two expectations: does the menu display when clicked and does
         * it hide when clicked again.
         */
        it('menu changes visibility when the menu icon is clicked', function() {
            $menu.trigger('click');
            expect($body.attr('class')).not.toContain('menu-hidden');

            $menu.click();
            expect($body.attr('class')).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('there is a single .entry element within the .feed container', function(done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function() {

        var firstFeedItem,
            secondFeedItem;

        beforeEach(function(done) {

            // First async call with a callback to a a second one
            // to populate '.feed' section with different information
            loadFeed(0, function() {
                firstFeedItem = $('.feed').find('.entry');

                loadFeed(1, function() {
                    secondFeedItem = $('.feed').find('.entry');
                    done();
                });
            });
        });

        /* Ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        it('content of .feed changes on menu item change', function(done) {
            expect(firstFeedItem.html()).not.toBe(secondFeedItem.html());
            done();
        });
    });
}());