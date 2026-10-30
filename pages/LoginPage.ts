import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";


class LoginPage extends BasePage{

    email:Locator
    password:Locator
    signInButton:Locator

    constructor(page:any){
        super(page)
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole("button", {name:"Sign In"})
    }

    async setEmail(inputEmail:string){
        await this.email.fill(inputEmail)
        
    }

    async setPassword(inputPassword:string){
        await this.password.fill(inputPassword)
    }

    async clickSignInButton(){
        await this.signInButton.click()
    }

}

export {LoginPage}