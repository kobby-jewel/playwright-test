import { test, expect } from "@playwright/test";
test ('hello',async({page})=>{
   await page.goto('https://hubtel.com/')
})