const { test, expect } = require('@playwright/test');
const { OnlineBookstoreCheckoutPage } = require('../pages/OnlineBookstoreCheckoutPage.js');
const paymentDetails = require('../test-data/paymentDetails.json');
const expectedResults = require('../test-data/expectedResults.json');


test.describe('Payment Information Validation', () => {
  let onlineBookstoreCheckoutPage;

  test.beforeEach('Go to Online Bookstore Checkout', async ({ page}) => {
    onlineBookstoreCheckoutPage = new OnlineBookstoreCheckoutPage(page);
    await onlineBookstoreCheckoutPage.goToCheckout('/');
  });
  
  test('Invalid credit card number', async ({ page }) => {
    await onlineBookstoreCheckoutPage.creditCard.fill(paymentDetails.invalidCreditCard);
    // await onlineBookstoreCheckoutPage.expiryDate.focus();
    await expect(onlineBookstoreCheckoutPage.creditCardError).toBeVisible();
    await expect(onlineBookstoreCheckoutPage.creditCardError).toHaveText(expectedResults.paymentInformationValidation.invalidCardNumberError);
  });


  test('Expired credit card', async ({ page }) => {
    await onlineBookstoreCheckoutPage.expiryDate.fill(paymentDetails.invalidExpiry);
    // await onlineBookstoreCheckoutPage.creditCard.focus();
    await expect(onlineBookstoreCheckoutPage.expiryDateError).toBeVisible();
    await expect(onlineBookstoreCheckoutPage.expiryDateError).toHaveText(expectedResults.paymentInformationValidation.invalidExpiryError);
    await expect(onlineBookstoreCheckoutPage.checkoutButton).toBeDisabled();
  });

  test('Successful payment submission', async ({ page }) => {
    await onlineBookstoreCheckoutPage.enterValidPaymentInfo(paymentDetails.validCreditCard, paymentDetails.validExpiry);
    await expect(onlineBookstoreCheckoutPage.checkoutButton).toBeEnabled();
    await onlineBookstoreCheckoutPage.checkoutButton.click();
    await expect(onlineBookstoreCheckoutPage.successMessage).toBeVisible();
    await expect(onlineBookstoreCheckoutPage.successMessage).toHaveText(expectedResults.paymentInformationValidation.successMessage);
  });

});
