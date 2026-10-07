import { THEMES, getSavedTheme, getActiveTheme, applyTheme } from './theme';

beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
});

afterEach(() => {
    jest.restoreAllMocks();
});

// makes localStorage throw, like a browser with storage blocked
function blockStorage(method) {
    jest.spyOn(Storage.prototype, method).mockImplementation(() => {
        throw new Error('Storage unavailable');
    });
}

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

test('defaults to dark when reading storage fails', () => {
    blockStorage('getItem');
    expect(getSavedTheme()).toBe('dark');
});

test('applies the theme even when saving fails', () => {
    blockStorage('setItem');
    expect(() => applyTheme('light')).not.toThrow();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
});

test('the active theme is the one on the page, even if it was not saved', () => {
    blockStorage('setItem');
    applyTheme('colorblind');
    expect(getActiveTheme()).toBe('colorblind');
});

test('the active theme falls back to the saved theme', () => {
    localStorage.setItem('osc-theme', 'light');
    expect(getActiveTheme()).toBe('light');
});
