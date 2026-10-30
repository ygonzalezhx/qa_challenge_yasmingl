import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";


class AppointmentCreationPage extends BasePage{

    doctorsList:Locator
    datePicker:Locator
    timeSlot:Locator
    notes:Locator
    bookAppointmentBtn:Locator
    appointmentCreatedMsg:Locator
    viewAppointmentsBtn:Locator


    constructor(page:any){
        super(page)
        this.doctorsList =page.getByLabel('Doctor')
        this.timeSlot= page.getByLabel('Time Slot')
        this.datePicker = page.getByLabel('Date')
        this.notes = page.getByLabel('Notes (optional)')
        this.bookAppointmentBtn = page.getByRole("button",{name:"Book Appointment"})
        this.appointmentCreatedMsg = page.getByRole('heading', {name: 'Appointment Booked!'});
        this.viewAppointmentsBtn = page.getByRole("Button", {name:"View Appointments"})

    }

    async selectDoctor(doctorName:string){
        await this.doctorsList.selectOption(doctorName)   
    }

    async selectDate(date:string){
        await this.datePicker.fill(date) 
    }

    async selectTimeSlot(time:string){
        await this.timeSlot.selectOption(time)
    }

    async writeNote(note:string){
        await this.notes.fill(note)
    }
    
    async clickBookAppointmentBtn(){
        await this.bookAppointmentBtn.click()
    }

    async clickViewAppointmentsBtn(){
        this.viewAppointmentsBtn.click()
    }
}

export {AppointmentCreationPage}