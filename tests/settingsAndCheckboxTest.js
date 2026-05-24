const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const SettingsPage = require("../pages/SettingsPage");

async function settingsAndCheckboxTest() {
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
    const settingsPage = new SettingsPage(driver);
    await settingsPage.open();
    await settingsPage.selectReportType("Mjesečni izvještaj");
    console.log("Izabran je mjesečni izvještaj.");
    await settingsPage.enterEmail("qa@test.ba");
    console.log("Proslijeđen je email.");
    await settingsPage.enableSendReportCheckbox();
    console.log("Označen je checkbox za slanje izvještaja.");
    await settingsPage.saveSettingsButtonClick();
    console.log("Kliknuto je na dugme za spremanje postavki.");
    if (
      (await settingsPage.getToastMessage()) !==
      "Postavke su uspješno sačuvane."
    ) {
      throw new Error(
        `Pogrešna poruka nakon spremanja postavki. Očekivano: "Postavke su uspješno spremljene!", Pronađeno: ${await settingsPage.getToastMessage()}`
      );
    }
    console.log("Postavke su uspješno sačuvane - poruka je ispravna.");
  } finally {
    await driver.quit();
  }
}
settingsAndCheckboxTest();
