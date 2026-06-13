import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { productName } from '../../data/translations';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {
  protected readonly cart = inject(CartService);
  protected readonly languageService = inject(LanguageService);
  protected readonly productName = productName;
  protected readonly checkoutUrl = computed(() => this.cart.checkoutUrl(this.languageService.language()));
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

  protected updateQuantity(key: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cart.setQuantity(key, Number(input.value));
  }
}
