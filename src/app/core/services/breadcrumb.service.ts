import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    private title = new Subject<string>();
    titlechangeEmitted$ = this.title.asObservable();
  
    private breadCrumb = new Subject<string[]>();
    breadCrumbchangeEmitted$ = this.breadCrumb.asObservable();

    constructor() {
    }

    changeTitle(title: string) {
        this.title.next(title);
    }

    changeBreadCrumb(breadCrumb: string[]) {
        this.breadCrumb.next(breadCrumb);
    }
}
