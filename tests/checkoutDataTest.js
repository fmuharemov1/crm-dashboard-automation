const { Builder, By } = require("selenium-webdriver");
const DashboardPage = require("../pages/DashboardPage");
const LoginPage = require("../pages/LoginPage");

async function checkoutDataTest() {
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

    const dashboardPage = new DashboardPage(driver);

    let clientsCount = await dashboardPage.getClientsCount();
    if (clientsCount !== "6") {
      throw new Error(
        `Broj klijenata nije ispravan. Očekivano: 6, Pronađeno: ${clientsCount}`
      );
    }
    console.log("Broj klijenata je ispravan.");

    let activeCount = await dashboardPage.getActiveCount();
    if (activeCount !== "4") {
      throw new Error(
        `Broj aktivnih klijenata nije ispravan. Očekivano: 4, Pronađeno: ${activeCount}`
      );
    }
    console.log("Broj aktivnih klijenata je ispravan.");

    let vipCount = await dashboardPage.getVipCount();
    if (vipCount !== "2") {
      throw new Error(
        `Broj VIP klijenata nije ispravan. Očekivano: 2, Pronađeno: ${vipCount}`
      );
    }
    console.log("Broj VIP klijenata je ispravan.");

    let revenueTotal = await dashboardPage.getRevenueTotal();
    if (revenueTotal !== "8200") {
      throw new Error(
        `Ukupni prihod nije ispravan. Očekivano: 15000, Pronađeno: ${revenueTotal}`
      );
    }
    console.log("Ukupni prihod je ispravan.");
  } finally {
    await driver.quit();
  }
}
checkoutDataTest();
