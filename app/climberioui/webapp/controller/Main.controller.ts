import BaseController from "./BaseController";
import { URLHelper } from "sap/m/library";

/**
 * @namespace climberioui.controller
 */
export default class Main extends BaseController {
	
	public onInit() {
	this.getRouter().getRoute("main").attachPatternMatched(this.onRouteMatched, this);
	}
	
	public loginWithGoogle() {
		URLHelper.redirect("http://localhost:4004/auth/google");
	}

	public async onRouteMatched() {
		if(await this.isAuthenticated()) {
			this.getRouter().navTo("dashboard");
		}
	}


}
