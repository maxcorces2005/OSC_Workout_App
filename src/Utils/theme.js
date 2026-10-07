// color theme for the whole app, saved in localStorage so it survives a reload

const THEME_KEY = 'osc-theme';
const DEFAULT_THEME = 'dark';

// value is stored and put on <html data-theme="...">, label is shown to the user
export const THEMES = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'colorblind', label: 'Colorblind' }
];

function isTheme(value) {
    return THEMES.some((theme) => theme.value === value);
}

// saved theme, or the default if nothing valid was saved
export function getSavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    return isTheme(saved) ? saved : DEFAULT_THEME;
}

// switches every page to the theme and remembers it; unknown names are ignored
export function applyTheme(value) {
    if (!isTheme(value)) {
        return;
    }
    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem(THEME_KEY, value);
}
