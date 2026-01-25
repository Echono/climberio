import BaseController from "./BaseController";
import { URLHelper } from "sap/m/library";

/**
 * @namespace climberioui.controller
 */
export default class Main extends BaseController {
	public loginWithGoogle() {
		URLHelper.redirect("http://localhost:4004/auth/google");
	}
}
