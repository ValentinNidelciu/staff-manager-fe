import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddManagerDTO } from '../models/add-manager.model';
import { Manager } from '../models/manager.model';
import { UpdateManagerDTO } from '../models/update-manager.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private readonly MANAGER_URL = "http://localhost:8080/manager";

  constructor(private httpClient: HttpClient) { }

  getAllManagers(): Observable<Manager[]> {
    return this.httpClient.get<Manager[]>(this.MANAGER_URL);
  }

  getManagerById(managerId: string): Observable<Manager> {
    return this.httpClient.get<Manager>(`${this.MANAGER_URL}/${managerId}`)
  }

  removeManager(managerId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.MANAGER_URL}/${managerId}`);
  }

  addManager(addManagerDTO: AddManagerDTO): Observable<void> {
    return this.httpClient.post<void>(this.MANAGER_URL, addManagerDTO);
  }

  editManager(updateManagerDTO: UpdateManagerDTO): Observable<void> {
    return this.httpClient.patch<void>(this.MANAGER_URL, updateManagerDTO);
  }
}
