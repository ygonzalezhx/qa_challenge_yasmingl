import {test,expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import { getFrontendDate,getFrontendTime } from "../utils/date-helper";

import { testData } from '../utils/test-data';





test.describe('Reschedule appointemnt', () => {
    let loginObj:any  
    let appObj:any
    
    const { newAppointmentDate, newTimeSlot, notes } = testData.rescheduleAppointment
    
  test('End to end reschedule an existing appointment flow',{tag: '@known-bug'}, async ({page}) => {
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

    //Click Reschedule buton and check new date and time fields are visible
    await appObj.clickReschedule(notes)
    await expect(appObj.newDate).toBeVisible()
    await expect(appObj.newTimeSlot).toBeVisible()

    //Set new date and time and confirm
    await appObj.selectNewDate(newAppointmentDate)
    await appObj.selectNewTimeSlot(newTimeSlot)

    await expect(appObj.confirmBtn).toBeEnabled()

    //Click confirm button and check the success message displays
    await appObj.clickConfirmReschedule()
    
    await expect(appObj.successfulRescheduleMsg).toBeVisible()

    //Search the just reschedule appointment by its note name (i know it is not the most convenient approach because there can be
   //appointments that have the same note ) and verify if the date and time shown in the front are the same as the ones
   //set when rescheduling
    const frontDate = getFrontendDate(await appObj.getAppointmentDetails(notes))
    const frontTime = getFrontendTime(await appObj.getAppointmentDetails(notes))

    //Soft assertions so the code keeps executing if the first assertion fails
    expect.soft(frontDate).toEqual(newAppointmentDate)
    expect.soft(frontTime).toEqual(newTimeSlot)

    //Check the status of the appointment after reschedule
    expect.soft(await appObj.getAppointmentStatus(notes)).toBe("Active")

    //await page.pause()

})

})