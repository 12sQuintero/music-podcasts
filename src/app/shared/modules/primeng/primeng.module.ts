import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MenubarModule,
    InputTextModule,
    TagModule,
    DividerModule,
    TableModule,
  ],
})
export class PrimengModule {}
