import { Component, Input } from '@angular/core';
import { DataStatusDataSource } from '../../models/shared/base-entitiy.model';

@Component({
    selector: 'app-status-template',
    templateUrl: './status-template.component.html',
    styleUrls: ['./status-template.component.css']
})
export class StatusTemplateComponent {
    @Input() valueExpr!: string;
    @Input() dataSource: any[] = DataStatusDataSource;

    selectedValue: any;
    @Input()
    set value(val: any) {        
        if (val) {
            if (val.data) {
                this.selectedValue = this.dataSource.find(a => a.id == this.resolve(this.valueExpr, val.data));
            } else if (val[this.valueExpr]) {
                this.selectedValue = this.dataSource.find(a => a.id == this.resolve(this.valueExpr, val));
            } else {
                this.selectedValue = this.dataSource.find(a => a.id == val)
            }
        }        
    };

    resolve(path: any, obj: any) {
        return path.split('.').reduce(function (prev: any, curr: any) {
            return prev ? prev[curr] : null
        }, obj || self)
    }
}
