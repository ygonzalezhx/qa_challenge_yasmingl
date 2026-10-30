import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";


class DashboardPage extends BasePage{

    newAppointmentLink:Locator


    constructor(page:any){
        super(page)
        this.newAppointmentLink = page.getByRole('link', { name: 'New Appointment' });
    }

    async setEmail(inputEmail:string){
        await this.email.fill(inputEmail)
        
    }
}

export {DashboardPage}