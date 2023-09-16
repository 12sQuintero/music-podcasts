import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MenubarModule,
    InputTextModule,
    TagModule,
    DividerModule,
    TableModule,
    ProgressSpinnerModule,
  ],
})
export class PrimengModule {}
