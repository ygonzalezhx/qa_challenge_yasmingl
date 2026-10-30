import {test,expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import { testData } from '../utils/test-data';


test.describe('Cancel appointment', () => {
    let loginObj:any  
    let appObj:any
    
    const { notes } = testData.cancelAppointment 
    
  test('End to end cancel an existing appointment flow',{tag: '@known-bug'} ,async ({page}) => {
    loginObj = new LoginPage(page)
    appObj = new AppointmentsPage(page)

    //Login with valid user
    await loginObj.goto("/login")
    await loginObj.setEmail(process.env.USER_EMAIL!)
    await loginObj.setPassword(process.env.USER_PASSWORD!)
    await loginObj.clickSignInButton()

    //Verify user landed in Dashboard page
    await expect(page).toHaveURL("/dashboard")
  
    //Go to Appointments
    await loginObj.clickOnLink("Appointments")
    await expect(page).toHaveURL("/appointments")

    //Check the appointment to cancel is visible
    expect(await appObj.getAppointmentDetails(notes)).toBeTruthy()

    //Cancel the desired appointment and check the successful cancellation message displays
    await appObj.clickCancel(notes)
    await expect(appObj.successfulCancellationMsg).toBeVisible()

    //Check the status of the appointment after cancellation
    expect.soft(await appObj.getAppointmentStatus(notes)).toBe("Cancelled")
    console.log(await appObj.getAppointmentStatus(notes))

    //Reload page and check status persists
    await page.reload()
    expect.soft(await appObj.getAppointmentStatus(notes)).toBe("Cancelled")

    //await page.pause()

})

})