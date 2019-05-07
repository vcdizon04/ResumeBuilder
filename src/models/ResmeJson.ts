export interface ResumeJson  {
    uid?: string;
    template?: string;
    templatePreview?: string;
    basic?: {
        name?: string,
        email?: string,
        profile?: string,
        phone?: string,
        address?: string,
        jobtitle?: string,
        description?: string
      };
    professionalSummary?: {
        title?: string,
        professionalSummary?: Array<string>
    };
    education?: {
        title?: string;
        education?: Array<any>;
    };
    objective?: Array<string>;
    experience?: {
        title?: string;
        experience?: Array<Experience>;
    };
    skills?: {
        skills?: Array<any>;
        title?: string;
    };
    courses_licenses?: {
        title?: string;
        courses_licenses?: Array<any>;
    };
    core_competencies?: {
        title?: string;
        core_competencies?: Array<any>;
    };
    references?: {
        title?: string;
        references?: Array<any>;
    };
    start_date?: number;
    expiration_date?: number;
  
}
interface Experience {
    date?: string;
    company?: string;
    desc?: Array<string>;
}
