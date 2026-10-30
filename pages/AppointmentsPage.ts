import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { getFrontendDate } from "../utils/date-helper";


class AppointmentsPage extends BasePage{

    bookAppointmentLink:Locator
    appointmentNote:Locator
    newDate:Locator
    newTimeSlot:Locator
    confirmBtn:Locator
    successfulRescheduleMsg:Locator 
    successfulCancellationMsg:Locator 


    constructor(page:any){
        super(page)
        this.bookAppointmentLink= page.getByRole('link', { name: 'Book Appointment' });
        this.appointmentNote = page.locator('div.flex.justify-between.items-center') //get every card text per appointment
        this.newDate =  page.locator('input[type="date"]')
        this.newTimeSlot = page.locator('select').filter({has: page.locator('option', { hasText: 'Select time' })});
        this.confirmBtn = page.getByRole("button", {name: 'Confirm'})
        this.successfulRescheduleMsg = page.getByText('Appointment rescheduled successfully');
        this.successfulCancellationMsg = page.getByText('Appointment successfully cancelled');

    }

    async clickBookAppointmentLink(){
        await this.bookAppointmentLink.click()
        
    }

    async getAppointmentDetails(note:string){
        const appointment =  this.appointmentNote.filter({ hasText: note });
        const date_time = appointment.locator('p').first();
        return date_time.textContent()
    }

    async clickReschedule(note:string){
        const appointment = this.appointmentNote.filter({ hasText: note });
        const rescheduleBtn = appointment.getByRole('button', {name: 'Reschedule'});
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

    
    
}

export {AppointmentsPage}