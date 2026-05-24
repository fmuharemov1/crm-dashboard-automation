const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const ClientsTablePage = require("../pages/ClientsTablePage");

async function checkoutModalTest() {
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

    let opened = await clientsTablePage.isModalOpened();
    if (!opened) {
      throw new Error("Modal nije otvoren nakon klika na dugme Detalji.");
    }
    console.log("Modal se otvorio nakon klika na dugme Detalji.");
    let clientName = await clientsTablePage.getModalClientName();
    if (clientName !== "Klijent: Casa Columba") {
      throw new Error(
        "Ime klijenta u modalu nije ispravno. Očekivano: Casa Columba, Pronađeno: " +
          clientName
      );
    }
    console.log("Ime klijenta u modalu je ispravno: " + clientName);
    let clientCity = await clientsTablePage.getModalClientCity();
    if (clientCity !== "Grad: Split") {
      throw new Error(
        "Grad klijenta u modalu nije ispravan. Očekivano: Split, Pronađeno: " +
          clientCity
      );
    }
    console.log("Grad klijenta u modalu je ispravan: " + clientCity);
    await clientsTablePage.closeModal();
    console.log("Modal se zatvorio.");
    let closed = await clientsTablePage.isModalClosed();
    if (!closed) {
      throw new Error("Modal nije zatvoren nakon klika na dugme Zatvori.");
    }
    console.log("Modal više nije prikazan nakon klika na dugme Zatvori.");
  } finally {
    await driver.quit();
  }
}
checkoutModalTest();
