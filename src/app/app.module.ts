import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { AgGridModule } from "ag-grid-angular";

import { NgRedux, NgReduxModule } from "ng2-redux";
import { AppState, rootReducer, INITIAL_STATE } from "./store";

@NgModule({
  declarations: [AppComponent],
  imports: [NgReduxModule, BrowserModule, AgGridModule.withComponents([])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
