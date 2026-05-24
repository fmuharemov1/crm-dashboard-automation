const { Builder, By } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
//da li treba preci sve situacije
async function invalidLoginTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    const loginPage = new LoginPage(driver);
    await loginPage.open();
    await loginPage.login("a@gmail.com", "test123");
    if (!(await loginPage.isErrorMessageVisible())) {
      throw new Error("Očekivana poruka o grešci nije vidljiva.");
    }
    console.log("Poruka o grešci je vidljiva.");
    const errorMessage = await loginPage.getErrorMessage();

    if (!errorMessage.includes("Neispravni podaci za prijavu")) {
      throw new Error("Očekivana poruka o grešci nije pronađena.");
    }
    console.log("Neispravan login test je prošao.");
  } finally {
    await driver.quit();
  }
}
invalidLoginTest();
