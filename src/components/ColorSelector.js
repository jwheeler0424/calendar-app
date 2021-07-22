import React, { useState } from 'react';
import { ExpandMore } from '../svg/Icons';
import '../styles/component/_colorPicker.scss';

const ColorSelector = (props) => {
    const [color, setColor] = useState({
        title: 'peacock',
        value: 'rgb(121, 185, 225)'
    });
    const [colorMenuOpen, setColorMenuOpen] = useState('');
    const toggleColorSelectMenu = () => {
        colorMenuOpen === ' open' ? setColorMenuOpen('') : setColorMenuOpen(' open');
    }
    const selectColor = (e) => {
        const title = e.target.attributes[0].value;
        const value = e.target.attributes[1].value;
        setColor({ title, value});
    }
    return (
        <div className="color-selector__wrapper">
            <div className="color-selector__selected" onClick={toggleColorSelectMenu}>
                <span className="color-selector__title" style={{background: color.value}}></span>
                <ExpandMore className="material-icons" />
            </div>
            <div className={'color-selector__selector' + colorMenuOpen}>
                <div className="color-selector__select">
                    {props.colors.map(({ title, value }) => (
                            <div
                                key={title}
                                onClick={selectColor}
                                style={{background: value}}
                                data-title={title}
                                data-value={value}
                            ></div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
};

export default ColorSelector;