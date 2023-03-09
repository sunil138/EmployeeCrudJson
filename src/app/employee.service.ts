import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from './models/Employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //This is the baseurl that i contain my data in form of json
  baseUrl=" http://localhost:3000/Employee";
  //headers for application of data in json format 
  headers=new HttpHeaders().set('Content-Type','application/json') 

  constructor(public http:HttpClient) { }

  //for getting all the employees 
  //Observable - used for asynchronous messages, error handling and passing messages in the appliaction from services to component with help of subscribe
  getPosts():Observable<any> 
  {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError(this.handleError));  
  }
  //get employye by id 
  getEmpById(id:any):Observable<any>
  {
    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError(this.handleError));    
  } 
  //Adding a new Employee
  addPosts(data:any):Observable<any>
  {
    return this.http.post<any>(this.baseUrl,data).pipe(
      catchError(this.handleError));    
  }
  //Updating a Employee
  updatePosts(data:Employee):Observable<any>
  {
    return this.http.put<any>(this.baseUrl+'/'+data.id,data,{headers:this.headers}) .pipe(
      catchError(this.handleError));    
  }
  //Deleting a employee by id
  deletePosts(id:any):Observable<any>
  {
    return this.http.delete<any>(this.baseUrl+'/'+id).pipe(
      catchError(this.handleError));      
  }
  //This is for exception handling
  handleError(error:HttpErrorResponse)
  {
    if(error.error instanceof ErrorEvent)
    {
      //Client-side error happened
      console.error('An error occurred:', error.error.message);
    }
    else 
    {
      //Server-Side Error Happened 
      console.error(
        `Backend returned code ${error.status}, `+
        `body was : ${error.error}`);
    }
    return throwError(`Something bad happened; please try again later.`); 
  };  
}
