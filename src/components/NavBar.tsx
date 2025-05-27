import { NavLink } from 'react-router'
import { useState } from 'react';
import { setTheme } from '../main';

export default function NavBar() {
    const [theme, setThemeState] = useState<'light' | 'dark'>('light');
    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        setThemeState(next);
    };

    return <div className="navbar">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/chatReact"}>GeminiChat</NavLink>
        {/* <NavLink to={"/chatSimple"}>ChatSimple</NavLink> */}
        {/* <NavLink to={"/generateReact"}>Generate React</NavLink> */}
        {/* <NavLink to={"/generateSimple"}>Generate Simple</NavLink> */}
        <NavLink to={"/generateImage"}>Generate Image</NavLink>
        <NavLink to={"/foodPairing"}>Food Pairing</NavLink>
        <div style={{ flex: 1 }} />
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
    </div>
}