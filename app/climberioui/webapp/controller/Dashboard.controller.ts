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

    private onPatternMatched(event: Route$PatternMatchedEvent) {
        debugger;
        const odataModel = this.getModel('user') as ODataModel;
        const context = odataModel.bindContext('/getCurrentUser(...)');
        context.invoke().then((data) => {
            const object = context.getBoundContext().getObject();
            debugger;
        })
    }

}
