import {
  UPDATE_STOCK,
  ADD_ROW,
  REMOVE_ROW,
  UPDATE_PRICE,
  UPDATE_ROW
} from "./actions";

export interface AppState {
  rowData: { id: number; inStock: boolean; model: string; price: number }[];
}

export const INITIAL_STATE: AppState = {
  rowData: [
    { id: 0, inStock: true, model: "Celica", price: 35000 },
    { id: 1, inStock: false, model: "Mondeo", price: 32000 },
    { id: 2, inStock: true, model: "Boxter", price: 72000 }
  ]
};

export function rootReducer(state: AppState, action): AppState {
  switch (action.type) {
    case UPDATE_STOCK:
      return {
        rowData: state.rowData.map((row) => {
          if (row.id === action.payload) {
            return { ...row, inStock: !row.inStock };
          }
          return row;
        })
      };
    case ADD_ROW:
      return { rowData: [...state.rowData, action.newRow] };
    case REMOVE_ROW:
      return { rowData: state.rowData.filter((a) => a.id !== action.payload) };
    case UPDATE_PRICE:
      return {
        rowData: state.rowData.map((row) => {
          if (row.id === action.payload) {
            return { ...row, price: row.price + 1111 };
          }
          return row;
        })
      };
    case UPDATE_ROW:
      return {
        rowData: state.rowData.map((row) => {
          if (row.id === action.payload.id) {
            return action.payload;
          }
          return row;
        })
      };
  }

  return state;
}
