import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7046/api/Tasks'; // Actualiza la URL de la API
  taskUpdated = new EventEmitter<void>(); // EventEmitter para notificar actualizaciones de tareas
  taskCreated = new Subject<void>();
  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(id: number, task: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, task).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Unknown error!';
    if (error instanceof HttpErrorResponse) {
      errorMessage = ``;
    } else {
      errorMessage = `Unknown error: ${error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
