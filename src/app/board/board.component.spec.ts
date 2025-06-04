import { BoardComponent } from './board.component';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { of } from 'rxjs';
import { fakeAsync, flush } from '@angular/core/testing';
import { TodoItem } from '../models/todo-item';

describe('BoardComponent', () => {
  let router: jasmine.SpyObj<Router>;
  let service: jasmine.SpyObj<TodoService>;
  let component: BoardComponent;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    service = jasmine.createSpyObj('TodoService', ['getAll', 'create', 'update', 'delete']);
    component = new BoardComponent(router, service);
  });

  it('adds a new todo item and clears input', () => {
    const todo: TodoItem = { id: 1, name: 'Test', isComplete: false, priority: 0 };
    service.create.and.returnValue(of(todo));
    component.newItem = 'Test';

    component.addItem();

    expect(service.create).toHaveBeenCalledWith('Test');
    expect(component.backlogItems).toContain(todo);
    expect(component.newItem).toBe('');
  });

  it('does not create when newItem is empty', () => {
    component.newItem = '  ';
    component.addItem();
    expect(service.create).not.toHaveBeenCalled();
  });

  it('deletes a task from backlog', fakeAsync(() => {
    const todo: TodoItem = { id: 2, name: 'Task', isComplete: false, priority: 0 };
    component.backlogItems = [todo];
    service.delete.and.returnValue(of(undefined));

    component.deleteTask(todo, null);
    flush();

    expect(service.delete).toHaveBeenCalledWith(2);
    expect(component.backlogItems).not.toContain(todo);
  }));

  it('logout clears storage and navigates to login', () => {
    localStorage.setItem('jwt', 'token');
    localStorage.setItem('jwt_exp', 'exp');

    component.logout();

    expect(localStorage.getItem('jwt')).toBeNull();
    expect(localStorage.getItem('jwt_exp')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
