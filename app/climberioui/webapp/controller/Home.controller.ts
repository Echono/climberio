import BaseController from "./BaseController";

/**
 * @namespace climberioui.controller
 */
export default class Home extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("home").attachPatternMatched(this.onRouteMatched, this);
    }

    private onRouteMatched(): void {
        this.setSideNavigationKey("home");
    }

}
