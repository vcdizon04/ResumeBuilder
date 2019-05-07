import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { JsonResumeService } from 'src/services/json-resume.service';
import { ResumeJson } from 'src/models/ResmeJson';
import { ResumeEditorComponent } from '../resume-editor/resume-editor.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume4',
  templateUrl: './resume4.component.html',
  styleUrls: ['./resume4.component.scss']
})
export class Resume4Component implements OnInit, OnDestroy {
  currentSectionEditing: string;
  ResumeJson: ResumeJson;
  onEdit: boolean;
  ResumeEditorComponent: ResumeEditorComponent;
  subscription$: Subscription;
  
  constructor(
    private ResumeJsonService: JsonResumeService,
    private injector: Injector
  ) { }

  ngOnInit() {
    this.ResumeEditorComponent = this.injector.get(ResumeEditorComponent);

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
