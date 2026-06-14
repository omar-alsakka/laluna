import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { categories } from '../../data/menu-data';
import { productName } from '../../data/translations';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly categories = categories;
  protected readonly menuOpen = signal(false);
  protected readonly cart = inject(CartService);
  protected readonly languageService = inject(LanguageService);
  protected readonly productName = productName;

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

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.closeMenu();
  }
}
