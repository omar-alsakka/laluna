import { computed, Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';
import { productName } from '../data/translations';
import { Language } from './language.service';

export interface CartItem {
  key: string;
  categorySlug: string;
  categoryName: string;
  product: Product;
  quantity: number;
}

const whatsappNumber = '963993448864';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);
  readonly totalItems = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly totalPrice = computed(() =>
    this.items().reduce((total, item) => total + this.priceValue(item.product.price) * item.quantity, 0)
  );

  addItem(categorySlug: string, categoryName: string, product: Product, quantity = 1): void {
    const safeQuantity = Math.max(1, Math.floor(quantity));
    const key = this.itemKey(categorySlug, product.id);

    this.items.update((items) => {
      const existingItem = items.find((item) => item.key === key);

      if (existingItem) {
        return items.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + safeQuantity } : item
        );
      }

      return [...items, { key, categorySlug, categoryName, product, quantity: safeQuantity }];
    });
  }

  increment(key: string): void {
    this.items.update((items) =>
      items.map((item) => (item.key === key ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  decrement(key: string): void {
    this.items.update((items) =>
      items
        .map((item) => (item.key === key ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  setQuantity(key: string, quantity: number): void {
    const safeQuantity = Math.floor(quantity);

    this.items.update((items) =>
      safeQuantity <= 0
        ? items.filter((item) => item.key !== key)
        : items.map((item) => (item.key === key ? { ...item, quantity: safeQuantity } : item))
    );
  }

  removeItem(key: string): void {
    this.items.update((items) => items.filter((item) => item.key !== key));
  }

  clear(): void {
    this.items.set([]);
  }

  checkoutUrl(language: Language): string {
    const message = this.checkoutMessage(language);
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  lineTotal(item: CartItem): number {
    return this.priceValue(item.product.price) * item.quantity;
  }

  formatPrice(value: number): string {
    return `${value.toLocaleString('en-US')} ل.س`;
  }

  private checkoutMessage(language: Language): string {
    if (!this.items().length) {
      return language === 'ar' ? 'مرحبا، أريد الطلب من لالونا.' : 'Hello, I would like to order from La Luna.';
    }

    const orderLines = this.items().map((item, index) => {
      const name = productName(item.product, item.categorySlug, language);
      const lineTotal = this.formatPrice(this.lineTotal(item));
      return `${index + 1}. ${name} - ${language === 'ar' ? 'الكمية' : 'Qty'}: ${item.quantity} - ${lineTotal}`;
    });

    if (language === 'ar') {
      return ['مرحبا، أريد الطلب من لالونا:', ...orderLines, `المجموع: ${this.formatPrice(this.totalPrice())}`].join('\n');
    }

    return ['Hello, I would like to order from La Luna:', ...orderLines, `Total: ${this.formatPrice(this.totalPrice())}`].join('\n');
  }

  private itemKey(categorySlug: string, productId: number): string {
    return `${categorySlug}-${productId}`;
  }

  private priceValue(price: string): number {
    return Number(price.replace(/[^0-9]/g, '')) || 0;
  }
}
