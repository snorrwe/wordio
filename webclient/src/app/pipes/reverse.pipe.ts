import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "reverse"
})
export class ReversePipe implements PipeTransform {

    transform(target: any[]): any[] {
        return target.slice(0).reverse();
    }
}
