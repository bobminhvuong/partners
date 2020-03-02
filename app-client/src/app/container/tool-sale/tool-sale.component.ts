import { ToolSalesService } from './../../service/toolSales/tool-sales.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tool-sale',
  templateUrl: './tool-sale.component.html',
  styleUrls: ['./tool-sale.component.scss']
})
export class ToolSaleComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private toolSalesSV: ToolSalesService,
    private fb: FormBuilder,
    private message: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['@patacademy.com.vn', [Validators.required, Validators.email]],
      name_card: [null, [Validators.required]],
      landing_page: ['Patacademy.com.vn/', [Validators.required]],
      note: ['']
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.toolSalesSV.requestCreateSales(this.validateForm.value).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', 'Đăng kí tạo công cụ sales thành công!');
        } else {
          this.message.create('error', r && r.message ? r.message : 'Có lổi xẩy ra. Vui lòng thử lại sau!');
        }
      })
    }
  }
}
