const { expect } = require('@playwright/test');

exports.OnlineBookstoreCheckoutPage = class OnlineBookstoreCheckoutPage {

  constructor(page) {
    this.page = page;
    this.total = page.locator('.total');
    this.discountCode = page.locator('#discount-code');
    this.applyDiscount = page.locator('#apply-discount');
    this.discountError = page.locator('#discount-error');
    this.creditCard = page.locator('#credit-card');
    this.creditCardError = page.locator('#card-error')
    this.expiryDate = page.locator('#expiry-date');
    this.expiryDateError = page.locator('#expiry-error');
    this.checkoutButton = page.locator('#checkout');
    this.successMessage = page.locator('#success-message');
  }

  async goToCheckout() {
    await this.page.goto('/');
  }

  async applyDiscountCode(code) {
    await this.discountCode.fill(code);
    // await this.applyDiscount.click();
  }

  async calculateDiscountedTotal(code){
    let totalAmount = await this.getTotalAmount();
    switch (code) {
      case "SAVE20":
        return parseFloat(totalAmount * 0.8).toFixed(2);
      default:
        return totalAmount;
    }
  }

  async getTotalAmount() {
    let totalText = await this.total.innerText();
    return totalText.match(/\d+(\.\d+)?/)[0];
  }

  async enterValidPaymentInfo(cc, exp) {
    await this.creditCard.fill(cc);
    await this.expiryDate.fill(exp);
  }

};