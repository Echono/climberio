import { URLHelper } from "sap/m/library";
import BaseController from "./BaseController";

/**
 * @namespace climberioui.controller
 */
export default class Account extends BaseController {

    private readonly routeName = "account";

    public onInit(): void {
        this.getRouter().getRoute(this.routeName).attachPatternMatched(() => this.setSideNavigationKey(this.routeName), this);
    }

    public onLogoutPress(): void {
        URLHelper.redirect("/auth/logout", false);
    }

}
