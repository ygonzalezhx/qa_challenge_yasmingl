import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { getFrontendDate } from "../utils/date-helper";


class AppointmentsPage extends BasePage{

    bookAppointmentLink:Locator
    appointmentNote:Locator


    constructor(page:any){
        super(page)
        this.bookAppointmentLink= page.getByRole('link', { name: 'Book Appointment' });
        this.appointmentNote = page.locator('div.flex.justify-between.items-center') //get every card text per appointment
    }

    async clickBookAppointmentLink(){
        await this.bookAppointmentLink.click()
        
    }

    async getAppointmentDetails(note:string){
        const appointment =  this.appointmentNote.filter({ hasText: note });
        const date_time = appointment.locator('p').first();
        return date_time.textContent()
    }

    
    
}

export {AppointmentsPage}