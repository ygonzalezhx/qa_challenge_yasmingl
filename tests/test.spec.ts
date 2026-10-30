import {test,expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import { AppointmentCreationPage } from "../pages/AppointmentCreationPage";
import { getFrontendDate,getFrontendTime } from "../utils/date-helper";

import { testData } from '../utils/test-data';





test.describe('Book new appointemnt', () => {
    let loginObj:any  
    let appObj:any
    let createAppObj:any
    const { doctor, appointmentDate, timeSlot, notes } = testData.bookAppointment


  test('End to end book a new appointment flow', async ({page}) => {
    loginObj = new LoginPage(page)
    appObj = new AppointmentsPage(page)
    createAppObj = new AppointmentCreationPage(page)

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

    //Verify if the date and time set when booking the appointment are the ones shown in the front
    const frontDate = getFrontendDate(await appObj.getAppointmentDetails(notes))
    const frontTime = getFrontendTime(await appObj.getAppointmentDetails(notes))
    console.log(notes,appointmentDate,timeSlot)

    console.log(frontDate,frontTime)

    await page.pause()



  });
});