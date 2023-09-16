import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MenubarModule, InputTextModule, TagModule],
})
export class PrimengModule {}
