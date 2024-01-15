const { test, expect } = require("@playwright/test");


test.describe('Airtime-ADB(Hubtel Consumer Web)', async() => {

    test.describe('Hubtels Home Page(Hubtel Consumer Web)', async()=>{
        test('Checking Hubtels title page and Availability of Airtime, Data and Bills section', async({page}) => {
     
            //Accessing the Hubtel webpage
            await page.goto("https://hubtel.com");
            await expect(page).toHaveTitle(/Hubtel - Find and pay for everyday essentials/);

            //checking Airtime, Data and Bills presence
            await expect(
              page.getByRole("link", { name: "Airtime, Data & Bills" })
            ).toBeTruthy();
        });

        test('Clicking on Airtime, Data and Bills', async({page}) => {

            //Accessing the Hubtel page
            await page.goto("https://hubtel.com");

            //Clicking on Airtime, Data & Bills
            await page.getByRole("link", { name: "Airtime, Data & Bills"}).click();
            await page.waitForLoadState('networkidle');
            
            //Checking if Airtime section is visible
            await expect(
                page.getByRole('heading', {name: 'Airtime', exact: true })
            ).toBeVisible();
            
        })

    })

    test.describe('Airtime, Data and Bills Page(Hubtel Consumer Web)', async()=>{
        test('Checking for Network providers availability', async({page}) => {

            //Accessing Airtime, Data & Bills
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.waitForLoadState('networkidle');

            //Checking for the presence of network providers 
            expect.soft(await page.getByText("AT Airtime")).toBeTruthy();
            expect.soft(await page.getByText("Glo Airtime")).toBeTruthy();
            expect.soft(await page.getByText("MTN Airtime")).toBeTruthy();
            expect.soft(await page.getByText("Vodafone Airtime")).toBeTruthy();
        });

        test('Checking for MTN airtime functionality and availability', async({page}) => {

            //Accessing Airtime Data & Bills page
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.waitForLoadState('networkidle');

            await expect(
                page.getByRole('heading', {name: 'MTN Airtime'})
            ).toBeVisible();

            await page.getByRole('heading', { name: 'MTN Airtime' }).click();

            await expect(page.getByText("MTN Airtime")).toBeVisible();
        });

        test('Checking for AirtelTigo airtime functionality and availability', async({page}) => {

            //Accessing Airtime Data & Bills page
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.waitForLoadState('networkidle');

            await expect(
                page.getByRole('heading', {name: 'AT Airtime'})
            ).toBeVisible();

            await page.getByRole('heading', { name: 'AT Airtime' }).click();

            await expect(page.getByText("AT Airtime")).toBeVisible();
        });

        test('Checking for Vodafone airtime functionality and availability', async({page}) => {

            //Accessing Airtime Data & Bills page
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.waitForLoadState('networkidle');

            await expect(
                page.getByRole('heading', {name: 'Vodafone Airtime'})
            ).toBeVisible();

            await page.getByRole('heading', { name: 'Vodafone Airtime' }).click();

            await expect(page.getByText("Vodafone Airtime")).toBeVisible();
        });

    })

    test.describe('Entering MTN number & Amount to purchase airtime on(Hubtel Consumer Web)', async()=> {
        test('Checking if network clicked is MTN to enter the Number and Amount', async({page}) => {
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");

            await page.getByRole('heading', {name: 'MTN Airtime'}) .click();

            //Entering number to recieve Airtime and proceed
            await page.getByPlaceholder("Enter number").fill(process.env.mtn);
            await page.getByRole('button', {name: "Next"}).click();

            //Entering amount to purchase on Airtime
            expect(await page.locator("(Max 30,000)")).toBeTruthy();
            await page.getByPlaceholder('0.00').fill("1");
            await page.getByRole('button', {name: "Next"}).click();
        });

    })

    test.describe('Payment options for Airtime(Hubtel Consumer Web)', async()=> {
        test('Checking for payment options availability', async({page}) => {
        
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.locator("(//div[@class='card service-categories pointer mb-0'])[8]").click();
             //Entering number to recieve Airtime and proceed
             await page.getByPlaceholder("Enter number").fill(process.env.mtn);
             await page.getByRole('button', {name: "Next"}).click();
 
             //Entering amount to purchase on Airtime
             expect(await page.locator("(Max 30,000)")).toBeTruthy();
             await page.getByPlaceholder('0.00').fill("1");
             await page.getByRole('button', {name: "Next"}).click();
        
            await page.waitForLoadState('networkidle');
        
            //Checking out and selecting payment method
            expect(await page.getByRole('link', {name:'Mobile Money'})).toBeTruthy();
            expect(await page.getByRole('link', {name: 'Bank Card'})).toBeTruthy();
            expect(await page.getByRole('link', {name: 'Hubtel Balance'})).toBeTruthy(); 
        });

        test('Selecting Prefered option for payment and checkout', async({page}) => {
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.locator("(//div[@class='card service-categories pointer mb-0'])[8]").click();
        
            await page.waitForLoadState('networkidle');

            //Entering number to recieve Airtime and proceed
            await page.getByPlaceholder("Enter number").fill(process.env.mtn);
            await page.getByRole('button', {name: "Next"}).click();

            //Entering amount to purchase on Airtime
            expect(await page.locator("(Max 30,000)")).toBeTruthy();
            await page.getByPlaceholder('0.00').fill("1");
            await page.getByRole('button', {name: "Next"}).click();
       
           await page.waitForLoadState('networkidle');

            await page.getByRole('link', {name: 'Hubtel Balance'}).click();
    
            // expect(process.env.mtn).toBe(confirm);
            await page.getByRole('button', {name: 'PAY NOW'}).click();

            setTimeout(async function(){
                await page.getByText("I have paid for this").click();
            },10000)
        });

    })

    test.describe('Purchasing for AirtelTigo network(Hubtel Consumer Web)', async()=> {
        test('Inputting AT number & checking for payment options', async({page}) => {
        
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.locator("(//div[@class='col'])[6]").click();
             //Entering number to recieve Airtime and proceed
             await page.getByPlaceholder("Enter number").fill(process.env.at);
             await page.getByRole('button', {name: "Next"}).click();
 
             //Entering amount to purchase on Airtime
             expect(await page.locator("(Max 30,000)")).toBeTruthy();
             await page.getByPlaceholder('0.00').fill("1");
             await page.getByRole('button', {name: "Next"}).click();
        
            await page.waitForLoadState('networkidle');
        
            //Checking out and selecting payment method
            expect(await page.getByRole('link', {name:'Mobile Money'})).toBeTruthy();
            expect(await page.getByRole('link', {name: 'Bank Card'})).toBeTruthy();
            expect(await page.getByRole('link', {name: 'Hubtel Balance'})).toBeTruthy(); 
        
        });

        test('Sending airtime to Airtel Tigo', async({page}) => {
        
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.locator("(//div[@class='col'])[6]").click();
             //Entering number to recieve Airtime and proceed
             await page.getByPlaceholder("Enter number").fill(process.env.at);
             await page.getByRole('button', {name: "Next"}).click();
 
             //Entering amount to purchase on Airtime
             expect(await page.locator("(Max 30,000)")).toBeTruthy();
             await page.getByPlaceholder('0.00').fill("1");
             await page.getByRole('button', {name: "Next"}).click();
        
            await page.waitForLoadState('networkidle');
        
            await page.getByRole('link', {name: 'Hubtel Balance'}).click();
            await page.getByRole('button', {name: 'PAY NOW'}).click();

            setTimeout(async function(){
                await page.getByText("I have paid for this").click();
            },10000)
        
        });

    })

    test.describe('Purchasing for Vodafone network(Hubtel Consumer Web)', async()=> {
        test('Inputting Vodafone number & checking for payment options', async({page}) => {
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.locator("(//div[@class='col'])[9]").click();
             //Entering number to recieve Airtime and proceed
             await page.getByPlaceholder("Enter number").fill(process.env.voda);
             await page.getByRole('button', {name: "Next"}).click();
 
             //Entering amount to purchase on Airtime
             expect(await page.locator("(Max 30,000)")).toBeTruthy();
             await page.getByPlaceholder('0.00').fill("1");
             await page.getByRole('button', {name: "Next"}).click();
        
            await page.waitForLoadState('networkidle');
        
            //Checking out and selecting payment method
            expect(await page.getByRole('link', {name:'Mobile Money'})).toBeTruthy();
            expect(await page.getByRole('link', {name: 'Bank Card'})).toBeTruthy();
            expect(await page.getByRole('link', {name: 'Hubtel Balance'})).toBeTruthy(); 
        });

        test('Sending airtime to Vodafone', async({page}) => {
            await page.goto("https://hubtel.com/services/airtime-data-and-bills");
            await page.locator("(//div[@class='col'])[9]").click();
             //Entering number to recieve Airtime and proceed
             await page.getByPlaceholder("Enter number").fill(process.env.voda);
             await page.getByRole('button', {name: "Next"}).click();
 
             //Entering amount to purchase on Airtime
             expect(await page.locator("(Max 30,000)")).toBeTruthy();
             await page.getByPlaceholder('0.00').fill("1");
             await page.getByRole('button', {name: "Next"}).click();
        
            await page.waitForLoadState('networkidle');
            await page.getByRole('link', {name: 'Hubtel Balance'}).click();
            await page.getByRole('button', {name: 'PAY NOW'}).click();

            setTimeout(async function(){
                await page.getByText("I have paid for this").click();
            },10000)
            
        });


    })

})