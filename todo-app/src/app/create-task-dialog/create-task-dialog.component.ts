import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../services/tasks.service';
import { SnackBarService } from '../services/snackbar.service';
import { Task } from '../tasks/tasks.component';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html'
})
export class CreateTaskDialogComponent {
  createTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task, isEditMode: boolean },
    private snack: SnackBarService
  ) {
    this.createTaskForm = this.fb.group({
      title: [''],
      description: [''],
      dueDate: [''],
      id:[0]
    });
    if (data?.isEditMode) {
      this.createTaskForm.patchValue(data.task); 
    }
  }

  onSubmit(): void {
    const newTask = this.createTaskForm.value;
    this.dialogRef.close(newTask);
    this.taskService.createTask(newTask).subscribe(() => {
      this.snack.openSnackBar('Task Created Successfully');
      this.dialogRef.close(); 
    });
  }

  update():void {
    const newTask = this.createTaskForm.value;
    this.dialogRef.close(newTask);
    this.taskService.updateTask(newTask.id,newTask).subscribe(() => {
      this.snack.openSnackBar('Task Updated Successfully');
      this.dialogRef.close(); 
    });
  }
}
