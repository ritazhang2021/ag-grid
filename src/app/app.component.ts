import { Component } from "@angular/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import { NgRedux, select } from "ng2-redux";
import { AppState } from "./store";
import {
  UPDATE_STOCK,
  ADD_ROW,
  REMOVE_ROW,
  UPDATE_PRICE,
  UPDATE_ROW
} from "./actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  //store
  @select() rowData$;
  constructor(private ngRedux: NgRedux<AppState>) {}

  // grid

  private gridApi;
  private gridColumnApi;

  columnDefs = [
    { field: "id", maxWidth: 60, suppressMenu: true, editable: false },
    {
      field: "inStock",
      singleClickEdit: true,
      width: 120,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [true, false]
      },
      valueFormatter: (params) => {
        if (params.value) {
          return "In stock";
        }
        return "Removed";
      }
    },
    { field: "model", maxWidth: 120 },
    { field: "price", maxWidth: 120 }
  ];

  defaultColDef = {
    width: 100,
    editable: true,
    valueSetter: ({ colDef, data, newValue }) => {
      let updatedRow = { ...data };
      updatedRow[colDef.field] = newValue;
      this.ngRedux.dispatch({
        type: UPDATE_ROW,
        payload: updatedRow
      });
      return false;
    }
  };

  getRowNodeId(data) {
    return data.id;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  newIds = 3;

  // constext menu
  getContextMenuItems = (params) => {
    // helpers for context menu
    let data = params.node.data;
    let rowId = this.getRowNodeId(data);
    const stockMenuName = () => {
      const isInstock = data.inStock;
      if (isInstock) {
        return "Remove From Stock";
      }
      return "Add To Stock";
    };

    // context menu
    var result = [
      {
        name: stockMenuName(),
        action: () => {
          this.ngRedux.dispatch({
            type: UPDATE_STOCK,
            payload: rowId
          });
        }
      },
      {
        name: "<b>Add</b> " + data.model,
        action: () => {
          let newRow = { ...data, id: this.newIds };
          this.newIds++;
          this.ngRedux.dispatch({
            type: ADD_ROW,
            newRow: newRow
          });
        }
      },
      {
        name: "<b>Delete</b> " + data.model,
        action: () => {
          this.ngRedux.dispatch({
            type: REMOVE_ROW,
            payload: rowId
          });
        }
      },
      {
        name: "Increace price for " + data.model,
        action: () => {
          this.ngRedux.dispatch({
            type: UPDATE_PRICE,
            payload: rowId
          });
        }
      }
    ];
    return result;
  };
}
