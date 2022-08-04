import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerService } from 'src/app/service/manager.service';
import { Manager } from '../../models/manager.model';
import { CreateEditManagerComponent } from '../create-edit-manager/create-edit-manager.component';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {

  allManagers: Manager[] = [];

  constructor(private managerService: ManagerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initializeManagers();
  }

  private initializeManagers() {
    this.managerService.getAllManagers()
    .subscribe((managers) => {
      this.allManagers = managers;
    });
  }

  openCreateManagerModal() {
    let modalRef = this.modalService.open(CreateEditManagerComponent, {size: 'xl'});
    modalRef.result.then((result) => {
      if(result) {
        this.initializeManagers()
      }
    });
  }

  openEditManagerModal(manager: Manager) {
    let modalRef = this.modalService.open(CreateEditManagerComponent, {size: 'xl'});
      modalRef.componentInstance.existingManager = manager;
      modalRef.result.then((result) => {
        if(result) {
          this.initializeManagers()
        }
      });
  }

}
