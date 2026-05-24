const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const ClientsTablePage = require("../pages/ClientsTablePage");

async function deleteClientTest() {
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
    await clientsTablePage.deleteClient("Top Gear Sarajevo");
    let rowsCount = await clientsTablePage.getVisibleRowsCount();
    if (rowsCount !== 5) {
      console.log(
        `Broj redova nakon brisanja klijenta nije ispravan. Očekivano: 5, Pronađeno: ${rowsCount}`
      );
      throw new Error("Klijent nije obrisan, broj redova nije smanjen.");
    }
    console.log("Klijent je uspješno obrisan, broj redova je smanjen.");
    await clientsTablePage.enterSearchTerm("Top Gear Sarajevo");

    if ((await clientsTablePage.getVisibleRowsCount()) !== 0) {
      throw new Error(
        "Klijent nije obrisan, i dalje se pojavljuje u rezultatima pretrage."
      );
    }
    console.log(
      "Klijent se ne pojavljuje u rezultatima pretrage, test je prošao."
    );
    if (!(await clientsTablePage.isToastMessageDisplayed())) {
      throw new Error("Poruka o uspješnom brisanju nije prikazana.");
    }
    console.log("Poruka o uspješnom brisanju je prikazana, test je prošao.");
  } finally {
    await driver.quit();
  }
}
deleteClientTest();
