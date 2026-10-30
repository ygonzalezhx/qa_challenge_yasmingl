import {test,expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage";
import { log } from "node:console";




test.describe('Book new appointemnt', () => {
    let loginObj:any  


  test('End to end book a new appointment flow', async ({page}) => {
    loginObj = new LoginPage(page)

    //Login with valid user
    await loginObj.goto("/login")
    await loginObj.setEmail(process.env.USER_EMAIL!)
    await loginObj.setPassword(process.env.USER_PASSWORD!)
    await loginObj.clickSignInButton()

    //Verify user landed in Dashboard page
    await expect(page).toHaveURL("/dashboard")

    //Go to Appointments



  });
});