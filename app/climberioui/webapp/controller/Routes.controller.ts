import { Table$RowSelectionChangeEvent } from "sap/ui/table/Table";
import BaseController from "./BaseController";
import { Route } from "#cds-models/Bouldering";
import Table from "sap/m/Table";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import Dialog from "sap/m/Dialog";
import ComboBox, { ComboBox$ChangeEvent } from "sap/m/ComboBox";
import { ValueState } from "sap/ui/core/library";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Context from "sap/ui/model/odata/v4/Context";

/**
 * @namespace climberioui.controller
 */
export default class Routes extends BaseController {

    private readonly routeName = "routes";
    private newRouteDialog: Dialog;
    private routeTable: Table;

    public onInit(): void {
        this.getRouter().getRoute(this.routeName).attachPatternMatched(() => this.setSideNavigationKey(this.routeName), this);
    }

    public onAfterRendering() {
        // FOR TESTING PURPOSES ONLY, REMOVE LATER
        // (this.byId("createNewRouteButton") as Button).firePress();
        this.routeTable = this.byId("routesTable") as Table;
    }

    public onRouteSelect(event: Table$RowSelectionChangeEvent) {
        const row = event.getParameter("rowContext");
        const data = row?.getObject() as Route;
        const encoded = encodeURIComponent(data.ID);
        this.getRouter().navTo("routeDetails", { routeID: encoded });
    }

    public onDataReceived() {
        const routesTotal = this.byId("routesTotal");
        const dataHeader = (this.routeTable.getBinding("rows") as ODataListBinding).getHeaderContext();
        routesTotal.setBindingContext(dataHeader, this.boulderingModel);
    }

    /* ############################################# */
    /* ############## DIALOG HANDLERS ############## */
    /* ############################################# */

    public async onNewRoutePress() {
        this.newRouteDialog ??= await this.loadFragment({
            name: "climberioui.view.fragments.NewRoute"
        }) as Dialog;
        const binding = this.routeTable.getBinding("rows") as ODataListBinding;
        const context = binding.create();
        (this.byId("createRouteForm") as SimpleForm).setBindingContext(context, this.boulderingModel);
        await this.populateComboBoxes(["gradesComboBox", "wallsComboBox"]);
        this.newRouteDialog.open();
    }

    private async populateComboBoxes(boxIDs: string[]) {
        const promises = boxIDs.map(id => {
            const box = this.byId(id) as ComboBox;
            const data = box.getCustomData();
            const func = data.find(d => d.getKey() === "function")?.getValue() as string;
            const identifier = data.find(d => d.getKey() === "identifier")?.getValue() as string;
            const model = this.getModel(this.valueHelpBoulderingModel) as ODataModel;
            const context = model.bindContext(func);
            if(!box.getBindingContext(identifier)) {
                return new Promise<void>((resolve) => {
                    context.invoke();
                    box.setBindingContext(context.getBoundContext(), this.valueHelpBoulderingModel);
                    resolve();
                })
            }
        })
        await Promise.all(promises);
    }

    public onValidateComboBox(event: ComboBox$ChangeEvent) {
        const box = event.getSource();
        const key = box.getSelectedKey();
        const value = box.getValue();
        if (!key && value) {
            box.setValueState(ValueState.Error);
        } else {
            box.setValueState(ValueState.None);
        }
    }

    public async onCreateRoute() {
        const model = this.getModel(this.boulderingModel) as ODataModel;
        await model.submitBatch("newRouteGroup");
        this.newRouteDialog.close();
    }

    public async onCloseDialog() {
        const form = (this.byId("createRouteForm") as SimpleForm);
        const context = form.getBindingContext(this.boulderingModel) as Context;
        await context.delete();
        this.newRouteDialog.close();
    }

}
