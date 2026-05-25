import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { getCategoryBySlug, getProductByCategoryAndId } from '../../data/menu-data';
import { ingredients, productName } from '../../data/translations';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-page',
  imports: [RouterLink],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {
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
  private readonly params = toSignal(
    this.route.paramMap.pipe(
      map((paramMap) => ({
        categorySlug: paramMap.get('categorySlug') ?? '',
        productId: Number(paramMap.get('productId') ?? 0)
      }))
    ),
    { initialValue: { categorySlug: '', productId: 0 } }
  );

  protected readonly category = computed(() => getCategoryBySlug(this.params().categorySlug));
  protected readonly product = computed(() =>
    getProductByCategoryAndId(this.params().categorySlug, this.params().productId)
  );
}
