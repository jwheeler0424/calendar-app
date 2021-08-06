import React, { useEffect, useState } from 'react';
import { ExpandMore } from '../svg/Icons';
import colors from '../tests/fixtures/colors';

const ColorPicker = (props) => {
    const [color, setColor] = useState(
        props.color ? colors.filter((color) => color.title === props.color)[0] : {
        title: 'peacock',
        value: 'rgb(121, 185, 225)'
    });
    useEffect(() => {
        setColor(colors.filter((color) => color.title === props.color)[0]);
    }, [props.color])

    const [colorMenuOpen, setColorMenuOpen] = useState('');
    const toggleColorSelectMenu = (e) => {
        colorMenuOpen === ' open' ? setColorMenuOpen('') : setColorMenuOpen(' open');
    }
    const selectColor = (e) => {
        console.log(e.target.attributes)
        const title = e.target.attributes[1].value;
        const value = e.target.attributes[2].value;
        setColor({ title, value });
        props.onColorChange(title);
        setColorMenuOpen('');
    }
    
    return (
        <div className="color-selector__wrapper">
            <div className="color-selector__selected" onClick={toggleColorSelectMenu} title="Select Event Color">
                <span className="color-selector__title" style={{background: color.value}}></span>
                <ExpandMore className="material-icons" />
            </div>
            <div className={'color-selector__selector' + colorMenuOpen}>
                <div className="color-selector__select">
                    {colors.map(({ title, value }) => (
                            <div
                                key={title}
                                onClick={selectColor}
                                className={color.title === title ? 'selected' : ''}
                                style={{background: value}}
                                data-title={title}
                                data-value={value}
                                title={title.charAt(0).toUpperCase() + title.slice(1)}
                            ></div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
};

export default ColorPicker;