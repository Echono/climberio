import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

/**
 * @namespace climberioui.controller
 */
export default class Dashboard extends BaseController {

    public onInit() {
        this.getRouter().getRoute("dashboard").attachPatternMatched(this.onPatternMatched, this);
    }

    private async onPatternMatched(event: Route$PatternMatchedEvent) {
        if(!await this.isAuthenticated()) {
            this.navTo("main");
        }
    }

}
