import { Table$RowSelectionChangeEvent } from "sap/ui/table/Table";
import BaseController from "./BaseController";
import { Route } from "#cds-models/Bouldering";
import Table from "sap/m/Table";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import ComboBox, { ComboBox$ChangeEvent } from "sap/m/ComboBox";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import { ValueState } from "sap/ui/core/library";

/**
 * @namespace climberioui.controller
 */
export default class Routes extends BaseController {

    private readonly routeName = "routes";
    private newRouteDialog: Dialog;

    public onInit(): void {
        this.getRouter().getRoute(this.routeName).attachPatternMatched(() => this.setSideNavigationKey(this.routeName), this);
    }

    // FOR TESTING PURPOSES ONLY, REMOVE LATER
    public onAfterRendering() {
        (this.byId("createNewRouteButton") as Button).firePress();
    }

    public onRouteSelect(event: Table$RowSelectionChangeEvent) {
        const row = event.getParameter("rowContext");
        const data = row?.getObject() as Route;
        const encoded = encodeURIComponent(data.ID);
        this.getRouter().navTo("routeDetails", { routeID: encoded });
    }

    public onDataReceived() {
        const routesTotal = this.byId("routesTotal");
        const table = this.byId("routesTable") as Table;
        const dataHeader = (table.getBinding("rows") as ODataListBinding).getHeaderContext();
        routesTotal.setBindingContext(dataHeader, this.boulderingModel);
    }

    public async onNewRoutePress() {
        this.newRouteDialog ??= await this.loadFragment({
            name: "climberioui.view.fragments.NewRoute"
        }) as Dialog;
        await this.populateComboBoxes(["gradesComboBox", "wallsComboBox"]);
        this.newRouteDialog.open();
    }

    private async populateComboBoxes(boxIDs: string[]) {
        const promises = boxIDs.map(id => {
            const box = this.byId(id) as ComboBox;
            const binding = box.getObjectBinding(this.boulderingModel) as ODataContextBinding;
            return new Promise<void>((resolve) => {
                binding.invoke();
                resolve();
            })
        })
        await Promise.all(promises);
    }

    /* ############################################# */
    /* ############## DIALOG HANDLERS ############## */
    /* ############################################# */

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

}
