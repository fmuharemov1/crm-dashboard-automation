const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const ClientsTablePage = require("../pages/ClientsTablePage");

async function sortingValuesTest() {
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
    await clientsTablePage.selectSortOption("Prihod najveći");
    let rows = await driver.findElements(clientsTablePage.rows);

    for (let i = 1; i < rows.length; i++) {
      let cells = await rows[i].findElements(By.css("td"));
      let prevCells = await rows[i - 1].findElements(By.css("td"));
      if (
        (await clientsTablePage.getRevenue(await cells[0].getText())) >
        (await clientsTablePage.getRevenue(await prevCells[0].getText()))
      ) {
        throw new Error(
          "Redoslijed nije ispravan nakon sortiranja po prihodu."
        );
      }
    }
    console.log("Test sortiranja po prihodu je prošao.");
  } finally {
    await driver.quit();
  }
}
sortingValuesTest();
