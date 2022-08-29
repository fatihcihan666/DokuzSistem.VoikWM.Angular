import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoundPipe } from '../pipes/round.pipe';
import { SafePipe } from '../pipes/safe-html.pipe';
import {
  DxValidationSummaryModule,
  DxValidatorModule,
  DxValidationGroupModule,
  DxAutocompleteModule,
  DxButtonModule, DxLookupModule,
  DxDataGridModule,
  DxPopoverModule,
  DxPopupModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxFileUploaderModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxListModule,
  DxTabPanelModule,
  DxDateBoxModule,
  DxTreeListModule,
  DxTreeViewModule,
  DxNumberBoxModule,
  DxLoadIndicatorModule,
  DxTagBoxModule,
  DxLoadPanelModule,
  DxRadioGroupModule,
  DxButtonGroupModule,
  DxDropDownButtonModule,
  DxSwitchModule,
  DxHtmlEditorModule,
  DxScrollViewModule,
  DxChartModule,
} from 'devextreme-angular';
import { StatusTemplateComponent } from './status-template/status-template.component';
import { FileShowComponent } from './file-show/file-show.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { RoleTemplateComponent } from './role-template/role-template.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxOrgChartModule } from 'ngx-org-chart';

// import { AgmMap } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxValidationSummaryModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxAutocompleteModule,
    DxButtonModule,
    DxLookupModule,
    DxDataGridModule,
    DxPopoverModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxListModule,
    DxChartModule,
    DxTabPanelModule,
    DxDateBoxModule,
    DxTreeListModule,
    DxTreeViewModule,
    DxNumberBoxModule,
    DxLoadIndicatorModule,
    DxTagBoxModule,
    DxLoadPanelModule,
    DxRadioGroupModule,
    DxButtonGroupModule,
    DxDropDownButtonModule,
    DxSwitchModule,
    DxScrollViewModule,
    ImageCropperModule,
    DxHtmlEditorModule,
    AngularEditorModule
  ],
  declarations: [
    SafePipe,
    RoundPipe,
    StatusTemplateComponent,
    RoleTemplateComponent,
    FileShowComponent,
    ImageUploaderComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    DxValidationSummaryModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxAutocompleteModule,
    DxButtonModule,
    DxLookupModule,
    DxDataGridModule,
    DxPopoverModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxChartModule,
    DxListModule,
    DxTabPanelModule,
    DxDateBoxModule,
    DxTreeListModule,
    DxTreeViewModule,
    DxNumberBoxModule,
    DxLoadIndicatorModule,
    DxTagBoxModule,
    DxLoadPanelModule,
    DxRadioGroupModule,
    DxButtonGroupModule,
    DxDropDownButtonModule,
    DxSwitchModule,
    DxScrollViewModule,
    StatusTemplateComponent,
    RoleTemplateComponent,
    SafePipe,
    RoundPipe,
    ImageUploaderComponent,
    DxHtmlEditorModule,
    AngularEditorModule,

  ]
})

export class CoreModule { }
