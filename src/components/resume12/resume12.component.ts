import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { JsonResumeService } from 'src/services/json-resume.service';
import { ResumeJson } from 'src/models/ResmeJson';
import { Subscription } from 'rxjs';
import { ResumeEditorComponent } from '../resume-editor/resume-editor.component';

@Component({
  selector: 'app-resume12',
  templateUrl: './resume12.component.html',
  styleUrls: ['./resume12.component.scss']
})
export class Resume12Component implements OnInit, OnDestroy {
  onEdit = false;
  ResumeJson: ResumeJson;
  subscription$: Subscription;
  ResumeEditorComponent: ResumeEditorComponent;
  currentSectionEditing: string;

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
    this.subscription$.add( this.ResumeJsonService.getCurrentSectionEditing().subscribe( section => {
      console.log(section);
      this.currentSectionEditing = section ;
    }) );
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
