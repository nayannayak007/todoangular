import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../services/tasks.service';
import { ConfirmationDialogService } from '../services/confirm-dialog.service';
import { SnackBarService } from '../services/snackbar.service';

export interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  userId: string;
  id: number;
  statusStr:string;
}

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  constructor(private dialog: MatDialog, private _tasks: TasksService, private confirmationDialogService: ConfirmationDialogService, private snack: SnackBarService){}
  tasks: Task[] = [];

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this._tasks.getTasks().subscribe((data:any) => {
      this.tasks = data;
    })
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: { task, isEditMode: true },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
     setTimeout(() => {
      this.getTasks();
     }, 1000); 
    });
  }


  deleteTask(task: Task) : void {
    const message = 'Are you sure you want to delete this task?';
    this.confirmationDialogService.openDialog(message).subscribe((result) => {
      if (result) {
        this._tasks.deleteTask(task.id).subscribe((data:any) =>{
          this.snack.openSnackBar('Task Deleted Successfully');
          this.getTasks();
        });
      }
    });
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {  isEditMode: false },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getTasks();
       }, 1000); 
    });
  }

}
