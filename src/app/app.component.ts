import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import data from '../assets/data';

interface User {
  _id: string;
  isActive: boolean;
  balance?: string;
  picture: string;
  age: number;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  address: string;
  tags: string[];
  favoriteFruit: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  initialDisplayedColumns: string[] = ['id', 'name', 'age', 'company', 'email', 'balance'];
  columnDefinitions = [
    { def: 'id', header: 'ID', visible: true },
    { def: 'name', header: 'Name', visible: true },
    { def: 'age', header: 'Age', visible: true },
    { def: 'company', header: 'Company', visible: true },
    { def: 'email', header: 'Email', visible: true },
    { def: 'balance', header: 'Balance', visible: true }
  ];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.data = data as User[];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, Math.random() * 2000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get displayedColumns() {
    return this.columnDefinitions.filter(cd => cd.visible).map(cd => cd.def);
  }
}
