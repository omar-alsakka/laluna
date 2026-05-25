import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { getCategoryBySlug } from '../../data/menu-data';
import { ingredients, productName } from '../../data/translations';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-category-page',
  imports: [RouterLink],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss'
})
export class CategoryPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly languageService = inject(LanguageService);
  protected readonly productName = productName;
  protected readonly ingredients = ingredients;
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
  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
    initialValue: ''
  });

  protected readonly category = computed(() => getCategoryBySlug(this.slug()));
}
