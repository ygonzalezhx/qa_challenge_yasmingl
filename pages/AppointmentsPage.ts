import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { getFrontendDate } from "../utils/date-helper";
import { log } from "node:console";


class AppointmentsPage extends BasePage{

    bookAppointmentLink:Locator
    appointmentNote:Locator
    newDate:Locator
    newTimeSlot:Locator
    confirmBtn:Locator
    successfulRescheduleMsg:Locator 
    successfulCancellationMsg:Locator 
    logout:Locator
    
  

    constructor(page:any){
        super(page)
        this.bookAppointmentLink= page.getByRole('link', { name: 'Book Appointment' });
        this.appointmentNote = page.locator('div.flex.justify-between.items-center') //get every card text per appointment
        this.newDate =  page.locator('input[type="date"]')
        this.newTimeSlot = page.locator('select').filter({has: page.locator('option', { hasText: 'Select time' })});
        this.confirmBtn = page.getByRole("button", {name: 'Confirm'})
        this.successfulRescheduleMsg = page.getByText('Appointment rescheduled successfully');
        this.successfulCancellationMsg = page.getByText('Appointment successfully cancelled');
        this.logout = page.getByText("Logout").first()
      

    }

    async clickBookAppointmentLink(){
        await this.bookAppointmentLink.click()
        
    }

    async getAppointmentDetails(note:string){
        const appointment =  this.appointmentNote.filter({ hasText: note });
        const date_time = appointment.locator('p').first();
        return date_time.textContent()
    }

    //Cannot search the reschedule button just as .getByRole('button', {name: 'Reschedule'}), because there can be more than one 
    //element that is the same. I have to filter by the specific card first
    async clickReschedule(note:string){
        const appointment = this.appointmentNote.filter({ hasText: note })
        const rescheduleBtn = appointment.getByRole('button', {name: 'Reschedule'})
        await rescheduleBtn.click()

    }

    async selectNewDate(newDate:string){
        await this.newDate.fill(newDate) 
    }

    async selectNewTimeSlot(newTime:string){
        await this.newTimeSlot.selectOption(newTime)
    }

    async clickConfirmReschedule(){
        await this.confirmBtn.click()
    }

    async clickCancel(note:string){
        const appointment = this.appointmentNote.filter({ hasText: note })
        const cancelBtn = appointment.getByRole('button', {name: 'Cancel'})
        await cancelBtn.click()

    }
    
    //appointment status. Since each appointment has its own status, I'd recommend locating the appointment first
    //  (using its Notes), and then locating the status within that appointment container.

    async getAppointmentStatus(note:string){
        const appointment = this.appointmentNote.filter({ hasText: note })
        const appointmentStatus = appointment.locator('span').filter({hasText: /^(Active|Cancelled|Confirmed|Completed)$/})
        return appointmentStatus.textContent()
    
    }

    async clickLogout(){
        await this.logout.click()
    }
}

export {AppointmentsPage}