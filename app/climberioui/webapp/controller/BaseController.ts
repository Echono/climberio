import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import { AuthenticationStatus } from "#cds-models/Status";
import { StatusCodes } from "climberioui/types/Codes";
import JSONModel from "sap/ui/model/json/JSONModel";
import { UserSet } from "#cds-models/AuthenticationService";

/**
 * @namespace climberioui.controller
 */
export default abstract class BaseController extends Controller {
	/**
	 * Convenience method for accessing the component of the controller's view.
	 * @returns The component of the controller's view
	 */
	public getOwnerComponent(): AppComponent {
		return super.getOwnerComponent() as AppComponent;
	}

	/**
	 * Convenience method to get the components' router instance.
	 * @returns The router instance
	 */
	public getRouter(): Router {
		return UIComponent.getRouterFor(this);
	}

	/**
	 * Convenience method for getting the i18n resource bundle of the component.
	 * @returns {Promise<sap.base.i18n.ResourceBundle>} The i18n resource bundle of the component
	 */
	public getResourceBundle(): Promise<ResourceBundle> {
		const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
		return oModel.getResourceBundle() as Promise<ResourceBundle>;
	}

	/**
	 * Convenience method for getting the view model by name in every controller of the application.
	 * @param [sName] The model name
	 * @returns The model instance
	 */
	public getModel(sName?: string): Model {
		return this.getView().getModel(sName);
	}

	/**
	 * Convenience method for setting the view model in every controller of the application.
	 * @param oModel The model instance
	 * @param [sName] The model name
	 * @returns The current base controller instance
	 */
	public setModel(oModel: Model, sName?: string): BaseController {
		this.getView().setModel(oModel, sName);
		return this;
	}

	/**
	 * Convenience method for triggering the navigation to a specific target.
	 * @public
	 * @param sName Target name
	 * @param [oParameters] Navigation parameters
	 * @param [bReplace] Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
	 */
	public navTo(sName: string, oParameters?: object, bReplace?: boolean): void {
		this.getRouter().navTo(sName, oParameters, undefined, bReplace);
	}

	/**
	 * Convenience event handler for navigating back.
	 * It there is a history entry we go one step back in the browser history
	 * If not, it will replace the current entry of the browser history with the main route.
	 */
	public onNavBack(): void {
		const sPreviousHash = History.getInstance().getPreviousHash();
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			this.getRouter().navTo("main", {}, undefined, true);
		}
	}

	/**
	 * Checks whether the user is authenticated or not.
	 * @returns boolean
	 */
	public async isAuthenticated(): Promise<{authenticated: boolean, user: UserSet}> {
		const model = this.getModel("authentication") as ODataModel;
		const context = model.bindContext('/isAuthenticated(...)');
		await context.invoke();
		const result = context.getBoundContext()?.getObject() as AuthenticationStatus;
		const authenticated = result?.code === StatusCodes.SUCCESS;
		return { authenticated, user: result?.user };
	}

	/**
	 * Sets the key of which the side navigation will show the current selected side navigation
	 * @param key string
	 */
	public setSideNavigationKey(key: string): void {
		const model = this.getModel("dashboard") as JSONModel;
		model.setProperty("/selectedKey", key);
	}

}
