import { effect, Injectable, signal } from '@angular/core';

export interface Theme {
  id: string;
  primary: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themes: Theme[] = [
    {
      id: 'deep-blue-dark',
      primary: '#1976D2',
      displayName: 'Deep Blue Dark',
    },
    { id: 'green', primary: '#00796B', displayName: 'Green' },
    { id: 'orange', primary: '#E65100', displayName: 'Orange' },
    { id: 'purple', primary: '#6200EE', displayName: 'Purple' },
    { id: 'red', primary: '#C2185B', displayName: 'Red' },
  ];

  currentTheme = signal<Theme>(this.themes[0]);

  getThemes(): Theme[] {
    return this.themes;
  }

  setTheme(themeId: string): void {
    const theme = this.themes.find((t) => t.id === themeId);
    if (theme) {
      this.currentTheme.set(theme);
    }
  }

  updateThemeClass = effect(() => {
    const theme = this.currentTheme();
    document.body.classList.remove(...this.themes.map((t) => `${t.id}-theme`));
    document.body.classList.add(`${theme.id}-theme`);
  });
}
