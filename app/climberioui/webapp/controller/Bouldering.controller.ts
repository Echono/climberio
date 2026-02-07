import BaseController from "./BaseController";

/**
 * @namespace climberioui.controller
 */
export default class Bouldering extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("bouldering").attachPatternMatched(this.onRouteMatched, this);
    }

    private onRouteMatched(): void {
        this.setSideNavigationKey("bouldering");
    }

}
