import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import { SideNavigation$ItemPressEvent } from "sap/tnt/SideNavigation";

/**
 * @namespace climberioui.controller
 */
export default class Dashboard extends BaseController {

    private authenticationCheck = false;

    public onBeforeRendering() {
        this.checkAuthentication();
        this.getRouter().getRoute("dashboard").attachPatternMatched(this.onPatternMatched, this);
    }

    private async checkAuthentication() {
        try {
            this.getView().setBusy(true);
            if(!await this.isAuthenticated()) {
                const resourceBundle = await this.getResourceBundle();
                throw new Error(resourceBundle.getText("notAuthenticatedError"));
            }
            const currentRoute = this.getRouter().getHashChanger().getHash();
            if(currentRoute === "dashboard") {
                this.navTo("home");
                this.authenticationCheck = true;
            }
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

    private onPatternMatched() {
        if(this.authenticationCheck) {
            this.navTo("home");
        }
    }

    public onSideNavItemPress(event: SideNavigation$ItemPressEvent) {
        const key = event.getParameter("item").getKey();
        this.navTo(key);
    }

}
