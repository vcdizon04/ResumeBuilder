import { Component, OnInit } from '@angular/core';
import { JsonResumeService } from 'src/services/json-resume.service';
import { AuthService } from 'src/services/auth.service';
import { CoverJson } from 'src/models/CoverJson';
import { ResumeJson } from 'src/models/ResmeJson';
import { NgxSpinnerService } from 'ngx-spinner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as $ from 'jquery';


@Component({
  selector: 'app-cover-editor',
  templateUrl: './cover-editor.component.html',
  styleUrls: ['./cover-editor.component.scss']
})
export class CoverEditorComponent implements OnInit {
  CoverJson: CoverJson;
  isSidebarAction = 'main';
  email: string;

  constructor(
    private ResumeJsonService: JsonResumeService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    $(window).on('beforeunload', async (event) => {
      // Chrome requires returnValue to be set.
          // event.preventDefault();
          const savePromise = await this.save();
          console.log('saved');
          return undefined;
        //  e.returnValue = 'dsd';
        });
    
        $(window).on('unload', function(){
          console.log('test');
          console.log('test');
    
          console.log('test');
          console.log('test');
    
          // this.save();
    
        });
  }

  ngOnInit() {
    this.ResumeJsonService.activateEditor();
  }
  undo() {
    document.execCommand('undo', false, null);
  }
  redo() {
    document.execCommand('redo', false, null);
  }

  save() {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      html2canvas( $('.document')[0] , {backgroundColor : 'red' }).then(canvas => {
        const templatePreviewImage = canvas.toDataURL('image/jpeg', 1.0);
        this.authService.getUserDetails().subscribe(
          (user) => {
            if (user) {
              this.CoverJson = {
                name: $('.name').html() || null,
                jobTitle: $('.jobTitle').html() || null,
                companyDetails: $('.companyDetails').html() || null,
                date: $('.date').html() || null,
                email: $('.email').html() || null,
                phone: $('.phone').html() || null,
                body: $('.body').html() || null,
                templatePreview: templatePreviewImage
              };
              this.ResumeJsonService.getCoverJsonRef(user.uid).set(this.CoverJson).then(res => {
                console.log(res);
                resolve();
                this.spinner.hide();
              })
              .catch( err => reject());
            }
          }
        );
      });
   });
   // console.log(user.);
     // this.ResumeJsonService.getResumeJsonRef().push()
   }
   async download() {
    // if (this.ResumeJson.basic.profile) {
    //  const profile = $('.profile')[0];
    //  const attr = profile.createAttribute('data-html2canvas-ignore');
    // //  profile.setAttributeNode(attr);

    // }
  const document = $('.document')[0];
  const pdf = new jsPDF('p', 'mm', [216 , 279 ]);
 await html2canvas( document , {backgroundColor : 'red' }).then(canvas => {
    console.log(canvas);
     try {
      // pdf.addPage(216, 279);
      console.log(canvas.toDataURL('image/jpeg', 1.0));
      pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, 216 , 279 );
   if (!$('.document')[1]) {
     pdf.save('test.pdf');
   }
   } catch (e) {
    alert('Error description: ' + e.message);
   }
  });
  if($('.document')[1]) {
  html2canvas( $('.document')[1] , {backgroundColor : 'red' }).then(canvas2 => {
    console.log(canvas2);
     try {
      pdf.addPage(216, 279);
      pdf.addImage(
   canvas2.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, 216 , 279 );
   pdf.save( 'test.pdf');
   } catch (e) {
    alert('Error description: ' + e.message);
   }
  });
}
}
async sendResumeByEmail() {
  this.spinner.show();
  // if (this.ResumeJson.basic.profile) {
  //  const profile = $('.profile')[0];
  //  const attr = profile.createAttribute('data-html2canvas-ignore');
  // //  profile.setAttributeNode(attr);

  // }

const document = $('.document')[0];
const pdf = new jsPDF('p', 'mm', [216 , 279 ]);
await html2canvas( document , {backgroundColor : 'red' }).then(canvas => {
   try {
    // pdf.addPage(216, 279);
    pdf.addImage(
 canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, 216 , 279 );
 if (!$('.document')[1]) {
  //  pdf.save( 'test.pdf');
  // console.log( pdf.output('datauristring'));
  // const byteArray = Base64Binary.decodeArrayBuffer(pdf.output('datauri'));
  this.ResumeJsonService.sendResumeByEmail({to : this.email, attachement: (pdf.output('datauristring'))}).subscribe( (res) => {
    console.log(res);
    this.spinner.hide();
 });
 }
 } catch (e) {
  this.spinner.hide();
  alert('Error : ' + e.message);
 }
});
if($('.document')[1]) {
html2canvas( $('.document')[1] , {backgroundColor : 'red' }).then(canvas2 => {
  console.log(canvas2);
   try {
    pdf.addPage(216, 279);
    pdf.addImage(
 canvas2.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, 216 , 279 );
//  pdf.save( 'test.pdf');
  this.ResumeJsonService.sendResumeByEmail({to : this.email, attachement: (pdf.output('datauristring'))}).subscribe( (res) => {
    console.log(res);
    this.spinner.hide();
  });
 } catch (e) {
  this.spinner.hide();
  alert('Error description: ' + e.message);
 }
});
}
}
}
