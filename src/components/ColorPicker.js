import React, { useEffect, useState } from 'react';
import { ExpandMore } from '../svg/Icons';
import colorList from '../colors/colorList';
import '../styles/component/_colorPicker.scss';

const ColorPicker = (props) => {
    const [color, setColor] = useState(
        props.color ? colorList.filter((color) => color.title === props.color)[0] : {
        title: 'peacock',
        value: 'rgb(121, 185, 225)'
    });
    useEffect(() => {
        setColor(colorList.filter((color) => color.title === props.color)[0]);
    }, [props.color])

    const [colorMenuOpen, setColorMenuOpen] = useState('');
    const toggleColorSelectMenu = () => {
        colorMenuOpen === ' open' ? setColorMenuOpen('') : setColorMenuOpen(' open');
    }
    const selectColor = (e) => {
        const title = e.target.attributes[0].value;
        const value = e.target.attributes[1].value;
        setColor({ title, value });
        props.onColorChange(title);
    }
    
    return (
        <div className="color-picker__wrapper">
            <div className="color-picker__selected" onClick={toggleColorSelectMenu} title="Select Event Color">
                <span className="color-picker__title" style={{background: color.value}}></span>
                <ExpandMore className="material-icons" />
            </div>
            <div className={'color-picker__selector' + colorMenuOpen}>
                <div className="color-picker__select">
                    {colorList.map(({ title, value }) => (
                            <div
                                key={title}
                                onClick={selectColor}
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