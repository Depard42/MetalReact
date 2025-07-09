import React from "react";

import PipeCalculator from './Calculators/PipeCalculator';
import BalkCalculator from './Calculators/BalkCalculator';
import SheetCalculator from './Calculators/SheetCalculator';

import pipe_img from '../../img/pipe.png'
import list_img from '../../img/sheet.png'
import balk_img from '../../img/balk.png'

import PopUpMenu from "../PopUpMenu";

import metals from "./Calculators/properties/MetalProperty";

const images = {
    pipe: pipe_img, 
    list: list_img, 
    balk: balk_img, 
  }

const default_values_main = {
    calculator_option: 0,
    
    // Input option 0
    length_InputValue: 0,
    length_InputOption: 1,
    // Input option 1
    massa_InputValue: 0,
    massa_InputOption: 1,

    quontity_InputValue: 1,

    isNDS: false,
    price: 0,

    // Output 1
    massa: 0,
    massaOne: 0,
    mass_InputValue: 0,
    mass_InputOption: 1,

    massaScaled: 0,
    massaOneScaled: 0,
    massaOutputScale: 1,
    massaOneOutputScale: 1,

    // Output 2
    l_OutputScale: 1,
    l_average_OutputScale: 1,
    l_average_Scaled: 0,
    l_Scaled: 0,
    l: 0,
    l_average: 0,

    price_InputValue: 0,
    price_InputOption: 1,
    density_option: metals[0],
    density: metals[0].value,
    material: metals[0].label,
    note: "",
    images: [],
    needsHiddenMenu: true
}


class CalculatorList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            item: null,
        }
        this.items = [
            {
              image_url: images.pipe, 
              text: "Труба",
              calculator: PipeCalculator,
              default_values: {
                ...default_values_main,
                name: "Труба",
                display_name: "Труба",
                // Input
                D_Input: 0,
                D_Scale: 1,
                T_Input: 0,
                T_Option: 1
              }
            },
            {
              image_url: images.balk, 
              text: "Балка",
              calculator: BalkCalculator,
              variants: [
                {
                  label: "По типу",
                  options: "type"
                },
                {
                  label: "Произвольно",
                  options: "free"
                }
              ],
              default_values: {
                ...default_values_main,
                isOpenMenu: false,

                name: "Балка",
                display_name: "Балка",

                // Input
                A_Input: 0,
                B_Input: 0,
                T_Input: 0,
                S_Input: 0,
                // Input Scales
                A_Scale: 1,
                B_Scale: 1,
                T_Scale: 1,
                S_Scale: 1,

                // Types and GOSTs
                balk_type: "",
                gost_option: null
              }
            },
            {
                image_url: images.list, 
                text: "Лист",
                calculator: SheetCalculator,
                default_values: {
                    ...default_values_main,
                    isOpenMenu: false,

                    name: "Лист",
                    display_name: "Лист",

                    // Input
                    A_Input: 0,
                    B_Input: 0,

                    // Input Scales
                    A_Scale: 1,
                    B_Scale: 1
                }
            },
        ]
        this.PopUpMenuBottom = this.PopUpMenuBottom.bind(this);
        this.PopUpMenuVariants = this.PopUpMenuVariants.bind(this);

        this.setCalculator = props.setCalculator;
    }

    clearItem = () => this.setState({item: null})

    CalculatorMainButton(props) {
        var onClick = props.onClick || null;
        var img = props.img;
        var text = props.text || "";
        return (
            <div className='block_button'
                 onClick={onClick}
            >
                <img src={img} alt={text}></img>
                <p>{text}</p>
            </div>
        )
    }
    PopUpMenuBottom() {
        return (
            <div>
                <p>Выбран калькулятор:</p>
                <this.CalculatorMainButton 
                    img={this.state.item.image_url}
                    text={this.state.item.text}
                ></this.CalculatorMainButton>
            </div>
        )
    }
    PopUpMenuVariants() {
        const item = this.state.item;
        return (
            <div>
            {
                item.variants.map((variant, i) => (
                    <div 
                        key={i} 
                        onClick={() => {
                            this.setCalculator(item, variant.options);
                            this.clearItem();
                        }}
                    >
                        {variant.label}
                    </div>
                )
            )}
            </div>
    )}
    render() {
        return (
            <div>
                {
                    this.items.map((item, i) => {
                        let onClickFun;
                        if (item.variants && item.variants.length > 0) 
                        {
                            onClickFun = () => this.setState( {item: item})
                        }
                        else 
                        {
                            onClickFun = () => this.setCalculator(item, null);
                        }

                        return (
                            <this.CalculatorMainButton
                                key={i}
                                onClick={onClickFun}
                                img={item.image_url}
                                text={item.text}
                            ></this.CalculatorMainButton>
                        )
                    })
                }
                {this.props.children}
                <PopUpMenu
                    closeFun = {this.clearItem}
                    bottom = {this.PopUpMenuBottom}
                    trigger = { this.state.item && this.state.item.variants.length > 0 }
                >
                    <this.PopUpMenuVariants></this.PopUpMenuVariants>
                </PopUpMenu>
            </div>
        )
    }
}

export default CalculatorList;