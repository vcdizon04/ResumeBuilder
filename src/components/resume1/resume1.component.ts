import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { JsonResumeService } from 'src/services/json-resume.service';
import { ResumeJson } from 'src/models/ResmeJson';
import { ResumeEditorComponent } from '../resume-editor/resume-editor.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume1',
  templateUrl: './resume1.component.html',
  styleUrls: ['./resume1.component.scss']
})
export class Resume1Component implements OnInit, OnDestroy {
  currentSectionEditing: string;
  onEdit = false;
  ResumeJson: ResumeJson;
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
  deleteSection() {
    const parentComponent = this.injector.get(ResumeEditorComponent);
    parentComponent.deleteSection();
  }
  ngOnDestroy() {
    this.subscription$.unsubscribe();
    this.ResumeEditorComponent.domObserverDisconnect();
  }
}
