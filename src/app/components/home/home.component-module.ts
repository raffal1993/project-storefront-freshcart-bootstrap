import { NgModule } from '@angular/core';
import { StoresComponentModule } from '../stores/stores.component-module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [StoresComponentModule],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
