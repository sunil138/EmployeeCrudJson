import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './models/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeCrudJson';
  //for getting the data
  employeeList:any=[];
  //updating any data 
  updateData:any;
  //for adding a data with help of employee model
  emp1:Employee=
 {
    id:0,
    employeename:'',
    address:'',
    phone:0,
    country:'' 
 }
 //for getting current data
 currentData:Employee=
 {
    id:0,
    employeename:'',
    address:'',
    phone:0,
    country:'' 
 }

 //subscribe is for data asynchrounously across our application 
 //logic for get  employees
 GetEmployees()
 {
  this.services.getPosts().subscribe(response=>{
    this.employeeList=response;
    console.log(response); 
  },(error)=>{}
  ); 
 } 

 //Logic For Adding A Employee
 AddEmployee()
 {
  this.services.addPosts(this.emp1).subscribe(response=>{
    this.GetEmployees(); 
    console.log(response); 
  },(error)=>{}
  );
 }

 //logic for updating a employee
 UpdateEmployee()
 {
  this.services.updatePosts( this.currentData).subscribe(response=>{
    this.GetEmployees(); 
    console.log(response); 
  },(error)=>{}
  );
 }

 //logic for deleting a employee with respect to id
 DeleteEmployee(id:any)
 {
  this.services.deletePosts(id).subscribe(response=>{
    this.GetEmployees();
    console.log(response); 
  },(error)=>{}
  );
 }

 //logic for getting the data with respect to id
 getdata(data:Employee)
 {
  return this.services.getEmpById(data.id).subscribe(response=>{
    this.updateData=response;
    this.currentData=this.updateData;  
    console.log(response); 
  })
 }
  constructor(public services:EmployeeService){}
  //It is for Initialization purpose. when code runs, it runs automatically
  ngOnInit()
  {
    this.GetEmployees(); 
  }
}
