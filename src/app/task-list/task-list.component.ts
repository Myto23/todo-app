import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { formatDate } from '@angular/common'; // Importa la función formatDate
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  editedTask: any = null;
  private taskCreatedSubscription: Subscription;


  constructor(private taskService: TaskService) {
    this.taskCreatedSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.getTasks();
    this.taskService.taskUpdated.subscribe(() => {
      this.getTasks();
    });
    this.taskCreatedSubscription = this.taskService.taskCreated.subscribe(() => {
      this.getTasks();
    });
  }

  ngOnDestroy(): void {
    this.taskCreatedSubscription.unsubscribe();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks,
      error => console.error('')
    );
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => this.getTasks(),
      error => console.error('Error al eliminar la tarea:', error)
    );
  }

  formatDate(date: string): string {
    return formatDate(date, 'dd-MM-yyyy', 'en-US');
  }

  editTask(task: any): void {
    this.editedTask = { ...task };
  }

  cancelEdit(): void {
    this.editedTask = null;
  }

  taskUpdated(task: any): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
    this.cancelEdit();
  }
}
