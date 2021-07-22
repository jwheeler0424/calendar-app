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
        props.onColorChange(title);
    }
    const colors = [{ 
        title: 'banana',
        value: 'rgb(245, 192, 58)' 
    }, {
        title: 'basil',
        value: 'rgb(17, 129, 71)'
    }, {
        title: 'blueberry',
        value: 'rgb(66, 78, 178)'
    }, {
        title: 'flamingo',
        value: 'rgb(228, 124, 116)'
    }, {
        title: 'grape',
        value: 'rgb(142, 26, 167)'
    }, {
        title: 'graphite',
        value: 'rgb(97, 97, 97)'
    }, {
        title: 'lavendar',
        value: 'rgb(122, 132, 201)'
    }, {
        title: 'peacock',
        value: 'rgb(121, 185, 225)'
    }, {
        title: 'sage',
        value: 'rgb(55, 183, 124)'
    }, {
        title: 'tangerine',
        value: 'rgb(242, 81, 37)'
    }, {
        title: 'tomato',
        value: 'rgb(211, 0, 6)'
    }];
    return (
        <div className="color-selector__wrapper">
            <div className="color-selector__selected" onClick={toggleColorSelectMenu}>
                <span className="color-selector__title" style={{background: color.value}}></span>
                <ExpandMore className="material-icons" />
            </div>
            <div className={'color-selector__selector' + colorMenuOpen}>
                <div className="color-selector__select">
                    {colors.map(({ title, value }) => (
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