const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const ClientsTablePage = require("../pages/ClientsTablePage");

async function checkoutRowDetailsTest() {
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
    let name = "Hotel Pino";
    if ((await clientsTablePage.getTown(name)) !== "Sarajevo") {
      throw new Error(
        `Pogrešan grad za ${name}. Očekivano: Sarajevo, Pronađeno: ${await clientsTablePage.getTown(
          name
        )}`
      );
    }
    console.log(`Grad za ${name} je ispravan.`);

    if ((await clientsTablePage.getStatus(name)) !== "Aktivan") {
      throw new Error(
        `Pogrešan status za ${name}. Očekivano: Aktivan, Pronađeno: ${await clientsTablePage.getStatus(
          name
        )}`
      );
    }
    console.log(`Status za ${name} je ispravan.`);

    if ((await clientsTablePage.getType(name)) !== "VIP") {
      throw new Error(
        `Pogrešan tip za ${name}. Očekivano: VIP, Pronađeno: ${await clientsTablePage.getType(
          name
        )}`
      );
    }

    console.log(`Tip za ${name} je ispravan.`);

    if ((await clientsTablePage.getRevenue(name)) !== 2500) {
      throw new Error(
        `Pogrešan prihod za ${name}. Očekivano: 2500, Pronađeno: ${await clientsTablePage.getRevenue(
          name
        )}`
      );
    }
    console.log(`Prihod za ${name} je ispravan.`);
  } finally {
    await driver.quit();
  }
}
checkoutRowDetailsTest();
