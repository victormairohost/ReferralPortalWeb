import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';
import { OpenJob } from './open-job-class';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private commonService: CommonService) { }

  getOpenJobs(): Observable<Array<OpenJob>> {
    return this.commonService.getMethod(environment.BASE_URL + environment.EMPLOYEE_END_POINT + 'getOpenJobs');
  }

  getOpenJobById(jobId: string): Observable<OpenJob> {
    let hp = new HttpParams();
    hp = hp.append('jobId', jobId);
    return this.commonService.getMethodWithQueryParam(environment.BASE_URL + environment.EMPLOYEE_END_POINT + 'getJobByJobId', hp);
  }

  addReferral(data: string, resume: any): Observable<any> {
    let hp = new HttpParams();
    hp = hp.append('myjson', data);
    console.log(hp);
    const fd = new FormData();
    fd.append('file', resume);
    console.log('FD', fd);
    return this.commonService.postFormDataMethod(environment.BASE_URL + environment.EMPLOYEE_END_POINT + 'addReferral', hp, fd);
  }
}
