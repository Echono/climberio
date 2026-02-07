import BaseController from "./BaseController";

/**
 * @namespace climberioui.controller
 */
export default class MyRuns extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("myRuns").attachPatternMatched(this.onRouteMatched, this);
    }

    private onRouteMatched(): void {
        this.setSideNavigationKey("myRuns");
    }

}
