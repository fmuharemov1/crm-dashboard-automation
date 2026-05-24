const { By, until } = require("selenium-webdriver");

class DashboardPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "http://127.0.0.1:5500/app/crm-dashboard.html#";
    this.clientsCount = By.css('[data-testid="clients-count"]');
    this.activeCount = By.css('[data-testid="active-count"]');
    this.vipCount = By.css('[data-testid="vip-count"]');
    this.revenueTotal = By.css('[data-testid="revenue-total"]');

  }
  async open() {
    await this.driver.get(this.url);
  }

  async getClientsCount() {
    const clients = await this.driver.wait(
      until.elementLocated(this.clientsCount),
      5000
    );
    return await clients.getText();
  }

  async getActiveCount() {
    const active = await this.driver.wait(
      until.elementLocated(this.activeCount),
      5000
    );
    return await active.getText();
  }

  async getVipCount() {
    const vip = await this.driver.wait(
      until.elementLocated(this.vipCount),
      5000
    );
    return await vip.getText();
  }

  async getRevenueTotal() {
    const revenue = await this.driver.wait(
      until.elementLocated(this.revenueTotal),
      5000
    );
    return await revenue.getText();
  }
  async 
}
module.exports = DashboardPage;
