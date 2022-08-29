import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';
import ODataStore from 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';
import { messageService } from './message.service';


@Injectable({
    providedIn: 'root'
})
export class ODataService {
    constructor(private jwtService: JwtService) { }

    public generateODataStore(path: string, key: string = 'id', ...props: any[]): ODataStore {
        const core: any = {
            url: `${environment.apiEndPoint}/api/${path}`,
            version: 4,
            key: key,
            onLoaded: function (e: any) { !environment.production ? console.log(e) : null },
            withCredentials: true,
            beforeSend: (e: any) => {
                e.timeout = 18000000
                e.headers = {
                    'Authorization': `Bearer ${this.jwtService.getToken()}`,
                }
                if (e.method == 'PATCH' || e.method == 'POST' || e.method == 'PUT' || e.method == 'DELETE') {
                    environment.isRequesting = true;
                }
            },
            errorHandler: (e: { httpStatus?: number, errorDetails?: any, requestOptions?: any }) => messageService.errorHandler(e),
            onInserted: (e: any) => messageService.onInserted(e),
            onRemoved: (e: any) => messageService.onRemoved(e),
            onUpdated: (e: any) => messageService.onUpdated(e)
        }
        props.forEach(x => {
            core[x.key] = x.value;
        })


        return new ODataStore(core);
    }

    public generateDataSource = (content: any): DataSource => new DataSource(content);
}
