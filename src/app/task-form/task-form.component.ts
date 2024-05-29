import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  successMessage: string = '';
  task = {
    id: 0,
    usuarioID: 0,
    descripcion: '',
    fecha: '',
    usuario: {
      id: 0,
      nombre: '',
      email: ''
    }
  };

  constructor(private taskService: TaskService) { }

  createTask(): void {
    this.taskService.addTask(this.task).subscribe(
      () => {
        this.successMessage = 'Tarea creada exitosamente'; // Asigna el mensaje de éxito
        this.taskService.taskCreated.next(); // Notificar la creación de la tarea
      },
      error => console.error('Error al crear la tarea:', error)
    );
  }

}
