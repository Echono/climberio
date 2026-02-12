import BaseController from "./BaseController";

/**
 * @namespace climberioui.controller
 */
export default class Home extends BaseController {

    private readonly routeName = "home";

    public onInit(): void {
        this.getRouter().getRoute(this.routeName).attachPatternMatched(() => this.setSideNavigationKey(this.routeName), this);
        this.getRouter().getRoute(this.routeName).attachPatternMatched(this.onPatternMatched, this);
    }

    private onPatternMatched(): void {
        this.setSideNavigationKey(this.routeName);
    }

}
