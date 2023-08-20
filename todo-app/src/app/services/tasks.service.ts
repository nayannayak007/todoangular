import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task }  from '../tasks/tasks.component';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`/tasks`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`/tasks`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`/tasks/${id}`);
  }
}
