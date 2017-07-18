// import webdriver from 'selenium-webdriver';
// import chrome from 'chromedriver';

// const By = webdriver.By;
// const until = webdriver.until; // useful utility to wait for something to happen

// const driver = new webdriver.Builder()
//   .forBrowser('chrome')
//   .build();

// describe('login form', function () {
//   // e2e tests are too slow for default Mocha timeout
//   this.timeout(10000);

//   before((done) => {
//     driver.navigate().to('http://localhost:3002/')
//       .then(() => done());
//   });

//   it('login successfully', (done) => {
//     driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div/div/form/div[1]/div[1]/div/input')).sendKeys('batman@cave.com');
//     driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div/div/form/div[1]/div[2]/div/input')).sendKeys('batman');
//     driver.findElement(By.xpath('//*[@id="login"]')).click()
//       .then(() => done());
//   });

//   after((done) => {
//     driver.quit()
//       .then(() => done());
//   });
// });
