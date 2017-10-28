import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: 'book/:id', component: BookDetailComponent },
    { path: '', component: BookListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
