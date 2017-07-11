import webdriver from 'selenium-webdriver';
import chrome from 'chromedriver';

const By = webdriver.By;

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

describe('document form', function () {
  // e2e tests are too slow for default Mocha timeout
  this.timeout(10000);

  before((done) => {
    driver.navigate().to('http://localhost:3002/document')
      .then(() => done());
  });

  it('creates document successfully', (done) => {
    driver.findElement(By.xpath('//*[@id="app"]/div/div/div/div/div/div/div/div/div/form/div[1]/div/input')).sendKeys('title');
    driver.findElement(By.xpath('//*[@id="content"]')).sendKeys('content');
    driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div/div/div/div/div[2]/form/div[2]/div/select/option[3]')).sendKeys('public');
    driver.findElement(By.xpath('//*[@id="saveDocument"]')).click()
      .then(() => done());
  });

  after((done) => {
    driver.quit()
      .then(() => done());
  });
});
