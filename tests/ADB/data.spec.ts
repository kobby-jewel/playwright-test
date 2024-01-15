
import { test, expect } from "@playwright/test";
import { assert } from "console";


test.use({
  storageState: "./AuthStates/dataAuth.json"
})

test.describe("(Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe("Hubtel Home Page", async () => {
    test("checking for the presence of Airtime, Data & Bills", async ({
      page,
    }) => {
      //visiting Hubtel page
      await page.goto("https://hubtel.com/");

      //checking Airtime, Data and Bills presence
      await expect(
        page.getByRole("link", { name: "Airtime, Data & Bills" })
      ).toBeTruthy();

      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();
    });

    test("should check the of Internet Data ", async ({ page }) => {
      //visiting Hubtel page
      await page.goto("https://hubtel.com/");

      //accessing Airtime, Data and Bills link
      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();

      //checking for the presence of Data
      await expect(
        page.getByRole("heading", { name: "Internet Data" })
      ).toBeVisible();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" Hubtel Home Page", async () => {
    test("checking for the presence of network providers", async ({ page }) => {
      //visiting Hubtel page
      await page.goto("https://hubtel.com/");

      //accessing Airtime, Data and Bills link
      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();

      //Checking if all the networks are available
      expect.soft(await page.getByText("MTN Data")).toBeTruthy();
      expect.soft(await page.getByText("Vodafone Data")).toBeTruthy();
      expect.soft(await page.getByText("AT Data")).toBeTruthy();
      expect.soft(await page.getByText("Glo Data")).toBeTruthy();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" airtime-data-and-bills Page", async () => {
    test("should check AirtelTigo Data functionality and availability", async ({
      page,
    }) => {
      //visiting Hubtel page
      await page.goto("https://hubtel.com/");

      //accessing Airtime, Data and Bills link
      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();

      await expect(
        page.getByRole("heading", { name: "AT Data" })
      ).toBeVisible();

      await page.getByRole("heading", { name: "AT Data" }).click();

      await expect(page.getByRole("img", { name: "Service" })).toBeVisible();
    });

    test("should check MTN Data functionality and availability", async ({
      page,
    }) => {
      //visiting Hubtel page
      await page.goto("https://hubtel.com/");

      //accessing Airtime, Data and Bills link
      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();

      await expect(
        page.getByRole("heading", { name: "MTN Data" })
      ).toBeVisible();

      await page.getByRole("heading", { name: "MTN Data" }).click();

      await expect(page.getByRole("img", { name: "Service" })).toBeVisible();
    });

    test("should check Vodafone Data functionality and availability", async ({
      page,
    }) => {
      //visiting Hubtel page
      await page.goto("https://hubtel.com/");

      //accessing Airtime, Data and Bills Page
      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();

      await expect(
        page.getByRole("heading", { name: "Vodafone Data" })
      ).toBeVisible();

      await page.getByRole("heading", { name: "Vodafone Data" }).click();

      await expect(page.getByRole("img", { name: "Service" })).toBeVisible();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" MTN Data page", async () => {
    test("When 'used my number' is clicked,the value in the textbox should be the same as the account number", async ({
      page,
    }) => {
      //visiting Hubtel page
      await page.goto("https://hubtel.com/");

      //accessing Airtime, Data and Bills link
      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();

      // //running checks on MTN
      await page
        .locator(
          "div:nth-child(4) div:nth-child(2) div:nth-child(1) div:nth-child(4) div:nth-child(1)"
        )
        .click();

      // expect(
      //   await page.getByRole("heading", { hasText: "MTN Data" })
      // ).toBeTruthy();

      //getting the account number
      await page.locator(".ms-1.d-none.d-md-inline-block").click();
      const AccountNum = page.locator(
        "body > div:nth-child(10) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)"
      );

      const AccountNumber = await AccountNum.textContent();
      await page.locator("span[aria-hidden='true']").click();

      //check "use my number" and proceed with it
      await page.locator('[id="flexSwitchCheckDefault"]').check();
      const textbox = page.getByPlaceholder("Enter number");

      const Numchk = await textbox.inputValue();

      //checking if the number in the textbox is the same as the account number
      expect.soft(Numchk === AccountNumber).toBeTruthy();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe("Hubtel Payment Services Page", async () => {
    test("should check the functionalities of mobile money services", async ({
      page,
    }) => {
     

     
      await page.goto('https://hubtel.com/');
      await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
    await page.locator('div:nth-child(4) > .item-list > .row > div:nth-child(4) > .card > img').click();
    await page.getByPlaceholder('Enter number').fill('0542410123');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('label').filter({ hasText: '17.79MB (GHs 0.5) 17.79MB (' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();




      // Running checks on mobile money providers
      await page.locator("#collapseOne").click();

      //MTN mobile money availability
      //await internet_Data.MTN_Check()
      expect
        .soft(await page.getByRole("link", { name: "MTN Mobile Money" }))
        .toBeTruthy();

      //checking visibility
      expect
        .soft(
          (await page.isVisible("text='MTN Mobile Money'")) &&
            (await page.isEnabled("text='MTN Mobile Money'"))
        )
        .toBeTruthy();

      //checks on AT Money
      expect
        .soft(await page.getByRole("link", { name: "AT Money" }))
        .toBeTruthy();

      //checking visibility
      expect
        .soft(
          (await page.isVisible("text='AT Money'")) &&
            (await page.isEnabled("text='AT Money'"))
        )
        .toBeTruthy();

      //checks on vodafone cash
      expect
        .soft(await page.getByRole("link", { name: "Vodafone Cash" }))
        .toBeTruthy();

      //checking visibility
      expect
        .soft(
          (await page.isVisible("text='Vodafone Cash' ")) &&
            (await page.isEnabled("text='Vodafone Cash' "))
        )
        .toBeTruthy();

      await page.locator("#collapseOne").click();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" Payment Service Page", async () => {
    test("should check the working of bank cards", async ({ page }) => {

    

      await page.goto('https://hubtel.com/');
      await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
    await page.locator('div:nth-child(4) > .item-list > .row > div:nth-child(4) > .card > img').click();
    await page.getByPlaceholder('Enter number').fill('0542410123');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('label').filter({ hasText: '17.79MB (GHs 0.5) 17.79MB (' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();


      await page.getByText("Bank Card").click();

      await expect
        .soft(page.getByPlaceholder("**** **** **** ****"))
        .toBeEditable();

      await expect.soft(page.getByPlaceholder("MM/YY")).toBeEditable();

      await expect
        .soft(page.getByPlaceholder("***", { exact: true }))
        .toBeEditable();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" Payment Services Page", async () => {
    test("should check the working of hubtel balance", async ({ page }) => {

      await page.goto('https://hubtel.com/');
      await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
    await page.locator('div:nth-child(4) > .item-list > .row > div:nth-child(4) > .card > img').click();
    await page.getByPlaceholder('Enter number').fill('0542410123');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('label').filter({ hasText: '17.79MB (GHs 0.5) 17.79MB (' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

      expect.soft(
        (await page.isVisible("label[for='inlineRadio3']")) &&
          (await page.isEnabled("label[for='inlineRadio3']"))
      );
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" Payment Services Page", async () => {
    test("MTN charges should be greater than Data plan selected", async ({
      page,
    }) => {

      await page.goto('https://hubtel.com/');
      await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
    await page.locator('div:nth-child(4) > .item-list > .row > div:nth-child(4) > .card > img').click();
    await page.getByPlaceholder('Enter number').fill('0542410123');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('label').filter({ hasText: '17.79MB (GHs 0.5) 17.79MB (' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

      //charges verification
      const amtcharged = await page.locator("h5[class='fw-bold mb-0']").textContent();
      const dataplan = await page
        .locator(" div[class='info text-end'] p:nth-child(1)")
        .textContent();

        expect.soft(( amtcharged) > ( dataplan)).toBeTruthy();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test("e2e purchasing of MTN Data and favoriting of contact ", async ({
    page,
  }) => {
   

    await page.goto('https://hubtel.com/');
      await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
      await page.locator('div:nth-child(4) > .item-list > .row > div:nth-child(4) > .card > img').click();
      await page.getByPlaceholder('Enter number').fill('0542410123');
      await page.getByRole('button', { name: 'Next' }).click();
      await page.locator('label').filter({ hasText: '17.79MB (GHs 0.5) 17.79MB (' }).click();
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByRole('button', { name: 'Next' }).click();

    //pay using Hubtel balance
    await page.getByText("Hubtel Balance").click();
    await page.getByRole("button", { name: "PAY NOW" }).click();

    setTimeout(async () => {
      await page.click("text=I have paid for this");
    }, 5000);

    if (await page.getByText("CHECK AGAIN", { exact: true }).isVisible()) {
      await page.getByText("CHECK AGAIN", { exact: true }).click();
    } else {
      setTimeout(() => {
       
expect(page.getByText('Success')).toBeTruthy()


      }, 5000);
    }
    // Check the fav acct
    await page.locator(".slider.round").click();

    // Verify and interact with elements when slider is checked
    const FavName = "Bronai";
    await expect
      .soft(page.locator("input[placeholder='Enter a name']"))
      .toBeEditable();
    await page.locator("input[placeholder='Enter a name']").fill(FavName);

    //after filling the name the save button must be visible
    await expect.soft(page.getByRole("button", { name: "Save" })).toBeVisible();

    // Click the save button
    await page.getByRole("button", { name: "Save" }).click();

    //expect the favorite name to be same as the assigned one
    expect.soft(await page.getByText(FavName)).toBeTruthy();

    //after the check we unfavorite it
    await page.locator("i").nth(1).click();
    await page.getByRole("button", { name: "Confirm" }).click();

    setTimeout(async () => {
      await page.getByRole("link", { name: "Okay" }).click();
    }, 5000);

    // Verify elements are not visible when slider is unchecked
    await expect
      .soft(page.locator("input[placeholder='Enter a name']"))
      .not.toBeVisible();
    await expect
      .soft(
        page.locator("button[class='btn text-decoration-none mx-2 btn-light']")
      )
      .not.toBeVisible();

    //click on done
    await page.getByRole("button", { name: "Done" }).click();
  });
});

//VODAFONE

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" Vodafone Data Page", async () => {
    test("When 'used my number' is clicked,the value in the textbox should be the same as the account number", async ({
      page,
    }) => {
      await page.goto("https://hubtel.com/");

      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();

      await page.getByText("Vodafone Data").click();
      // expect(
      //   await page.getByRole("heading", { hasText: "Vodafone Data" })
      // ).toBeTruthy();

      //getting the account number
      await page.locator(".ms-1.d-none.d-md-inline-block").click();
      const AccountNum = page.locator(
        "body > div:nth-child(10) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)"
      );
      const AccountNumber = await AccountNum.textContent();
      await page.locator("span[aria-hidden='true']").click();

      //checking "use my number"
      await page.locator('[id="flexSwitchCheckDefault"]').check();
      const textbox = page.getByPlaceholder("Enter number");
      const value = await textbox.inputValue();

      //checking if toggle my number value is the same as the account number
      expect.soft(value === AccountNumber).toBeTruthy();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" Payment Services Page", async () => {
    test("Vodafone charges should be greater than Data plan selected", async ({
      page,
    }) => {

      await page.goto('https://hubtel.com/');
await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
await page.locator('div:nth-child(6) > .card > img').click();
await page.getByPlaceholder('Enter number').fill('0200045664');
await page.getByRole('button', { name: 'Next' }).click();
await page.getByText('No Expiry - 20MB (GHs 0.5) No').click();
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Next' }).click();

      //charges verification
      const amtcharged =await page.locator("h5[class='fw-bold mb-0']").textContent();
      const dataplan = await page
        .locator(" div[class='info text-end'] p:nth-child(1)")
        .textContent();

      expect.soft(( amtcharged) > ( dataplan)).toBeTruthy();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test("e2e purchasing of Vodafone Data and favoriting of contact ", async ({
    page,
  }) => {
 

          await page.goto('https://hubtel.com/');
await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
await page.locator('div:nth-child(6) > .card > img').click();
await page.getByPlaceholder('Enter number').fill('0200045664');
await page.getByRole('button', { name: 'Next' }).click();
await page.getByText('No Expiry - 20MB (GHs 0.5) No').click();
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Next' }).click();

    //pay using Hubtel balance

    await page.getByText("Hubtel Balance").click();
    await page.getByRole("button", { name: "PAY NOW" }).click();

    setTimeout(async () => {
      await page.click("text=I have paid for this");
    }, 5000);

    await page.getByText("CHECK AGAIN", { exact: true }).click();

    setTimeout(() => {
      
    
    }, 5000);

    // Check the fav acct
    await page.locator(".slider.round").click();

    // Verify and interact with elements when slider is checked
    const FavName = "Bronai";
    await expect
      .soft(page.locator("input[placeholder='Enter a name']"))
      .toBeEditable();
    await page.locator("input[placeholder='Enter a name']").fill(FavName);

    //after filling the name the save button must be visible
    await expect.soft(page.getByRole("button", { name: "Save" })).toBeVisible();

    // Click the save button
    await page.getByRole("button", { name: "Save" }).click();

    //expect the favorite name to be same as the assigned one
    expect.soft(await page.getByText(FavName)).toBeTruthy();

    //after the check we unfavorite it
    await page.locator("i").nth(1).click();
    await page.getByRole("button", { name: "Confirm" }).click();

    setTimeout(async () => {
      await page.getByRole("link", { name: "Okay" }).click();
    }, 5000);

    // Verify elements are not visible when slider is unchecked
    await expect
      .soft(page.locator("input[placeholder='Enter a name']"))
      .not.toBeVisible();
    await expect
      .soft(
        page.locator("button[class='btn text-decoration-none mx-2 btn-light']")
      )
      .not.toBeVisible();

    //click on done
    await page.getByRole("button", { name: "Done" }).click();
  });
});

//AirtelTigo

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" AirtelTigo Data Page", async () => {
    test("When 'used my number' is clicked,the value in the textbox should be the same as the account number", async ({
      page,
    }) => {
      await page.goto("https://hubtel.com/");

      //test on airteltigo Data

      await page.getByRole("link", { name: "Airtime, Data & Bills" }).click();

      await page.getByText("AT Data").click();
      // expect(
      //   await page.getByRole("heading", { hasText: "AT Data" })
      // ).toBeTruthy();
      //getting the account number

      await page.locator(".ms-1.d-none.d-md-inline-block").click();
      const AccountNum = page.locator(
        "body > div:nth-child(10) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)"
      );
      const AccountNumber = await AccountNum.textContent();
      await page.locator("span[aria-hidden='true']").click();

      //checking  "use my number"
      await page.locator('[id="flexSwitchCheckDefault"]').check();
      const textbox = page.getByPlaceholder("Enter number");
      const value = await textbox.inputValue();

      //checking if toggle my number value is the same as the account number
      expect.soft(value === AccountNumber).toBeTruthy();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test.describe(" Payment Services Page", async () => {

    test("AirtelTigo charges should be greater than Data plan selected", async ({
      page,
    }) => {

      await page.goto('https://hubtel.com/');
      await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
      await page.locator('div:nth-child(4) > .item-list > .row > div > .card > img').first().click();
      await page.getByPlaceholder('Enter number').click();
      await page.getByPlaceholder('Enter number').fill('0270760250');
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByText('50MB (GHS 1) 50MB (GHS 1) GHS').click();
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByRole('button', { name: 'Next' }).click();

      //charges verification
      const  amtcharged =await page.locator("h5[class='fw-bold mb-0']").textContent();
      const dataplan =await  page
        .locator(" div[class='info text-end'] p:nth-child(1)")
        .textContent();


       expect(( amtcharged) > ( dataplan)).toBeTruthy();
    });
  });
});

test.describe(" (Hubtel Airtime, Data & Bills) -Data", async () => {
  test("e2e purchasing of AirtelTigo Data and favoriting of contact ", async ({
    page,
  }) => {
    
          await page.goto('https://hubtel.com/');
      await page.getByRole('link', { name: 'Airtime, Data & Bills' }).click();
      await page.locator('div:nth-child(4) > .item-list > .row > div > .card > img').first().click();
      await page.getByPlaceholder('Enter number').click();
      await page.getByPlaceholder('Enter number').fill('0270760250');
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByText('50MB (GHS 1) 50MB (GHS 1) GHS').click();
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByRole('button', { name: 'Next' }).click();

    //pay using Hubtel balance
    await page.getByText("Hubtel Balance").click();
    await page.getByRole("button", { name: "PAY NOW" }).click();

    setTimeout(async () => {
      await page.click("text=I have paid for this");
    }, 5000);



      await page.getByText("CHECK AGAIN", { exact: true }).click();
  

    setTimeout(() => {
      expect(page.getByRole('heading')).toHaveText('Success')
    }, 5000);

    // Check the fav acct
    await page.locator(".slider.round").click();

    // Verify and interact with elements when slider is checked
    const FavName = "Bronai";
    await expect
      .soft(page.locator("input[placeholder='Enter a name']"))
      .toBeEditable();
    await page.locator("input[placeholder='Enter a name']").fill(FavName);

    //after filling the name the save button must be visible
    await expect.soft(page.getByRole("button", { name: "Save" })).toBeVisible();

    // Click the save button
    await page.getByRole("button", { name: "Save" }).click();

    //expect the favorite name to be same as the assigned one
    expect.soft(await page.getByText(FavName)).toBeTruthy();

    //after the check we unfavorite it
    await page.locator("i").nth(1).click();
    await page.getByRole("button", { name: "Confirm" }).click();

    setTimeout(async () => {
      await page.getByRole("link", { name: "Okay" }).click();
    }, 5000);

    // Verify elements are not visible when slider is unchecked
    await expect
      .soft(page.locator("input[placeholder='Enter a name']"))
      .not.toBeVisible();
    await expect
      .soft(
        page.locator("button[class='btn text-decoration-none mx-2 btn-light']")
      )
      .not.toBeVisible();

    //click on done
    await page.getByRole("button", { name: "Done" }).click();
  });
});
