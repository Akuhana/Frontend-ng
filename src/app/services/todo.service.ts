import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly url = 'http://localhost:5333/api/todoitems';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.url);
  }

  create(name: string): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.url, {
      name,
      isComplete: false,
      priority: 0
    });
  }

  update(item: TodoItem): Observable<void> {
    return this.http.put<void>(`${this.url}/${item.id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
