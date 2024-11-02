# User Story Analysis and Feedback

## Apply Discount Code

There seems to be a missing step in the first two acceptance criteria in order to achieve the end result, which is to click the Apply Discount button. If this is added as such...

> **GIVEN** I have an item in my cart
> **AND** the total amount is $50
> **WHEN** I enter a valid discount code "SAVE20"
> **AND** I click the Apply Discount button
> **THEN** the total should be reduced by 20%
>
>
> **GIVEN** I have an item in my cart
> **WHEN** I enter an invalid discount code "INVALIDCODE"
> **AND** I click the Apply Discount button
> **THEN** I should see an error message "Invalid discount code" 
> **AND** the total amount should remain unchanged

...then the user story provides the full end-to-end flow.

There was one requirement gap that stood out for clarification. Since a specific amount was mentioned for the positive scenario of SAVE20 being accepted, is there a minimum amount that is required so that the discount code can be applied successfully? What would be the corresponding behaviour for this scenario?

Also, here are a few suggestions to perhaps make the ACs better
- The first two ACs give specific discount codes to test, which works if we are only looking at testing those two discount codes. If we're testing numerous discount codes, perhaps it's best to mention "When I enter a discount code from the list of valid discount codes provided" (obviously providing the actual list of valid discount codes in the story) and "When I enter a discount code which is not in the list of valid discount codes". Having said that, both ways of writing the AC still makes them valid.
- The third AC does not follow the same format (Given/When/Then). Best to follow the same format for consistency


## Payment Information Validation

This user story once again seems to be missing a key step in the AC in order to display the error message, which is to move the focus away from the input field after entering the invalid values.

There are also a few gaps in the requirements that needs to be clarified:
- For validating invalid credit card numbers, not all credit card numbers are 16 digits long (i.e. Amex). If we are catering for Amex, the AC should specify the correct accepted length 
- Shouldn't we verify the state of the Checkout button when an invalid card number is provided, and not only at the expiry date validation?
- Is there an assumption that the user can only input numeric characters? What would the behaviour be if the user decides to enter non-numeric characters in both credit card number and expiry date fields?
- The user is allowed to enter more than the maximum length required for each input field
- What is the expected behaviour once errors are corrected?


## Handle Out of Stock Items

This is not testable since there is no capability to control the inventory as displayed on the page and simulate an out of stock item and to remove the out of stock item from the cart.