const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");

async function loginTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    const loginPage = new LoginPage(driver);

    await loginPage.open();
    await loginPage.login("admin@proximus.ba", "test123");
    if (!(await loginPage.isAppTitleVisible())) {
      throw new Error("Login nije uspio, naslov aplikacije nije vidljiv.");
    }
    console.log("Naslov aplikacije je vidljiv.");
    const successMessage = await loginPage.getAppTitle();

    if (!successMessage.includes("Proximus CRM Dashboard")) {
      throw new Error("Login nije uspio, očekivana poruka nije pronađena.");
    }
    console.log("Ispravan login test je prošao.");
  } finally {
    await driver.quit();
  }
}
loginTest();
