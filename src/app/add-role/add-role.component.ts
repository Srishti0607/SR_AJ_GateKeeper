import { Component, OnInit } from '@angular/core';
import { GatekeeperService } from '../services/gatekeep.service';
export interface Role {
  _id: string;
  roleName: string;
}

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css',
  standalone: false
})


export class AddRoleComponent implements OnInit{

  roles: any = [];
  newRoleName: string = '';
  userInfo:any;
  editRoleId: any = "";
  editRoleName: string = '';

  constructor(
    private gateSrv: GatekeeperService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.gateSrv.userInfo;
    this.fetchRoles();
  }

  fetchRoles() {
    this.gateSrv.getRole().subscribe({
      next: (items) => this.roles = items,
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  handleAddRole() {
    if (this.newRoleName.trim() === '') return;

    const payload = {
      roleName: this.newRoleName.trim(),
      email: this.userInfo?.EMAIL
    };

    this.gateSrv.addRole(payload).subscribe({
      next: (response:any) => {
        if (response.status.toLowerCase() === 'success') {
          this.fetchRoles();
          this.newRoleName = '';
          alert(response.message);
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert('An error occurred while adding role');
        console.error('Add role error:', error);
      }
    });
  }

  handleDeleteRole(id: string) {
    // if (!confirm('Are you sure you want to delete this role?')) return;

    // this.rolesService.deleteRole(id, { email: this.userEmail }, this.token).subscribe({
    //   next: (response) => {
    //     if (response.status === 'Success') {
    //       this.roles = this.roles.filter(role => role._id !== id);
    //       alert(response.message);
    //     } else {
    //       alert(response.message);
    //     }
    //   },
    //   error: (error) => {
    //     alert('An error occurred while deleting role');
    //     console.error('Delete role error:', error);
    //   }
    // });
  }

  handleEditStart(id: string, currentName: string) {
    this.editRoleId = id;
    this.editRoleName = currentName;
  }

  handleEditSave(id: string) {
    const payload = { roleName: this.editRoleName, email: this.userInfo?.EMAIL };

    this.gateSrv.updateRole(id, payload).subscribe({
      next: (response:any) => {
        if (response.status.toLowerCase() === 'success') {
          this.roles = this.roles.map((role:any) =>
            role._id === id ? { ...role, roleName: this.editRoleName } : role
          );
          alert('Role updated successfully');
          this.editRoleId = null;
          this.editRoleName = '';
          this.fetchRoles();
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert('An error occurred while updating role');
        console.error('Update role error:', error);
      }
    });
  }

  handleEditCancel() {
    // this.editRoleId = null;
    // this.editRoleName = '';
  }
}
