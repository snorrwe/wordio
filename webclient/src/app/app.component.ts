import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {

    constructor(private translateService: TranslateService) { 
        // this language will be used as a fallback when a translation isn't found in the current language
        translateService.setDefaultLang('en-US');
 
         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translateService.use('hu-HU');
    }
}
