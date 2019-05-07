import { Injectable } from '@angular/core';
import { ResumeJson } from 'src/models/ResmeJson';
import { BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as MediumEditor from 'medium-editor';
import * as ColorPicker from 'medium-editor-colorpicker-buttons';
import * as $ from 'jquery';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { CoverJson } from 'src/models/CoverJson';


@Injectable({
  providedIn: 'root'
})
export class JsonResumeService {

  ResumeJson: ResumeJson ;
  CoverJson: CoverJson;
  ref;
  Template: string;
  isPage2 = true;

  private ResumeJsonSource = new BehaviorSubject(this.ResumeJson);
  currentResumeJson = this.ResumeJsonSource.asObservable();

  private CoverJsonSource = new BehaviorSubject(this.CoverJson);
  currentCoverJson = this.CoverJsonSource.asObservable();

  private onEditorStateSource = new BehaviorSubject(false);
  currentEditorState = this.onEditorStateSource.asObservable();

  private curentSectionEditingSource = new BehaviorSubject('');
  curentSectionEditing = this.curentSectionEditingSource.asObservable();


  constructor(
    private afStorage: AngularFireStorage,
    private authService: AuthService,
    private afDatabase: AngularFireDatabase,
    private http: Http
  ) {
     this.authService.getUserDetails().subscribe(
      async (user) => {
        if (user) {
          console.log(user);
          const ResumeJsonPromise = await new Promise( (resolve, reject) => {
            this.getResumeJsonRef(user.uid)
            .valueChanges().subscribe(result => {
             resolve(result);
             if (result) {
               this.updateResumeJson(result);
             }
            });
          } );
          this.CoverJson =  await new Promise( (resolve, reject) => {
            this.getCoverJsonRef(user.uid)
            .valueChanges().subscribe(result => {
             if (result) {
               resolve(result);
               this.updateCoverJson(result);
             } else {
               reject();
               const jsonResume = ResumeJsonPromise as ResumeJson;
                this.CoverJson = {
                  name: jsonResume.basic.name,
                  jobTitle: jsonResume.basic.jobtitle,
                  date: this.DateNow,
                  email: jsonResume.basic.email,
                  phone: jsonResume.basic.phone
                };
              this.updateCoverJson(this.CoverJson);
             }
            });
          } );
          

        }
      }
    );
  }
  updateResumeJson(json) {
    this.ResumeJsonSource.next(json);
  }
  updateCoverJson(json) {
    this.CoverJsonSource.next(json);
  }
  getResumeJson() {
    return this.currentResumeJson;
  }
  getCoverJson() {
    return this.currentCoverJson;
  }
  setTemplate(template) {
    this.ResumeJson.template = template;
  }
  getTemplate() {
    return this.ResumeJson.template;
  }
  getCurrentStateEditor() {
    return this.currentEditorState;
  }
  getCurrentSectionEditing() {
    return this.curentSectionEditing;
  }
  setActiveStateEditor(state) {
    this.onEditorStateSource.next(state);
  }
  setCurrentSectionEditing(section) {
    this.curentSectionEditingSource.next(section);
  }
  doUpload(file) {
    // create a random id
  const randomId = Math.random().toString(36).substring(2);
  // create a reference to the storage bucket location
  this.ref = this.afStorage.ref(randomId);
  // the put method creates an AngularFireUploadTask
  // and kicks off the upload
  return this.ref.put(file);
  }
  uploadImage(file) {
  const randomId = Math.random().toString(36).substring(2);
  const filepath = 'profiles/' + randomId;
  this.ref = this.afStorage.ref(filepath);
  return this.afStorage.upload(filepath, file);
  }
  getRef() {
    return this.ref;
  }
  getResumeJsonRef(uid) {
    return this.afDatabase.object('/resumes/' + uid + '/resume');
  }
  getCoverJsonRef(uid) {
    return this.afDatabase.object('/resumes/' + uid + '/cover');
  }
  getResumeJsonRefByList(uid) {
    return this.afDatabase.list('/resumes/' + uid + '/resume');
  }
  getResumeJsonRefAccount(uid) {
    return this.afDatabase.object('/resumes/' + uid + '/account');
  }
  get DateNow() {
    const dateObj = new Date();
    const month = dateObj.toLocaleString('en-us', { month: 'long' });
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return `${day} ${month}, ${year}`;
  }

  activateEditor() {
    const mediumEditorColorButtons = ColorPicker.get(MediumEditor);
    const TextColorButtonClass = mediumEditorColorButtons.TextColorButtonClass;
    const editbleElements = document.querySelectorAll('.editable');
    const editor = new MediumEditor(editbleElements , {
         toolbar: {

           buttons: [
             'bold', 'textcolor', 'fontname', 'fontsize', 'justifyLeft', 'justifyCenter' ,
             'justifyRight', 'italic', 'underline', 'anchor', 'h1' , 'h2', 'h3'
           ]
       },
       placeholder: false,
       extensions: {
         textcolor: new TextColorButtonClass(/* options? */)
       }
     });
  }
  getAllSkills() {
    return this.http.get('./assets/csv/skills.csv');
  }
  getAllJobs() {
    return this.http.get('./assets/csv/job_titles.csv');
  }
  getAllJobDescriptions() {
    return this.http.get('./assets/csv/job_descriptions.csv');
  }
  getAllProfessionalSummary() {
    return this.http.get('./assets/csv/professional_summary_all.csv');
  }
  sendResumeByEmail(data) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this.http.post('http://localhost/sendgrid-php/index.php' , { data: { to: data.to , attachement: data.attachement} }, {
    headers: headers
   } );
  }
}
