const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const DashboardPage = require("../pages/DashboardPage");
const ClientsTablePage = require("../pages/ClientsTablePage");

async function checkoutRowsTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    const loginPage = new LoginPage(driver);
    await loginPage.open();
    await loginPage.login("admin@proximus.ba", "test123");
    const successMessage = await loginPage.getAppTitle();

    if (!successMessage.includes("Proximus CRM Dashboard")) {
      throw new Error("Login nije uspio, očekivana poruka nije pronađena.");
    }
    console.log("Ispravan login test je prošao.");

    const clientsTablePage = new ClientsTablePage(driver);
    await clientsTablePage.open();
    let rowsCount = await clientsTablePage.getRowsCount();

    if (rowsCount !== 6) {
      throw new Error(
        `Broj redova u tabeli nije ispravan. Očekivano: 6, Pronađeno: ${rowsCount}`
      );
    }
    console.log("Broj redova u tabeli je 6.");
  } finally {
    await driver.quit();
  }
}

checkoutRowsTest();
