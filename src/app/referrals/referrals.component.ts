import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../services/employee-services/employee.service';
import { Referrals } from '../utilities/referrals-class';
import { TableDataService } from '../services/shared-service/table-data.service';
@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit, OnDestroy {
  public isLoading: boolean = true;
  private displayedColumns: string[] = ['Referral Name', 'Job Id', 'Current Level', 'Current Status', 'Progress'];

  constructor(private employeeService: EmployeeService, private tableDataService: TableDataService) { }

  ngOnInit() {
    this.employeeService.getReferralsByEmployeeId(sessionStorage.getItem('employeeId')).subscribe((response: Array<Referrals>) => {
      this.tableDataService.changeDataSource(response);
      this.tableDataService.changeDisplayedColumns(this.displayedColumns);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.tableDataService.clearData();
  }
}
