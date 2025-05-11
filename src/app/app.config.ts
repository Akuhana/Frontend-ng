import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';


const MyPreset = definePreset(Aura, {
  semantic: {
    // override the font-family for body/text
    font: {
      family: "'Inter', sans-serif"
    }
  }
});

providePrimeNG({
  theme: {
    preset: MyPreset
  }
});


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: MyPreset
            }
        }),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
};
