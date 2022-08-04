import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddManagerDTO } from 'src/app/models/add-manager.model';
import { UpdateManagerDTO } from 'src/app/models/update-manager.model';
import { ManagerService } from 'src/app/service/manager.service';

@Component({
  selector: 'app-create-edit-manager',
  templateUrl: './create-edit-manager.component.html',
  styleUrls: ['./create-edit-manager.component.css']
})
export class CreateEditManagerComponent implements OnInit {

  @Input()
  private existingManager: any;

  allEmployees: any[] = [];

  constructor(private managerService: ManagerService, public modal: NgbActiveModal, 
    private formBuilder: FormBuilder) { }

  createEditManagerForm = this.formBuilder.group({
    nameControl: this.formBuilder.control(''),
    emailControl: this.formBuilder.control(''),
    dateOfBirthControl: this.formBuilder.control(''),
    departmentIdControl: this.formBuilder.control(''),
    subordinatedEmployeesIdsControl: this.formBuilder.array([])
  });

  ngOnInit(): void {
    if(this.existingManager){
      this.initializeEditManagerValues();
    }
  }

  private initializeEditManagerValues(){
    this.nameControl.setValue(this.existingManager.name);

    this.emailControl.setValue(this.existingManager.email);
    this.emailControl.disable();

    this.dateOfBirthControl.setValue(this.existingManager.dateOfBirth);
    this.departmentIdControl.setValue(this.existingManager.departmentId);
    this.subordinatedEmployeesIdsControl.setValue(this.existingManager.subordinatedEmployeeIds);
  }


  onManagerCreateEditSubmit() {
    if(this.existingManager){
      this.editManager();
    }
    else { 
      this.saveManager();
    }
  }

  private saveManager() {
    let addManagerDTO: AddManagerDTO = {
      name: this.nameControl.value,
      email: this.emailControl.value,
      dateOfBirth: this.dateOfBirthControl.value,
      departmentId: this.departmentIdControl.value,
      subordinatedEmployeeIds: this.subordinatedEmployeesIdsControl.value
    }

    this.managerService.addManager(addManagerDTO)
    .subscribe(() => this.modal.close(true));
  }

  private editManager() { 
    let updateManagerDTO: UpdateManagerDTO = {
      id: this.existingManager.id,
      name: this.nameControl.value,
      dateOfBirth: this.dateOfBirthControl.value,
      departmentId: this.departmentIdControl.value,
      subordinatedEmployeeIds: this.subordinatedEmployeesIdsControl.value
    }

    this.managerService.editManager(updateManagerDTO)
    .subscribe(() => this.modal.close(true));
  }

  addSubordinatedEmployee(){
    let subordinatedEmployeeGroup = this.formBuilder.group({
      arraySEIdControl: this.formBuilder.control('')
    })

    this.subordinatedEmployeesIdsControl.push(subordinatedEmployeeGroup);
  }


  removeSubordinatedEmployee(index: number){
    this.subordinatedEmployeesIdsControl.removeAt(index);
  }





  get nameControl() {
    return this.createEditManagerForm.controls['nameControl'] as FormControl;
  }

  get emailControl() {
    return this.createEditManagerForm.controls['emailControl'] as FormControl;
  }

  get dateOfBirthControl() {
    return this.createEditManagerForm.controls['dateOfBirthControl'] as FormControl;
  }

  get departmentIdControl() {
    return this.createEditManagerForm.controls['departmentIdControl'] as FormControl;
  }
  
  get subordinatedEmployeesIdsControl() {
    return this.createEditManagerForm.controls['subordinatedEmployeesIdsControl'] as FormArray;
  }
}
