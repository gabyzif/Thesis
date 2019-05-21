import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { VisualizationComponent } from './visualization/visualization.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'project',
  component: ProjectComponent
},
{
  path: 'visualization',
  component: VisualizationComponent
},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',

  })],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }

