import { Component, OnInit } from '@angular/core';
import { GatekeeperService } from '../services/gatekeep.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css'],
  standalone: false
})
export class RolePermissionComponent implements OnInit {
  roles: any;
  roleForm!: FormGroup;
  permissions: any;
  selectedPermissions = new Set<string>();

  constructor(public gateSrv: GatekeeperService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.fetchRoles();
    this.fetchPermission();
    this.roleForm = this.fb.group({
      roleId: [{ value: '', disabled: false }, Validators.required],
    });

    this.roleForm.get('roleId')?.valueChanges.subscribe(roleId => {
      if (roleId) {
        this.fetchRolePermissions(roleId);
      } else {
        this.selectedPermissions.clear();
      }
    });
  }

   goBack(){
    this.router.navigate(['/admin-homepage']);
  }

fetchRolePermissions(roleId: string) {
  this.gateSrv.getRolePermission(roleId).subscribe({
    next: (res: any) => {
      const perms: string[] = res?.permissions || [];
      this.selectedPermissions = new Set<string>(perms);
    },
    error: (err) => {
      console.error('Error fetching role permissions:', err);
      this.selectedPermissions.clear();
    }
  });
}

  fetchRoles() {
    this.gateSrv.getRole().subscribe({
      next: (items) => this.roles = items,
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  fetchPermission(){
    this.gateSrv.getPermission().subscribe({
      next: (items) => {this.permissions = items;console.log(this.permissions?.data)},
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  togglePermission(permissionName:any){
    if (this.selectedPermissions.has(permissionName)) {
      this.selectedPermissions.delete(permissionName);
    } else {
      this.selectedPermissions.add(permissionName);
    }

  }

  submit() {
     const permissionsObj: any = {};
    this.permissions?.data?.forEach((perm:any) => {
      permissionsObj[perm.PERMISSIONNAME] = this.selectedPermissions.has(perm.PERMISSIONNAME);
    });

    const payload = {
      ROLEID: this.roleForm.get('roleId')?.value,
      permissions: permissionsObj,
    };

    this.gateSrv.submitRolePermissions(payload).subscribe({
      next: () => {
        alert('Permissions submitted successfully!');
        this.selectedPermissions.clear();
        this.roleForm.reset();
      },
      error: (err) => console.error('Error submitting permissions:', err),
    });
  }

}
