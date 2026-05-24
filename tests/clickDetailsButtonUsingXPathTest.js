const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const ClientsTablePage = require("../pages/ClientsTablePage");

async function clickDetailsButtonUsingXPathTest() {
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

    await clientsTablePage.clickDetailsButton("Casa Columba");
    console.log("Klik na dugme Detalji je uspješan.");
  } finally {
    await driver.quit();
  }
}
clickDetailsButtonUsingXPathTest();
