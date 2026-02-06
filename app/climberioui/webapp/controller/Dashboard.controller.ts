import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import { SideNavigation$ItemPressEvent } from "sap/tnt/SideNavigation";

/**
 * @namespace climberioui.controller
 */
export default class Dashboard extends BaseController {

    public onInit() {
        this.getRouter().getRoute("dashboard").attachPatternMatched(this.onPatternMatched, this);
    }

    private async onPatternMatched(event: Route$PatternMatchedEvent) {
        try {
            this.getView().setBusy(true);
            if(!await this.isAuthenticated()) {
                const resourceBundle = await this.getResourceBundle();
                throw new Error(resourceBundle.getText("notAuthenticatedError"));
            }
            this.navTo("home");
        } catch(error) {
            MessageBox.error((error as Error).message, {
                onClose: () => {
                    this.navTo("main");
                }
            }
        );
        } finally {
            this.getView().setBusy(false);
        }
    }

    public onSideNavItemPress(event: SideNavigation$ItemPressEvent) {
        const key = event.getParameter("item").getKey();
        this.navTo(key);
    }

}
