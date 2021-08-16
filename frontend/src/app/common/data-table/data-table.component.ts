import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

export interface IDataTableColumn<T> {
  title: string;
  value: (model: T) => string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> implements OnInit {

  @Input() title: string = 'Data list';
  @Input() tableColumns: IDataTableColumn<T>[] = [];
  @Input() list$: Observable<T[]> | null = null;

  @Input() editAvailable = true;
  @Input() deleteAvailable = true;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  constructor() {}

  ngOnInit(): void {
  }

  get buttonsAvailable(): boolean {
    return this.editAvailable || this.deleteAvailable;
  }

  onEdit(entity: T): void {
    this.edit.emit(entity);
  }

  onDelete(entity: T): void {
    this.delete.emit(entity);
  }
}
