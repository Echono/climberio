import { URLHelper } from "sap/m/library";
import BaseController from "./BaseController";

/**
 * @namespace climberioui.controller
 */
export default class Account extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("account").attachPatternMatched(this.onRouteMatched, this);
    }

    private onRouteMatched(): void {
        this.setSideNavigationKey("account");
    }

    public onLogoutPress(): void {
        URLHelper.redirect("/auth/logout", false);
    }

}
