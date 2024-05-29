// src/app/models/usuario.model.ts
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// src/app/models/task.model.ts
export interface Task {
  id: number;
  descripcion: string;
  fecha: Date;
  usuario: Usuario;
}
