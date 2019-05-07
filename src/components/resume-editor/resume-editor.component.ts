import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as MediumEditor from 'medium-editor';
import * as ColorPicker from 'medium-editor-colorpicker-buttons';
import * as $ from 'jquery';
import { JsonResumeService } from 'src/services/json-resume.service';
import { ResumeJson } from 'src/models/ResmeJson';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from 'src/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomService } from 'src/services/dom.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Papa } from 'ngx-papaparse';
import * as _ from 'lodash';
import popover from 'popper.js';
import { empty } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-resume-editor',
  templateUrl: './resume-editor.component.html',
  styleUrls: ['./resume-editor.component.scss']
})
export class ResumeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('document') document;
  email: string;
  isSidebarAction = 'main';
  page2: boolean;
  currentAddSectionItem: string;
  dataIndex: number;
  previewProfile: string;
  jobTitles: Array<any>;
  jobTitlesFiltered: Array<any>;
  currentJobTitleId: string;
  currentJob = {
    JOB_ID: undefined,
    JOB_VALUE: undefined
  };
  jobSkills: Array<any>;
  jobSkillsFiltered: Array<any>;
  jobDescriptions: Array<any>;
  jobDescriptionsFiltered: Array<any>;
  jobProfessionalSummary: Array<any>;
  jobProfessionalSummaryFiltered: Array<any>;
  education = {
    year: undefined,
    school: undefined,
    info1: undefined,
    info2: undefined
  };
  coursesLicenses = {
    year: undefined,
    school: undefined,
    info1: undefined,
  };
  objective = 'Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet';
  experience = {
    position: undefined,
    company: undefined,
    desc: [],
    date: '2011 - 2013',
    place: 'MICHIGAN, MI',
    city: undefined,
    state: undefined
  };
  skills: Array<string> = [];
  professionalSummary: Array<string> = [];
  references = {
    name: undefined,
    contactNumber: undefined,
    address: undefined
  };

  observerEditor: MutationObserver;
  ResumeJson: ResumeJson;
  File: File;
  isSearch: boolean;
  iteration: number;
  iteration2: number;
  offsetHeight;
  pageBreaker;
  constructor(
    private ResumeJsonService: JsonResumeService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private domService: DomService,
    private papa: Papa,
    private router: Router
  ) {


  //   $(window).on('beforeunload', (e) => {
  // // Chrome requires returnValue to be set.
  //     event.preventDefault();
  //      this.save().then(
  //       res => {
  //         console.log('saved');
  //         return undefined;
  //       },
  //       err => ''
  //     );
  //   //  e.returnValue = 'dsd';
  //   });

    // $(window).on('unload', function(){
    //   console.log('test');
    //   console.log('test');

    //   console.log('test');
    //   console.log('test');

    //   // this.save();

    // });
    console.log('constructor executed : ResumeEditor');
    this.currentAddSectionItem = 'profSummary';
    this.ResumeJsonService.getAllJobs().subscribe(res => {
      const csv = res as any;
      this.papa.parse(csv._body, {
        complete: (result) => {
          console.log(result , 'parsed');
          this.jobTitles = result.data;
          this.jobTitlesFiltered = result.data;
        },
        header: true
    });

    });

    this.ResumeJsonService.getAllSkills().subscribe(res => {
      const csv = res as any;
      this.papa.parse(csv._body, {
        complete: (result) => {
          console.log(result , 'parsed');
          this.jobSkills = result.data;
          this.jobSkillsFiltered = result.data;
        },
        header: true
    });

    });
    this.ResumeJsonService.getAllJobDescriptions().subscribe(res => {
      const csv = res as any;
      this.papa.parse(csv._body, {
        complete: (result) => {
          console.log(result , 'parsed JOB');
          this.jobDescriptions = result.data;
          this.jobDescriptionsFiltered = result.data;
          this.spinner.hide();
        },
        header: true
    });
    });
    this.ResumeJsonService.getAllProfessionalSummary().subscribe(res => {
      const csv = res as any;
      this.papa.parse(csv._body, {
        complete: (result) => {
          console.log(result , 'parsed ProffSummary');
          this.jobProfessionalSummary = result.data;
          this.jobProfessionalSummaryFiltered = result.data;
          this.spinner.hide();
        },
        header: true
    });
    });
  }

  ngOnInit() {
    console.log('ngoninit executed : ResumeEditor');

    this.spinner.show();
    // this.offsetHeight = $('.content:eq(0)')[0].offsetHeight;
    this.ResumeJsonService.getResumeJson().subscribe(resumeJson => {
      console.log(resumeJson);
      this.ResumeJson = resumeJson;

    } );
  // this.activateEditor();
  // this.onEditorFocusAndOut();
  // this.domObserver();

  }
  ngAfterViewInit() {
    // $('[data-toggle="popover"]').popover();
     this.pageBreaker = setInterval(this.pageBreakerObserver, 100);
  }
  ngOnDestroy() {
    clearInterval(this.pageBreaker);
  }
  domObserver() {
    const config = { subtree: true , childList: true};
    // Create an observer instance linked to the callback function
    this.observerEditor =  new MutationObserver((mutationsList, observer) => {
      this.domObserverCallBack(mutationsList, observer);
    });
    // Start observing the target node for configured mutations
    $('.document').get().forEach( (dom) => {
      this.observerEditor.observe(dom, config);
    } );
    
    // this.observerEditor.observe($('.document')[0], config);
    // this.observerEditor.observe($('.document')[1], config);
  }

     // Callback function to execute when mutations are observed
  domObserverCallBack(mutationsList, observer) {
      console.log(mutationsList , 'mutationsList');
      // this.pageBreakerObserver();
      this.activateEditor();
      this.onEditorFocusAndOut();
      console.log('editor activated');

        // for ( const mutation of mutationsList ) {
        //   console.log(mutation.type);
        //     if (mutation.type === 'characterData' || mutation.type === 'childList') {
        //         console.log('A child node has been added or removed.');
        //     }
        // }
        // this.activateEditor();
        // this.onEditorFocusAndOut();
  }
  domObserverDisconnect() {
    this.observerEditor.disconnect();
  }
  pageBreakerObserver() {
    let i = 0;
    let x = 0;
    let outerHtmlOverFlowed = '';
    let loop = true;
    let container;
    let containerClass;
    
    // const a = new Promise( (resolve , reject) => {
          if ( $('.content:eq(0)')[0].scrollHeight > $('.content:eq(0)')[0].offsetHeight ) {
            // debugger; 
            this.iteration = 0;
            console.log(this.iteration);
            console.log($('.content:eq(0)')[0].scrollHeight + ' :Scroll Height',  $('.content:eq(0)')[0].offsetHeight + ' :OffsetHEIGHT')
            this.offsetHeight =  $('.content:eq(0)')[0].offsetHeight;
            if (($('.content:eq(1)').length === 0)) {
              $('.document:eq(0)').clone().appendTo($('.document:eq(0)').parent()[0]);
              $('.document:eq(1)').find('.content').empty();
              $('.document:eq(1)').find('.basic, .side').remove();
            }
            // this.ResumeJsonService.isPage2 = true
         
              container = $('.content:eq(0)').find('.editable-container').last().clone().empty();
              containerClass = '.' + container.attr('class').replace(/ /gi, '.');
              console.log('.content ' + containerClass + ':eq(1)' , 'containerClass');
              // const element = $($('.content:eq(0)').find('.editable-item').get().reverse())[this.iteration];
              console.log($('.content ' + containerClass + ':eq(1)').length);
              if ($('.content:eq(1)').find(containerClass).length === 0) {
                console.log('Append the container');
                $('.content:eq(1)').prepend(container);
              }
              // $(element).remove();
              // this.offsetHeight = $('.content:eq(0)')[0].offsetHeight;

            //  $('.content:eq(0)').find('.editable-item').last().detach().prependTo('.content ' + containerClass.replace(' ', '') + ':eq(1)');
            $('.content:eq(1)').find( containerClass).prepend( $('.content:eq(0)').find('.editable-item').last().detach());
              // outerHtmlOverFlowed += element;
              const scrollHeight = $('.content:eq(0)')[0].scrollHeight;
              if ($('.content:eq(0)').find('.editable-container').last().children().length === 0) {
                console.log('remove container');
                $('.content:eq(0)').find('.editable-container').last().remove();
              }
             this.iteration += 1;
          } else if ($('.content:eq(1)').find('.editable-item').length ) {
            // debugger;
            container = $('.content:eq(1)').find('.editable-container').first().clone().empty();
            containerClass = '.' + container.attr('class').replace(/ /gi, '.');
            this.iteration2 = 0;
            const element = $('.content:eq(1)').find('.editable-item').get()[this.iteration2];
            let futureTotalHeight = $('.content:eq(1)').find('.editable-item').get()[0].offsetHeight + $('.content:eq(0)')[0].offsetHeight;
            if ($('.content:eq(0)').find(containerClass).length <= 1) {
              futureTotalHeight =  $('.content:eq(1)').find('.editable-container')[0].offsetHeight + $('.content:eq(0)')[0].offsetHeight;
            }
            if ( futureTotalHeight <=  this.offsetHeight ) {
            // debugger;
            if ($('.content:eq(0)').find(containerClass).length === 0) {
              console.log('Append the container');
              $('.content:eq(0)').append(container);
            }
              $('.content:eq(0)').find(containerClass).append($('.content:eq(1)').find('.editable-item').first().detach());
              this.iteration2 += 1;
              if ($('.content:eq(1)').find('.editable-container').first().children().length === 0) {
                $('.content:eq(1)').find('.editable-container').first().remove();
              }
            }
          } else {
            $('.document:eq(1)').remove();
          }

          // if ($('.content:eq(1)').find('*').get().length === 0) {
          //   $('.document:eq(1)').remove();
          // }
        // });
      // while ( $('.content:eq(0)')[0].scrollHeight > $('.content:eq(0)')[0].clientHeight ) {
      //   const container = $('.content:eq(0)').children().last().clone().empty();
      //   const containerClass = '.' + container.attr('class').replace(' ', '.');
      //   const element = $($('.content:eq(0)').find('*').get().reverse())[i];
      //   if ($('.content ' + containerClass + ':eq(1)').length === 0) {
      //     console.log('Append the container');
      //     $('.content:eq(1)').prepend(container);
      //   }
      //   $(element).detach().prependTo('.content ' + containerClass + ':eq(1)');
      //   i++;
      // }
    // a.then( () => {
    //   console.log('promise ended')
    //   if ($('.content:eq(1)').find('*').get().length) {
    //     $($('.content:eq(1)').children().first().find('*').get()).each( (i2, val2) => {
    //       if ($('.content:eq(0)')[0].clientHeight < 932) {
    //       $(val2).detach().appendTo($('.content:eq(0)').children().last());
    //       } else {
    //         return false;
    //       }
    //     });
    // }
    // })


    
    // let elementsPageBreak = '';
    // $($('.content:eq(0)').find('*').get().reverse()).each( (i, val) => {
    //   console.log($(val));
    //   if ( $('.content:eq(0)')[0].scrollHeight > $('.content:eq(0)')[0].clientHeight ) {
    //       this.ResumeJsonService.isPage2 = true;
    //       const container = $('.content:eq(0)').children().last().clone().empty();
    //       const containerClass = '.' + container.attr('class').replace(' ', '.');
    //       if ($('.content ' + containerClass + ':eq(1)').length === 0) {
    //         console.log('Append the container');
    //        $('.content:eq(1)').prepend(container);
    //       }
    //       elementsPageBreak += val.outerHTML;
    //       $(val).detach().prependTo('.content ' + containerClass + ':eq(1)');
    //   } 
    //   else if ($('.content:eq(0)')[0].clientHeight < 932) {
    //       if ($('.content:eq(1)').find('*').get().length) {
    //         $($('.content:eq(1)').children().first().find('*').get()).each( (i2, val2) => {
    //           if ($('.content:eq(0)')[0].clientHeight < 932) {
    //            $(val2).detach().appendTo($('.content:eq(0)').children().last());
    //           } else {
    //             return false;
    //           }
    //         });
    //       }
    //   }
    //    else {
    //       console.log(elementsPageBreak , 'html');
    //       return false;
    //     }
    // } );
  }
  searchJobtitle(event) {
   this.jobTitlesFiltered = this.jobTitles.filter((item) => {
      return (item.JOB_VALUE.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
    });
  }
  onSearch() {
    console.log('searching');
    this.isSearch = true;
  }
  selectJob() {
    console.log(this.currentJob);
    this.isSearch = false;
    console.log('select' , this.currentJob.JOB_ID);
    this.experience.position = this.currentJob.JOB_VALUE;
    this.currentJobTitleId = this.currentJob.JOB_ID;
    this.jobSkillsFiltered = this.jobSkills.filter((item) => {
      return (item.JOB_ID.toLowerCase() === this.currentJobTitleId.toLowerCase() );
    });
    this.jobDescriptionsFiltered = this.jobDescriptions.filter((item) => {
      return (item.JOB_ID.toLowerCase() === this.currentJobTitleId.toLowerCase() );
    });
    this.jobProfessionalSummaryFiltered = this.jobProfessionalSummary.filter((item) => {
      return (item.job_id.toLowerCase() === this.currentJobTitleId.toLowerCase());
    });
    console.log(this.jobProfessionalSummary);
  }


  paginate (array, page_size, page_number) {
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
  activateEditor() {
  $('.editable').off();
  $('.editable').unbind();
   this.ResumeJsonService.activateEditor();
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
    if ($('.document')[1]) {
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
  chooseSection(section) {
    this.currentAddSectionItem = section;
  }
  addSection(section) {
    console.log(section);

    if (section === 'education') {
      this.addEducation();
    } else if (section === 'objectives') {
      this.addObjectives();
    } else if (section === 'experience') {
      this.addExperience();
    } else if (section === 'skills') {
      this.addSkills();
    } else if (section === 'professionalSummary') {
      this.addprofessionalSummary();
    } else if (section === 'references') {
      this.addReferences();
    }
    this.updateResumeJson();
    // this.activateEditor();

  }
    deleteSection() {
      const confirmation = confirm('Are you sure you want to delete this section?');
      console.log(this.currentAddSectionItem);
      if (confirmation) {
        delete this.ResumeJson[this.currentAddSectionItem];
        // $('.summary').remove();
        $('.' + this.currentAddSectionItem).remove();
      }
    }

  deleteEntry() {
  console.log(this.dataIndex);
   this.ResumeJson[this.currentAddSectionItem][this.currentAddSectionItem].splice(this.dataIndex, 1);
   $('.editable-item-toolbar').css( {'display': 'none'});

    // if (section === 'education') {
    //   this.deleteEducationEntry();
    // } else if (section === 'objectives') {
    //   this.deleteObjectivesEntry();
    // } else if (section === 'experience') {
    //   this.deleteExperienceEntry();
    // } else if (section === 'skills') {
    //   this.deleteSkillsEntry();
    // }
    this.updateResumeJson();
    // this.activateEditor();

  }
  addEducation() {
    if (this.ResumeJson.education) {
        this.ResumeJson.education.education.push(this.education);
    } else {
      this.ResumeJson.education = { title: 'Education' , education: [] };
      this.ResumeJson.education.education.push(this.education);
    }
  }
  addObjectives() {
    if (this.ResumeJson.objective) {
      this.ResumeJson.objective.push(this.objective);
    } else {
      this.ResumeJson.objective = [];
      this.ResumeJson.objective.push(this.objective);
    }
  }
  addExperience() {
    if (this.ResumeJson.experience) {
      this.ResumeJson.experience.experience.push(this.experience);
    } else {
      this.ResumeJson.experience = { title: 'Employment History', experience: [] };
      this.ResumeJson.experience.experience.push(this.experience);
    }
    this.experience = {
      position: undefined,
      company: undefined,
      desc: [],
      date: '2011 - 2013',
      place: 'MICHIGAN, MI',
      city: undefined,
      state: undefined
    };

  }
  addSkills() {
    if (this.ResumeJson.skills) {
      this.ResumeJson.skills.skills = [... this.ResumeJson.skills.skills, ...this.skills];
    } else {
      this.ResumeJson.skills = { title: 'Skills' , skills: [] };
      this.ResumeJson.skills.skills = [... this.ResumeJson.skills.skills, ...this.skills];
    }
    this.skills = [];
  }
  addprofessionalSummary() {
    if (this.ResumeJson.professionalSummary) {
      this.ResumeJson.professionalSummary.professionalSummary =
      [... this.ResumeJson.professionalSummary.professionalSummary, ...this.professionalSummary];
    } else {
      this.ResumeJson.professionalSummary = { title: 'Professional Summary' , professionalSummary: [] };
      this.ResumeJson.professionalSummary.professionalSummary =
      [... this.ResumeJson.professionalSummary.professionalSummary, ...this.professionalSummary];
    }
    this.professionalSummary = [];
  }
  addReferences() {
    if (this.ResumeJson.references) {
      this.ResumeJson.references.references.push(this.references);
    } else {
      this.ResumeJson.references = { title: 'References' , references: [] };
      this.ResumeJson.references.references.push(this.references);
    }
    this.references = {
      name: undefined,
      contactNumber: undefined,
      address: undefined
    };
  }
  addItemSkill(skill) {
    if ( this.skills.indexOf(skill) < 0 ) {
      console.log(skill);
      this.skills.push(skill);
    } else {
      this.removeItemSkill(this.skills.indexOf(skill));
    }
  }
  addItemJobDescription(desc) {
    if ( this.experience.desc.indexOf(desc) < 0 ) {
        this.experience.desc.push(desc);
    } else {
      this.removeItemJobDescription(this.experience.desc.indexOf(desc));
    }
  }
  addItemJobProfessionalSummary(profSummary) {
    if ( this.professionalSummary.indexOf(profSummary) < 0 ) {
      console.log(profSummary);
      this.professionalSummary.push(profSummary);
    } else {
      this.removeItemJobProfessionalSummary(this.professionalSummary.indexOf(profSummary));
    }
  }
  removeItemSkill(index) {
    console.log(index);
    this.skills.splice(index, 1);
  }
  removeItemJobDescription(index) {
    console.log(index);
    this.experience.desc.splice(index, 1);
  }
  removeItemJobProfessionalSummary(index) {
    console.log(index);
    this.professionalSummary.splice(index, 1);
  }
  deleteEducationEntry() {
    this.ResumeJson.education.education.pop();
  }
  deleteObjectivesEntry() {
    this.ResumeJson.objective.pop();
  }
  deleteExperienceEntry() {
    this.ResumeJson.experience.experience.pop();
  }
  deleteSkillsEntry() {
    this.ResumeJson.skills.skills.pop();
  }
  onSaveChanges() {
      $('body').on('focus', '[contenteditable]', function() {
          const $this = $(this);
          $this.data('before', $this.html());
      }).on('blur keyup paste input', '[contenteditable]', function() {
          const $this = $(this);
          if ($this.data('before') !== $this.html()) {
              $this.data('before', $this.html());
              $this.trigger('change' );
          }
      });
      $('[contenteditable]').on('change', () => {
        console.log('changed' );
      });
  }
  undo() {
    document.execCommand('undo', false, null);
  }
  redo() {
    document.execCommand('redo', false, null);
  }
  updateResumeJson() {
    this.ResumeJsonService.updateResumeJson(this.ResumeJson);
  }

  onEditorFocusAndOut() {
    // $('.editable').focusin((e) => {
    //   this.ResumeJsonService.setActiveStateEditor(true);
    // }).focusout( () => {
    //   this.ResumeJsonService.setActiveStateEditor(false);
    // });

    // $('.editable')
    // .focus((e) => {
    // const $this = $(e.currentTarget);
    //  const container =  $this.closest( '.editable-container' ).addClass('active');
    // //  console.log($(this)`.closest( '.editable-container' )`
    // //  .attr('class').replace(/row|col-row-1|editable-container|active| |col-sm-12|/gi, ''));
    // const parentClass = $this.closest( '.editable-container' ).attr('class');
    // const currentSectionEditing = parentClass.includes('basic') ? 'basic' : parentClass.includes('education') ? 'education'
    // : parentClass.includes('experience') ? 'experience' : parentClass.includes('professionalSummary ') ? 'professionalSummary'
    // : 'skills';
    // this.ResumeJsonService.setCurrentSectionEditing(currentSectionEditing);
    // })
    // .blur( e => {
    //   const $this = $(e.currentTarget);
    //   const container = $this.closest( '.editable-container' ).removeClass('active');
    //   setTimeout( () => this.ResumeJsonService.setCurrentSectionEditing('') , 200);
    // });
    $('.editable-container' ).off();
    $('.editable-container' ).unbind();
    $('.editable-container').on('focusin', (e) => {
      this.ResumeJsonService.setActiveStateEditor(true);
      // $('.editable-container').removeClass('active');
      const $this = $(e.currentTarget);
      $this.addClass('active');
      //  console.log($(this).closest( '.editable-container' )
      //  .attr('class').replace(/row|col-row-1|editable-container|active| |col-sm-12|/gi, ''));
      const parentClass = $this.attr('class');
      const currentSectionEditing = parentClass.includes('basic') ? 'basic' : parentClass.includes('education') ? 'education'
      : parentClass.includes('experience') ? 'experience' : parentClass.includes('professionalSummary ') ? 'professionalSummary'
      : parentClass.includes('skills') ? 'skills' :  parentClass.includes('references') ? 'references' : '';
      this.ResumeJsonService.setCurrentSectionEditing(currentSectionEditing);
      this.currentAddSectionItem = currentSectionEditing;
      }).focusout( (e) => {
        const $this = $(e.currentTarget);
        $this.removeClass('active');
        if ($this[0].contains(e.relatedTarget) || $('.editable-toolbar:hover').length) {
            return;
        } else {
          this.ResumeJsonService.setActiveStateEditor(false);
          this.ResumeJsonService.setCurrentSectionEditing('');
        }
      });

      // $('.editable-container').on('focusout', e => {
      //     // $this.removeClass('active');
      //     // setTimeout( () => this.ResumeJsonService.setCurrentSectionEditing('') , 100);
      //     // this.ResumeJsonService.setCurrentSectionEditing('');
      //   });
      $('.editable-item').off();
      $('.editable-item').unbind();
      $('.editable-item').on('focusin', (e) => {
        const $this = $(e.currentTarget);
        // console.log( this.getOffset($this[0]));
        if ($this.find('.title').length === 0) {
          $('.editable-item-toolbar')
          .css( {'display': 'block', 'left': this.getOffset($this[0]).left + 187.99988134765624 + 'px',
          'top': this.getOffset($this[0]).top - 40.0004559326172 + 'px'});
          this.dataIndex = $this.data('index');
          console.log(this.dataIndex);
        }
        const parentClass = $this.closest('.editable-container').attr('class');
        const currentSectionEditing = parentClass.includes('basic') ? 'basic' : parentClass.includes('education') ? 'education'
        : parentClass.includes('experience') ? 'experience' : parentClass.includes('professionalSummary ') ? 'professionalSummary'
        : parentClass.includes('skills') ? 'skills' :  parentClass.includes('references') ? 'references' : '';
        // this.ResumeJsonService.setCurrentSectionEditing(currentSectionEditing);
        this.currentAddSectionItem = currentSectionEditing;
      }).focusout( () => {
        if ($('.editable-item-toolbar:hover').length) {
          return;
        } else {
          $('.editable-item-toolbar').css( {'display': 'none'});
        }
      });
  }

  previeImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.File = event.target.files[0];
      const reader = new FileReader();

      reader.onload =  (e) => {
          // document.getElementById('blah').src=e.target.result
          console.log(e);
        this.ResumeJson.basic.profile = e.target.result;
        this.ResumeJsonService.updateResumeJson(this.ResumeJson);
      };

      reader.readAsDataURL(event.target.files[0]);
  }
  }
  uploadImage() {
   console.log('uploading');
  //  this.ResumeJsonService.doUpload(this.File).percentageChanges().subscribe(res => {
  //     console.log(res);
  //    });
  //  this.ResumeJsonService.uploadImage(this.File).subscribe( url => {
  //     console.log(url);
  //   });
  this.spinner.show();
  this.ResumeJsonService.uploadImage(this.File).then(() => this.ResumeJsonService.getRef().getDownloadURL().subscribe(url => {
    console.log(url);
    this.ResumeJson.basic.profile = url;
    this.ResumeJsonService.updateResumeJson(this.ResumeJson);
    // this.authService.updateProfile(this.ResumeJson.basic.name , url).then(() => {
    //    console.log('success');
    //    this.ResumeJsonService.ResumeJson.basic.profile = url;
    //    this.spinner.hide();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     alert('Error Please try again');
    //     this.spinner.hide();
    //   });
  }));

  }
  save() {
    this.spinner.show();
    return html2canvas( $('.document')[0] , {backgroundColor : 'red' }).then(canvas => {
      try {
          console.log(canvas.toDataURL('image/jpeg', 1.0));
          const previewImage = canvas.toDataURL('image/jpeg', 1.0);
          return new Promise((resolve, reject) => {
            this.authService.getUserDetails().subscribe(
              (user) => {
                if (user) {
                  console.log(this.getCurrentExperience() , 'EXPERIENCE');
                  console.log(this.getCurrentEducation() , 'Education');
                  console.log(this.getCurrentReferences() , 'References');
                  this.ResumeJson = {
                      basic: {
                        name: $('.basic .name').text() || null,
                        jobtitle: $('.basic .jobtitle').text() || null,
                        description: $('.basic .description').text() || null,
                        profile: this.ResumeJson.basic.profile || null,
                        email: $('.basic .email').text() || null,
                        phone: $('.basic .phone').text() || null,
                        address: $('.basic .address').text() || null,
                      },
                      education: {
                        title: $('.education .title').text() || null,
                        education: this.getCurrentEducation() || null,
                      },
                      experience: {
                        title:  $('.experience .title').text() || null,
                        experience: this.getCurrentExperience() || null
                      },
                      skills: this.getCurrentSkills() || null,
                      professionalSummary: this.getCurrentProfessionalSummary() || null,
                      references: {
                        title: $('.references .title').text() || null,
                        references: this.getCurrentReferences() || null
                      },
                      templatePreview: previewImage,
                  };
                  console.log(this.ResumeJson);
                  this.ResumeJsonService.getResumeJsonRef(user.uid).set(this.ResumeJson).then(res => {
                    console.log(res);
                    resolve();
                    this.spinner.hide();
                  })
                  .catch( err => reject());
                }
              }
            );
        });
        } catch (e) {
        alert('Error description: ' + e.message);
        }
    });
 
  // console.log(user.);
    // this.ResumeJsonService.getResumeJsonRef().push()
  }
  getCurrentEducation(): Array<any> {
       const a = $('.education .year ').map(function() {
          return this.innerText;
      }).get();
       const b = $('.education .info1 ').map(function() {
          return this.innerText;
      }).get();
      const c = $('.education .school ').map(function() {
          return this.innerText;
      }).get();
      return a.map((e, i) => {
        return { year: e, info1: b[i], school: c[i] };
      });
  }
  getCurrentExperience(): Array<any> {
    const a = $('.experience .date ').map(function() {
       return this.innerText;
   }).get();
    const b = $('.experience .company ').map(function() {
       return this.innerText;
   }).get();

  return a.map((e, i) => {
     return { date: e, company: b[i], desc: $('.experience .desc-' + [i]).map(function() {
      return this.innerText;
  }).get() };
   });
  }

  getCurrentSkills(): Object {
    const a = $('.skills .title ').text();
    const b = $('.skills .skill ').map(function() {
       return this.innerText;
   }).get();
  return { title: a || null, skills: b };
}

  getCurrentProfessionalSummary(): Object {
    const a = $('.professionalSummary .title ').text();
    const b = $('.professionalSummary .summary ').map(function() {
      return this.innerText;
  }).get();
  return { title: a || null, professionalSummary: b };
  }

  getCurrentReferences(): Array<any> {
    // const a = $('.references .title ').text();
    const a = $('.references .name ').map(function() {
       return this.innerText;
   }).get();
    const b = $('.references .contactNumber ').map(function() {
      return this.innerText;
    }).get();
    const c = $('.references .address ').map(function() {
      return this.innerText;
    }).get();
    return a.map((e, i) => {
      return { name: e, contactNumber: b[i], address: c[i] };
    });
}

 getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

chooseTemplate() {
  this.isSidebarAction = 'chooseTemplate';
}
gotoMainSideBar() {
  this.isSidebarAction = 'main';
}
selectTemplate(template) {
  this.ResumeJson.template = template;
  this.updateResumeJson();
  this.router.navigate(['/resume-editor/' + template]);
}


}
