import { Routes } from '@angular/router';

import { CategoryPage } from './components/category-page/category-page';
import { Home } from './components/home/home';
import { ProductPage } from './components/product-page/product-page';

export const routes: Routes = [
  { path: '', component: Home, title: 'Laluna coffe' },
  { path: 'category/:slug', component: CategoryPage, title: 'Laluna coffe Menu' },
  { path: 'category/:categorySlug/product/:productId', component: ProductPage, title: 'Laluna coffe Product' },
  { path: '**', redirectTo: '' }
];
