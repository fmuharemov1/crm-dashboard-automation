const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const ClientsTablePage = require("../pages/ClientsTablePage");

async function searchFilterTest() {
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
    await clientsTablePage.enterSearchTerm("Sarajevo");

    let rowsCount = await clientsTablePage.getVisibleRowsCount();

    if (rowsCount !== 1) {
      throw new Error(
        `Prikazani su redovi nakon pretrage sa pojmom "Sarajevo". Očekivano: 1, Pronađeno: ${rowsCount}`
      );
    }
    console.log("Pretraga ne pronalazi klijente na osnovu grada");

    await clientsTablePage.enterSearchTerm("Pino");
    if ((await clientsTablePage.getNameInFirstRow()) !== "Hotel Pino") {
      throw new Error(
        `Pogrešan rezultat pretrage sa pojmom "Pino". Očekivano: "Hotel Pino", Pronađeno: ${await clientsTablePage.getNameInFirstRow()}`
      );
    }
    console.log("Pretraga pronalazi klijente na osnovu imena");
  } finally {
    await driver.quit();
  }
}
searchFilterTest();
