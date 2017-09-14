import { Component } from '@angular/core';

@Component({
    selector: 'app-home-layout',
    template: `
    <app-header></app-header>
<div class="container body-content">
    <router-outlet></router-outlet>
</div>
  `,
    styles: []
})
export class HomeLayoutComponent { }
