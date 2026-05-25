import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { categories, featuredProducts } from '../../data/menu-data';
import { productName } from '../../data/translations';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  protected readonly categories = categories;
  protected readonly featuredProducts = featuredProducts;
  protected readonly productName = productName;
  protected readonly languageService = inject(LanguageService);

  protected readonly categoryNames: Record<string, string> = {
    'hot-drinks': 'Hot Drinks',
    'cold-drinks': 'Cold Drinks',
    'iced-coffee': 'Iced Coffee',
    juices: 'Fresh Juices',
    milkshake: 'Milkshake',
    cocktails: 'Cocktails',
    crepes: 'Crepes & Waffles',
    'fruit-salads': 'Fruit Salads',
    desserts: 'Desserts'
  };
}
