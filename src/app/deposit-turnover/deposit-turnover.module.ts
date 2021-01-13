import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositTurnoverComponent } from './deposit-turnover/deposit-turnover.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DepositTurnoverComponent
  }
]

@NgModule({
  declarations: [DepositTurnoverComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DepositTurnoverModule { }
