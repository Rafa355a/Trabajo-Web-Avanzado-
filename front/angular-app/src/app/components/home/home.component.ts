import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  empleados: any[] = [];
  showAddForm = false;
  showEditForm = false;
  selectedEmpleado: any = null;

  newEmpleado = {
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    correo: '',
    sueldo: 0,
    cargo: ''
  };

  constructor(
    private empleadoService: EmpleadoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  // Obtener empleados
  getEmpleados(): void {
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString).token : null;

    if (!token) {
      console.error('No se encontró un token válido en el localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.empleadoService.getEmpleados(headers).subscribe({
      next: (data) => {
        this.empleados = data;
        console.log('Empleados cargados:', data);
      },
      error: (error) => {
        console.error('Error al obtener empleados', error);
      },
    });
  }



  // Agregar empleado
  addEmpleado(): void {
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString).token : null;

    if (!token) {
      console.error('No se encontró un token válido en el localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.empleadoService.createEmpleado(this.newEmpleado, headers).subscribe({
      next: () => {
        console.log('Empleado agregado con éxito');
        this.getEmpleados();
        this.toggleAddForm(); // Ocultar el formulario después de agregar
      },
      error: (error) => {
        console.error('Error al agregar empleado', error);
      },
    });
  }

  // Mostrar formulario de agregar
toggleAddForm(): void {
  this.showAddForm = !this.showAddForm;
  if (this.showAddForm) {
    // Limpiar los datos del nuevo empleado al abrir el formulario
    this.newEmpleado = {
      nombres: '',
      apellidos: '',
      dni: '',
      telefono: '',
      correo: '',
      sueldo: 0,
      cargo: ''
    };
  }
}

// Mostrar formulario de editar
toggleEditForm(empleado: any): void {
  this.showEditForm = true;
  this.selectedEmpleado = { ...empleado }; // Asegura que el objeto esté copiado correctamente
}

// Cerrar formulario de editar
closeEditForm(): void {
  this.showEditForm = false;
  this.selectedEmpleado = null; // Limpiar la selección del empleado
}


  // Editar empleado
  editEmpleado(): void {
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString).token : null;

    if (!token) {
      console.error('No se encontró un token válido en el localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.empleadoService.updateEmpleado(this.selectedEmpleado.id, this.selectedEmpleado, headers).subscribe({
      next: () => {
        console.log('Empleado actualizado con éxito');
        this.getEmpleados();
        this.showEditForm = false; // Ocultar el formulario después de editar
      },
      error: (error) => {
        console.error('Error al actualizar empleado', error);
      },
    });
  }

  // Eliminar empleado
  deleteEmpleado(id: number): void {
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString).token : null;

    if (!token) {
      console.error('No se encontró un token válido en el localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.empleadoService.deleteEmpleado(id, headers).subscribe({
      next: () => {
        console.log('Empleado eliminado con éxito');
        this.getEmpleados();
      },
      error: (error) => {
        console.error('Error al eliminar empleado', error);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
