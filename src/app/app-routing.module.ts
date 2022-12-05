import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'home', 
    loadChildren:()=>import('./@public/pages/home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'login', 
    loadChildren:()=>import('./@public/pages/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'contact', 
    loadChildren:()=>import('./@public/pages/contact/contact.module').then(m=>m.ContactModule)
  },
  {
    path:'not-found', 
    loadChildren:()=>import('./@public/pages/not-found/not-found.module').then(m=>m.NotFoundModule)
  },
  {
    path: '', 
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: '**', 
    redirectTo:'not-found',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash:true, 
    scrollPositionRestoration:'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
