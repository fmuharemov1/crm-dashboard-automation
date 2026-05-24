const { Builder, By, until } = require("selenium-webdriver");

class ClientsTablePage {
  constructor(driver) {
    this.driver = driver;
    this.url = "http://127.0.0.1:5500/app/crm-dashboard.html#";
    this.table = By.id("clients-table");
    this.rows = By.css("#clients-table tbody tr");
    this.modal = By.css('[data-testid="client-modal"]');
    this.modalClientName = By.css('[data-testid="modal-client-name"]');
    this.modalClientCity = By.css('[data-testid="modal-client-city"]');
    this.closeModalButton = By.css('[data-testid="close-modal"]');
    this.statusFilter = By.id("status-filter");
    this.searchInput = By.id("search-client");
    this.sortFilter = By.css('[data-testid="sort-filter"]');
    this.toastMessage = By.css('[data-testid="toast-message"]');
  }
  async open() {
    await this.driver.get(this.url);
  }
  async getRowsCount() {
    const rows = await this.driver.wait(until.elementsLocated(this.rows), 5000);
    return await rows.length;
  }

  async getDetailsOfRow(name) {
    return await this.driver.wait(
      until.elementLocated(By.css(`tr[data-client-name="${name}"]`)),
      5000
    );
  }
  async getNameInFirstRow() {
    let row = await this.driver.wait(until.elementLocated(this.rows), 5000);
    let cells = await row.findElements(By.css("td"));
    return await cells[0].getText();
  }
  async getTown(name) {
    let row = await this.getDetailsOfRow(name);
    let cells = await row.findElements(By.css("td"));
    return await cells[1].getText();
  }

  async getStatus(name) {
    let row = await this.getDetailsOfRow(name);
    let cells = await row.findElements(By.css("td"));
    return await cells[2].getText();
  }
  async getType(name) {
    let row = await this.getDetailsOfRow(name);
    let cells = await row.findElements(By.css("td"));
    return await cells[3].getText();
  }
  async getRevenue(name) {
    let row = await this.getDetailsOfRow(name);
    let cells = await row.findElements(By.css("td"));
    let price = await cells[4].getText();

    return Number(price.replace("KM", ""));
  }
  async clickDetailsButton(name) {
    let row = await this.getDetailsOfRow(name);
    let button = await row.findElement(
      By.xpath(
        `//tr[td[contains(text(),'${name}')]]//button[contains(text(),'Detalji')]`
      )
    );
    await button.click();
  }
  async getModalClientName() {
    const clientName = await this.driver.wait(
      until.elementLocated(this.modalClientName),
      5000
    );
    return await clientName.getText();
  }
  async getModalClientCity() {
    const clientCity = await this.driver.wait(
      until.elementLocated(this.modalClientCity),
      5000
    );
    return await clientCity.getText();
  }
  async closeModal() {
    const closeButton = await this.driver.wait(
      until.elementLocated(this.closeModalButton),
      5000
    );
    await closeButton.click();
  }
  async isModalOpened() {
    const modal = await this.driver.wait(
      until.elementLocated(this.modal),
      5000
    );

    return await modal.isDisplayed();
  }
  async isModalClosed() {
    try {
      const modal = await this.driver.findElement(this.modal);

      return !(await modal.isDisplayed());
    } catch (error) {
      return true;
    }
  }
  async selectStatusFilter(status) {
    await this.driver.findElement(this.statusFilter).click();
    if (status.toLowerCase() === "aktivan") {
      status = "active";
    } else if (status.toLowerCase() === "neaktivan") {
      status = "inactive";
    } else {
      status = "all";
    }
    const option = await this.driver.findElement(
      By.css(`#status-filter option[value="${status}"]`)
    );
    await option.click();
  }

  async enterSearchTerm(term) {
    const searchInput = await this.driver.findElement(this.searchInput);
    await searchInput.clear();
    await searchInput.sendKeys(term);
  }
  async selectSortOption(option) {
    await this.driver.findElement(this.sortFilter).click();
    let value;
    if (option.toLowerCase() === "naziv a-z") {
      value = "name-asc";
    } else if (option.toLowerCase() === "prihod najveći") {
      value = "revenue-desc";
    } else {
      value = "default";
    }
    const sortOption = await this.driver.findElement(
      By.css(`#sort-filter option[value="${value}"]`)
    );
    await sortOption.click();
  }
  async deleteClient(name) {
    let row = await this.getDetailsOfRow(name);
    const deleteButton = await this.driver.findElement(
      By.css(`tr[data-client-name="${name}"] .delete-btn`)
    );

    await deleteButton.click();
  }

  async getVisibleRowsCount() {
    const rows = await this.driver.findElements(this.rows);

    let count = 0;

    for (let row of rows) {
      if (await row.isDisplayed()) {
        count++;
      }
    }

    return count;
  }
  async isToastMessageDisplayed() {
    const toast = await this.driver.findElement(this.toastMessage);

    return await toast.isDisplayed();
  }
  
}
module.exports = ClientsTablePage;
