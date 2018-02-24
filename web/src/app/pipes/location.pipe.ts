import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'location'
})
export class LocationPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) return value;

        switch (value) {
            case "1":
                return "Fourth Floor";
            case "2":
                return "Fifth Floor";
            default:
                return "";
        }
    }
}