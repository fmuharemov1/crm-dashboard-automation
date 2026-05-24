const { By, until } = require("selenium-webdriver");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "http://127.0.0.1:5500/app/crm-dashboard.html#";
    this.emailInput = By.css('[data-testid="login-email"]');
    this.passwordInput = By.css('[data-testid="login-password"]');
    this.loginButton = By.css('[data-testid="login-submit"]');
    this.appTitle = By.css('[data-testid="app-title"]');
    this.errorMessage = By.css('[data-testid="login-error"]');
  }

  async open() {
    await this.driver.get(this.url);
  }
  async enterEmail(email) {
    await this.driver.findElement(this.emailInput).sendKeys(email);
  }
  async enterPassword(password) {
    await this.driver.findElement(this.passwordInput).sendKeys(password);
  }
  async clickLogin() {
    await this.driver.findElement(this.loginButton).click();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }
  async getErrorMessage() {
    const error = await this.driver.wait(
      until.elementLocated(this.errorMessage),
      5000
    );
    return await error.getText();
  }
  async getAppTitle() {
    const title = await this.driver.wait(
      until.elementLocated(this.appTitle),
      5000
    );

    return await title.getText();
  }
  async isErrorMessageVisible() {
    const elements = await this.driver.findElements(this.errorMessage);
    return elements.length > 0 && (await elements[0].isDisplayed());
  }

  async isAppTitleVisible() {
    const elements = await this.driver.findElements(this.appTitle);
    return elements.length > 0 && (await elements[0].isDisplayed());
  }
}
module.exports = LoginPage;
