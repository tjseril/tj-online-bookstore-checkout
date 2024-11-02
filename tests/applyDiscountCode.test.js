const { test, expect } = require('@playwright/test');
const { OnlineBookstoreCheckoutPage } = require('../pages/OnlineBookstoreCheckoutPage.js');
const discountCodes = require( '../test-data/discountCodes.json');
const expectedResults = require('../test-data/expectedResults.json');

test.describe('Apply Discount Code', () => {
  let onlineBookstoreCheckoutPage;
  let discountedAmount;

  test.beforeEach('Go to Online Bookstore Checkout', async ({ page}) => {
    onlineBookstoreCheckoutPage = new OnlineBookstoreCheckoutPage(page);
    await onlineBookstoreCheckoutPage.goToCheckout('/');
  });
  
  test('Valid discount code applies a discount', async ({ page }) => {
    discountedAmount = await onlineBookstoreCheckoutPage.calculateDiscountedTotal(discountCodes.validDiscountCode);
    await onlineBookstoreCheckoutPage.applyDiscountCode(discountCodes.validDiscountCode);
    await expect(onlineBookstoreCheckoutPage.total).toHaveText('Total: $' + discountedAmount);
  });

  test('Invalid discount code shows an error', async ({ page }) => {
    discountedAmount = await onlineBookstoreCheckoutPage.calculateDiscountedTotal(discountCodes.invalidDiscountCode);
    await onlineBookstoreCheckoutPage.applyDiscountCode(discountCodes.invalidDiscountCode);
    await expect(onlineBookstoreCheckoutPage.discountError).toBeVisible();
    await expect(onlineBookstoreCheckoutPage.discountError).toHaveText(expectedResults.applyDiscountCode.invalidDiscountCodeError);
    await expect(onlineBookstoreCheckoutPage.total).toHaveText('Total: $' + discountedAmount);
  });


  test('Discount code should be case-sensitive', async ({ page }) => {
    discountedAmount = await onlineBookstoreCheckoutPage.calculateDiscountedTotal(discountCodes.lowercaseDiscountCode);
    await onlineBookstoreCheckoutPage.applyDiscountCode(discountCodes.lowercaseDiscountCode);
    await expect(onlineBookstoreCheckoutPage.discountError).toBeVisible();
    await expect(onlineBookstoreCheckoutPage.discountError).toHaveText(expectedResults.applyDiscountCode.invalidDiscountCodeError);
    await expect(onlineBookstoreCheckoutPage.total).toHaveText('Total: $' + discountedAmount);
  });
  
});
