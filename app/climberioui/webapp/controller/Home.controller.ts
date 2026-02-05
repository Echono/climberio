import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

/**
 * @namespace climberioui.controller
 */
export default class Home extends BaseController {

    public onInit() {
        this.getRouter().getRoute("home").attachPatternMatched(this.onPatternMatched, this);
    }

    private async onPatternMatched(event: Route$PatternMatchedEvent) {
        try {
            this.getView().setBusy(true);
            if(!await this.isAuthenticated()) {
                const resourceBundle = await this.getResourceBundle();
                throw new Error(resourceBundle.getText("notAuthenticatedError"));
            }
        } catch(error) {
            MessageBox.error((error as Error).message, {
                onClose: () => {
                    this.getRouter().navTo("main");
                }
            }
        );
        } finally {
            this.getView().setBusy(false);
        }
    }

}
