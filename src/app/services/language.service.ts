import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Language = 'ar' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  readonly language = signal<Language>('ar');

  constructor() {
    effect(() => {
      const language = this.language();
      this.document.documentElement.lang = language;
      this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    });
  }

  toggleLanguage(): void {
    this.language.update((language) => (language === 'ar' ? 'en' : 'ar'));
  }

  isArabic(): boolean {
    return this.language() === 'ar';
  }
}
