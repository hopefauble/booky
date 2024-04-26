import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';

const routes: Routes = [
    { path: '', component: BookSearchComponent},
  // { path: 'register', component: RegistrationComponent },
  // { path: 'stats', component: StatsComponent },
  // { path: 'checkin', component:  CheckinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}