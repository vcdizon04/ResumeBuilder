import { Component, OnInit, Injector } from '@angular/core';
import { JsonResumeService } from 'src/services/json-resume.service';
import { ResumeJson } from 'src/models/ResmeJson';
import { ResumeEditorComponent } from '../resume-editor/resume-editor.component';

@Component({
  selector: 'app-resume7',
  templateUrl: './resume7.component.html',
  styleUrls: ['./resume7.component.scss']
})
export class Resume7Component implements OnInit {
  currentSectionEditing: string;
  ResumeJson: ResumeJson;
  onEdit = false;
  transferData: Object = {id: 1, msg: 'Hello'};
  receivedData: Array<any> = [];
  ResumeEditorComponent: ResumeEditorComponent;
  constructor(
    private ResumeJsonService: JsonResumeService,
    private injector: Injector
  ) {
    this.ResumeEditorComponent = this.injector.get(ResumeEditorComponent);
    this.ResumeJsonService.getResumeJson().subscribe(resumeJson => {
      console.log(resumeJson);
      this.ResumeJson = resumeJson;
    } );
  }

  ngOnInit() {
    this.ResumeJsonService.getCurrentStateEditor().subscribe ( state => {
      this.onEdit = state;
    });

    this.ResumeJsonService.getCurrentSectionEditing().subscribe( section => {
      console.log(section);
      this.currentSectionEditing = section ;
    });
  }

  
  transferDataSuccess($event: any) {
    this.receivedData.push($event);
  }
  deleteSection() {
    const parentComponent = this.injector.get(ResumeEditorComponent);
    parentComponent.deleteSection();
  }
}
