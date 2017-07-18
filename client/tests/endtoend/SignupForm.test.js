import webdriver from 'selenium-webdriver';
import chrome from 'chromedriver';

const By = webdriver.By;

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

describe('signup form', function () {
  // e2e tests are too slow for default Mocha timeout
  this.timeout(10000);

  before((done) => {
    driver.navigate().to('http://localhost:3002/signup')
      .then(() => done());
  });

  it('signs up in successfully', (done) => {
    driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div/div/form/div[1]/div[1]/div[1]/input')).sendKeys('e2e');
    driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div/div/form/div[1]/div[1]/div[2]/input')).sendKeys('e2e');
    driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div/div/form/div[1]/div[2]/div[1]/input')).sendKeys('e2e');
    driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div/div/form/div[1]/div[2]/div[2]/input')).sendKeys('e2e@gmail.com');
    driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div/div/form/div[1]/div[3]/div/input')).sendKeys('e2e');
    driver.findElement(By.xpath('//*[@id="saveProfile"]')).click()
      .then(() => done());
  });

  after((done) => {
    driver.quit()
      .then(() => done());
  });
});
