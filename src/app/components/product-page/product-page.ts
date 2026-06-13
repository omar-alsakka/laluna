import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { getCategoryBySlug, getProductByCategoryAndId } from '../../data/menu-data';
import { ingredients, productName } from '../../data/translations';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-page',
  imports: [RouterLink],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly cart = inject(CartService);
  protected readonly languageService = inject(LanguageService);
  protected readonly productName = productName;
  protected readonly ingredients = ingredients;
  protected readonly quantity = signal(1);
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

  protected incrementQuantity(): void {
    this.quantity.update((quantity) => quantity + 1);
  }

  protected decrementQuantity(): void {
    this.quantity.update((quantity) => Math.max(1, quantity - 1));
  }

  protected updateQuantity(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.quantity.set(Math.max(1, Math.floor(Number(input.value) || 1)));
  }

  protected addToCart(): void {
    const selectedProduct = this.product();
    const selectedCategory = this.category();

    if (!selectedProduct || !selectedCategory) {
      return;
    }

    this.cart.addItem(selectedCategory.slug, selectedCategory.name, selectedProduct, this.quantity());
  }
}
