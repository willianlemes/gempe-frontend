import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalButtonOptions } from 'ng-zorro-antd/modal';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  usersFiltered: User[] = [];
  filter = new FormControl('');
  isVisible = false;
  isOkLoading = false;
  titleModal = '';
  titleButton = '';
  userForm: FormGroup;

  constructor(private usersService: UsersService) {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/),
      ]),
    });
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      this.usersFiltered = [...this.users];
    });

    this.filter.valueChanges.subscribe((value: string) => {
      if (value) {
        this.usersFiltered = this.users.filter((user) => {
          const re = new RegExp(value, 'gi');
          return re.test(user.name);
        });
      } else {
        this.usersFiltered = [...this.users];
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  newUser(): void {
    this.userForm.reset();
    this.titleModal = 'Novo contato';
    this.titleButton = 'Criar';
    this.isVisible = true;
  }

  editUser({ name, email, phone }: User): void {
    this.userForm.setValue({
      name,
      email,
      phone,
    });

    this.titleModal = 'Editar contato';
    this.titleButton = 'Salvar';
    this.isVisible = true;
  }

  handleSubmit() {
    this.isVisible = false;
  }
}
