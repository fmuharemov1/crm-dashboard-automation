const { By, until } = require("selenium-webdriver");

class SettingsPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "http://127.0.0.1:5500/app/crm-dashboard.html#";
    this.reportType = By.css('[data-testid="report-type"]');
    this.inputEmail = By.css('[data-testid="notify-email"]');
    this.sendReportCheckbox = By.css('[data-testid="send-report-checkbox"]');
    this.saveSettingsButton = By.css('[data-testid="save-settings"]');
    this.toastMessage = By.css('[data-testid="toast-message"]');
  }
  async open() {
    await this.driver.get(this.url);
  }
  async selectReportType(type) {
    const reportTypeDropdown = await this.driver.wait(
      until.elementLocated(this.reportType),
      5000
    );
    await reportTypeDropdown.click();
    if (type === "Dnevni izvještaj") {
      type = "daily";
    } else if (type === "Sedmični izvještaj") {
      type = "weekly";
    } else if (type === "Mjesečni izvještaj") {
      type = "monthly";
    }
    const option = await this.driver.findElement(
      By.css(`option[value="${type}"]`)
    );
    await option.click();
  }
  async enterEmail(email) {
    const emailInput = await this.driver.findElement(this.inputEmail);
    await emailInput.clear();
    await emailInput.sendKeys(email);
  }
  async enableSendReportCheckbox() {
    const checkbox = await this.driver.findElement(this.sendReportCheckbox);

    const isChecked = await checkbox.isSelected();

    if (!isChecked) {
      await checkbox.click();
    }
    console.log("Checkbox je sada označen.");
  }
  async saveSettingsButtonClick() {
    const saveButton = await this.driver.findElement(this.saveSettingsButton);
    await saveButton.click();
  }
  async getToastMessage() {
    const toast = await this.driver.wait(
      until.elementLocated(this.toastMessage),
      5000
    );
    return await toast.getText();
  }
}
module.exports = SettingsPage;
