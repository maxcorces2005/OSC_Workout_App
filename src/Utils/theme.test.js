import { THEMES, getSavedTheme, applyTheme } from './theme';

beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
});

test('defaults to dark when nothing is saved', () => {
    expect(getSavedTheme()).toBe('dark');
});

test('offers dark, light, and colorblind themes', () => {
    expect(THEMES.map((theme) => theme.value)).toEqual(['dark', 'light', 'colorblind']);
});

test('applying a theme sets it on the page and saves it', () => {
    applyTheme('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(getSavedTheme()).toBe('light');
});

test('the last applied theme is the one that is saved', () => {
    applyTheme('light');
    applyTheme('colorblind');
    expect(getSavedTheme()).toBe('colorblind');
});

test('an unknown theme name is ignored', () => {
    applyTheme('light');
    applyTheme('purple');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(getSavedTheme()).toBe('light');
});

test('a bad saved value falls back to dark', () => {
    localStorage.setItem('osc-theme', 'purple');
    expect(getSavedTheme()).toBe('dark');
});
