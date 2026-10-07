// lets the user pick the app's color theme; styles are in Pages/Home.css
import { useState } from 'react';
import { THEMES, getActiveTheme, applyTheme } from '../Utils/theme';

function ThemeSelector() {
    const [theme, setTheme] = useState(getActiveTheme);

    function handleChange(event) {
        applyTheme(event.target.value);
        setTheme(event.target.value);
    }

    // radio buttons give arrow-key navigation and screen reader labels for free
    return (
        <fieldset className="theme-selector">
            <legend className="theme-selector-legend">Theme</legend>
            {THEMES.map(({ value, label }) => (
                <label key={value} className="theme-option">
                    <input
                        type="radio"
                        name="theme"
                        value={value}
                        checked={theme === value}
                        onChange={handleChange}
                    />
                    <span>{label}</span>
                </label>
            ))}
        </fieldset>
    );
}

export default ThemeSelector;
