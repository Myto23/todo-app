import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId: number = 0;
  task: Task | undefined;
  errorMessage: string = '';
  successMessage: string = '';


  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.taskId = +id;
        this.searchTask();
      } else {
      }
    });
  }

  searchTask(): void {
    this.taskService.getTask(this.taskId).subscribe(
      (task: Task) => {
        this.task = task;
        this.errorMessage = '';
      },
      (error: any) => {
        this.task = undefined;
        this.errorMessage = 'La tarea con el ID especificado no existe.';
      }
    );
  }

  updateTask(): void {
    if (this.task) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(
        () => {
          this.taskService.taskUpdated.emit(); // Emitir el evento taskUpdated después de una actualización exitosa
          this.successMessage = 'Tarea actualizada exitosamente.';
          this.router.navigate(['/task-list']);
        },
        (error: any) => {
          this.errorMessage = error;
        }
      );
    } else {
      console.error('La tarea no está definida.');
    }
  }



}
