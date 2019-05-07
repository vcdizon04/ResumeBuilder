import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { ResumeJson } from 'src/models/ResmeJson';
import { ResumeEditorComponent } from '../resume-editor/resume-editor.component';
import { Subscription } from 'rxjs';
import { JsonResumeService } from 'src/services/json-resume.service';

@Component({
  selector: 'app-resume8',
  templateUrl: './resume8.component.html',
  styleUrls: ['./resume8.component.scss']
})
export class Resume8Component implements OnInit, OnDestroy {
  currentSectionEditing: string;
  ResumeJson: ResumeJson;
  onEdit = false;
  transferData: Object = {id: 1, msg: 'Hello'};
  receivedData: Array<any> = [];
  ResumeEditorComponent: ResumeEditorComponent;
  subscription$: Subscription;
  constructor(
    private ResumeJsonService: JsonResumeService,
    private injector: Injector
  ) {
    this.ResumeEditorComponent = this.injector.get(ResumeEditorComponent);
  }

  ngOnInit() {
    this.subscription$ = this.ResumeJsonService.getResumeJson().subscribe(resumeJson => {
      console.log(resumeJson);
      this.ResumeJson = resumeJson;
    } );
   this.subscription$.add(this.ResumeJsonService.getCurrentStateEditor().subscribe ( state => {
      this.onEdit = state;
    }));

    this.subscription$.add(this.ResumeJsonService.getCurrentSectionEditing().subscribe( section => {
      console.log(section);
      this.currentSectionEditing = section ;
    }));
    this.ResumeEditorComponent.domObserver();
  }

  transferDataSuccess($event: any) {
    this.receivedData.push($event);
  }
  deleteSection() {
    const parentComponent = this.injector.get(ResumeEditorComponent);
    parentComponent.deleteSection();
  }
  ngOnDestroy() {
    this.subscription$.unsubscribe();
    this.ResumeEditorComponent.domObserverDisconnect();
  }

}
