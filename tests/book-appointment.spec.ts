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

    //Click to book a new appointment
    await appObj.clickBookAppointmentLink()
    await expect(page).toHaveURL("/appointments/new")

    //Select doctor, date, timeslot and write a note
    await createAppObj.selectDoctor(doctor)
    await createAppObj.selectDate(appointmentDate)
    await createAppObj.selectTimeSlot(timeSlot)
    await createAppObj.writeNote(notes)

    //Click Book Appointment button
    await createAppObj.clickBookAppointmentBtn()

    await expect(createAppObj.appointmentCreatedMsg).toBeVisible();

    //Go to appointments list
    await createAppObj.clickViewAppointmentsBtn()
    await expect(page).toHaveURL("/appointments")

   //Search the just created appointment by its note name (i know it is not the most convenient approach because there can be
   //appointments that have the same note ) and verify if the date and time shown in the front are the same as the ones
   //set
    const frontDate = getFrontendDate(await appObj.getAppointmentDetails(notes))
    const frontTime = getFrontendTime(await appObj.getAppointmentDetails(notes))

    expect(frontDate).toEqual(appointmentDate)
    expect(frontTime).toEqual(timeSlot)

    console.log(notes,'/n',appointmentDate,'/n',timeSlot)

    console.log(frontDate,'/n',frontTime)


    await page.pause()



  });
});