import { Component, inject } from '@angular/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  protected readonly languageService = inject(LanguageService);

  protected readonly whatsappUrl = 'https://wa.me/963993448864';
  protected readonly facebookUrl = 'https://www.facebook.com/Lalunacoffee.Homs';
  protected readonly instagramUrl = 'https://www.instagram.com/lalunacoffee.homs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
  protected readonly mapsUrl = 'https://maps.app.goo.gl/pR1kycE6GdhMhSFv9';
}
