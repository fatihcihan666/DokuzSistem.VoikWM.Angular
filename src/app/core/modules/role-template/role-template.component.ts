import { Component, Input } from '@angular/core';
import { RoleEnumDataSource } from '../../models/entities/users/operation-claim.model';

@Component({
    selector: 'app-role-template',
    templateUrl: './role-template.component.html',
    styleUrls: ['./role-template.component.css']
})
export class RoleTemplateComponent {
    @Input() valueExpr!: string;
    @Input() dataSource: any[] = RoleEnumDataSource;

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
