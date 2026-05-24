const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const ClientsTablePage = require("../pages/ClientsTablePage");

async function statusFilterTest() {
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

    //Filtriranje po statusu "Aktivan"
    await clientsTablePage.selectStatusFilter("Aktivan");
    let rowsCount = await clientsTablePage.getVisibleRowsCount();

    if (rowsCount !== 4) {
      throw new Error(
        `Pogrešan broj redova nakon filtriranja po statusu "Aktivan". Očekivano: 4, Pronađeno: ${rowsCount}`
      );
    }
    console.log(
      `Broj redova nakon filtriranja po statusu "Aktivan" je ispravan.`
    );

    //Filtriranje po statusu "Neaktivan"
    await clientsTablePage.selectStatusFilter("Neaktivan");
    rowsCount = await clientsTablePage.getVisibleRowsCount();

    if (rowsCount !== 2) {
      throw new Error(
        `Pogrešan broj redova nakon filtriranja po statusu "Neaktivan". Očekivano: 2, Pronađeno: ${rowsCount}`
      );
    }
    console.log(
      `Broj redova nakon filtriranja po statusu "Neaktivan" je ispravan.`
    );
  } finally {
    await driver.quit();
  }
}
statusFilterTest();
