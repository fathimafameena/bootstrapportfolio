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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
            it('are defined', function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);/*checking the allfeeds variable is not empty*/
            });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
          it('url defined',function(){

                for(var i=0;i<allFeeds.length;i++){
                    expect(allFeeds[i].url).toBeDefined();
                    expect(allFeeds[i].url.length).not.toBe(0);/*checking the allfeeds url is not empty*/
                }
          });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('name defined',function(){
                for(var i=0;i<allFeeds.length;i++){
                     expect(allFeeds[i].name).toBeDefined();
                     expect(allFeeds[i].name.length).not.toBe(0);/*checking the allfeeds name is not empty*/
                }
          });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var mybody,menuicon;
        beforeEach(function(){
            mybody=document.getElementById('mybody');/*accesing the body element using mybody variable*/
            menuicon=document.getElementById('menu-icon');

        });
        it('Does the menu hidden by default',function(){
            expect(mybody.classList.contains('menu-hidden')).toBe(true);//checking whether the body element contains the class//
        });
         
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('Does the menu changes visibility when the menu icon is clicked',function(){
            menuicon.click();/*on the first click to the menu the list appears*/
            expect(mybody.classList.contains('menu-hidden')).toBe(false);
            menuicon.click();/*on the next click the menu list should disappear*/
            expect(mybody.classList.contains('menu-hidden')).toBe(true);

        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         var feed=document.getElementById('feed');/*accessing the feed  div element  in the feed variable*/
         var entry=document.getElementById("entryid");
         beforeEach(function(done){
            loadFeed(0,function(){/* calling the load feed icon once*/
            done();
            console.log(feed.childNodes.length);
            });
        });
 
        it('atleast single element in feed',function(){
            expect(feed).toBeDefined();
            expect(entry).toBeDefined();
            expect(feed.childNodes.length).not.toBe(0);/*checking if atleast one element in feed after running the load feed function*/
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed=document.getElementById('feed');
        var firstfeedurl,secondfeedurl;
        var entry=document.getElementById("entryid");
        beforeEach(function(done){
            loadFeed(0,function(){/*running the loadfeed function once */
            firstfeedurl=document.querySelector('.header-title').innerHTML;/*storing the first feed heading  in the firstfeed variable*/
            console.log(firstfeedurl);
            });
            loadFeed(1,function(){/*running the loadfeed function again with the different id*/
            done();
            secondfeedurl=document.querySelector('.header-title').innerHTML;/*storing the second feed heading in an another variable*/
            console.log(secondfeedurl);
            });
        });
 
        it('it changes the feed content',function(){
            expect(firstfeedurl===secondfeedurl).toBe(false);/*checking if both should not be same*/
        });
    });
}());
