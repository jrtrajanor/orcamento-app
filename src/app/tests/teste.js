var assert = require("assert");
var webdriver = require("selenium-webdriver");
require("geckodriver");
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
const serverUri = "http://localhost:3000/#";
const appTitle = "react1";
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
 
var browser = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
 
/**
 * Config for Chrome browser
 * @type {webdriver}
 */
 
function logTitle() {
    return new Promise((resolve, reject) => {
     browser.getTitle().then(function(title) {
      resolve(title);
     });
    });
   }
 
it("Should check whether the given element is loaded", function () {
    browser.get(serverUri)
    browser.findElement({ id: 'buttons' }).click().then(function() {
    
 
    return new Promise((resolve, reject) => {
        browser
         
         .then(logTitle)
         .then(title => {
          assert.equal(title, appTitle);
          resolve();
         })
         .catch(err => reject(err));
       });
    });
});