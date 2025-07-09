import balk_calculator_img from '../../../img/calculators/balk.png'
import CalculatorParent from './CalculatorParent';
import balk_types from "./balk_types/balk_types.json"
import Select from 'react-select';

// Нужен для того чтобы убирать баг со стиялми в селект
const customStylesSelect = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black', // Цвет текста (выбран/не выбран)
      backgroundColor: state.isSelected ? 'white' : 'white', // Фон опции
      '&:hover': {
        backgroundColor: '#dff4fb', // Фон при наведении
      },
    }),
    control: (provided) => ({
      ...provided,
      border: '1px solid #ccc', // Рамка селекта
      width: '250px', // Фиксированная ширина
      minWidth: '250px', // Минимальная ширина
      maxWidth: '100%', // Максимальная ширина (адаптив)
    }),
  };
  // Настройка для селекта с выбором типа балки
  const customStylesSelectWidthHead = {
    control: (provided) => ({
        ...provided,
        minWidth: '250px', // Минимальная ширина
        maxWidth: '250px'
      }),
  }

class BalkCalculator extends CalculatorParent {
    constructor(props) {
        super(props);
        
        this.img = balk_calculator_img;
        this.alt = 'Balk Calculator';

        this.options = props.options;

        this.state = { ...props.values };
        this.UpdateInput = this.UpdateInput.bind(this);
        this.updateType = this.updateType.bind(this);
        this.MainInputs = this.MainInputs.bind(this);
        this.TypeInputs = this.TypeInputs.bind(this);

        this.types_keys = Object.keys(balk_types).map(key => ({
            label: key,    // То, что показывается в select
            value: key     // То, что будет в значении
          }));
        
        if (this.state.balk_type) {
            this.default_type = {
                label: this.state.balk_type,
                value: this.state.balk_type
            }
        } else {
            this.default_type = {
                label: "10Б1",
                value: "10Б1"
            }
        }
        
        this.balk_types = balk_types

        this.inputs = [
            {
                title: "Высота (A)",
                placeholder: 'Введите высоту',
                changeInput: (event) => {this.setState({A_Input: event.target.value}, this.UpdateInput)},
                changeOption: (event) => {this.setState({A_Scale: event.target.value}, this.UpdateInput)},
                unions: this.lengthUnions,
                default_value: this.state.A_Input,
                default_option: this.state.A_Scale
            },
            {
                title: "Ширина (B)",
                placeholder: 'Введите ширину',
                changeInput: (event) => {this.setState({B_Input: event.target.value}, this.UpdateInput)},
                changeOption: (event) => {this.setState({B_Scale: event.target.value}, this.UpdateInput)},
                unions: this.lengthUnions,
                default_value: this.state.B_Input,
                default_option: this.state.B_Scale
            },
            {
                title: "Толщина (T)",
                placeholder: 'Введите толщину',
                changeInput: (event) => {this.setState({T_Input: event.target.value}, this.UpdateInput)},
                changeOption: (event) => {this.setState({T_Scale: event.target.value}, this.UpdateInput)},
                unions: this.lengthUnions,
                default_value: this.state.T_Input,
                default_option: this.state.T_Scale
            },
            {
                title: "Толщина (S)",
                placeholder: 'Введите толщину',
                changeInput: (event) => {this.setState({S_Input: event.target.value}, this.UpdateInput)},
                changeOption: (event) => {this.setState({S_Scale: event.target.value}, this.UpdateInput)},
                unions: this.lengthUnions,
                default_value: this.state.S_Input,
                default_option: this.state.S_Scale
            },
        ]
    };
    componentDidMount(){
        !this.state.balk_type && this.updateType(this.default_type);
        if (this.options === "type") this.setState({ needsHiddenMenu: false })
    }
    UpdateInput() {
        const {
            A_Input,
            A_Scale,
            B_Input,
            B_Scale,
            T_Input,
            T_Scale,
            S_Input,
            S_Scale,
            calculator_option,
            length_InputValue,
            length_InputOption,
            gost_option,
            density,
            quontity_InputValue,
            massaOneOutputScale,
            massaOutputScale,
            massa_InputValue,
            massa_InputOption,
            
            price_InputValue,
            price_InputOption,
            isNDS,

            l_OutputScale,
            l_average_OutputScale
        } = this.state;

        let A, B, T, S, Square, Volume;
        let M, MOne, MScaled, MOneScaled;
        let l, l_average, l_Scaled, l_average_Scaled;
        let price;

        if (this.options === "free"){
            
            // Если работаем по произвольной балке, забираем параметры
            A = A_Input * A_Scale
            B = B_Input * B_Scale
            T = T_Input * T_Scale
            S = S_Input * S_Scale

            Square = (2 * B * S) + (A * T) - (2 * T * S)
        }
        if (calculator_option === 0)
        {
            // По длине
            l = length_InputValue * length_InputOption;
            if (this.options === "type") {
                // Работаем через тип и гоост
                MOne = gost_option.value * l;
            } else {
                // Работаем через плотность
                Volume = Square * l;
                MOne = Volume * density / 1000;
            };
            M = MOne * quontity_InputValue;
            // scaling to output units
            MOneScaled = massaOneOutputScale * MOne;
            MScaled = massaOutputScale * M;

        } 
        else if (calculator_option === 1) 
        {
            // По массе
            M = massa_InputValue / massa_InputOption
            if (this.options === "type"){
                // Работаем через тип и гост
                l = M / gost_option.value;
            } else {
                // Работаем через плотность
                Volume = M / density * 1000
                l = Volume / Square
            }
            
            l_average = l / quontity_InputValue
            // scaling to output units
            l_Scaled = l / l_OutputScale;
            l_average_Scaled = l_average / l_average_OutputScale ;
        }

        price = price_InputValue * price_InputOption * M;
        if (isNDS) {
            price = price / 0.8;
        }

        let display_name = `${this.state.name} `;
        if (this.options === "free")
        {
            display_name += `${A}x${B}x${T}x${S}`
        } else if (this.options === "type")
        {
            display_name += `${this.state.balk_type} ${this.state.gost_option.label}`
        }
        const new_values = {
            massa: M, 
            massaOne: M / quontity_InputValue, 
            price: price,
            massaOneScaled: MOneScaled || 0,
            massaScaled: MScaled || 0,
            l: l,
            l_average: l / quontity_InputValue,
            l_Scaled: l_Scaled || 0,
            l_average_Scaled:  l_average_Scaled || 0,
            display_name: display_name
        }
        this.setState(new_values, ()=>{this.setValues(this.state)});
    }
    
    
    
    updateType(option){
        var gost_options = balk_types[option.value];
        var gost_option = gost_options && gost_options.length > 0 && gost_options[0];
        
        this.setState(
            {
                balk_type: option.value,
                gost_options: gost_options,
                gost_option: gost_option
            },
            this.UpdateInput
        )
    }

    TypeInputs()
    {
        return (
            <div>
                <div className='CalculatorParameter'>
                        <p>Тип балки:</p>
                        <Select 
                            options={this.types_keys}
                            onChange={this.updateType}
                            placeholder="Выберите тип"
                            defaultValue={this.default_type}
                            styles={customStylesSelectWidthHead}
                        ></Select>
                </div>
                <div className='CalculatorParameter'>
                    <p>ГОСТ:</p>
                    <Select 
                        placeholder="Выберите ГОСТ"
                        
                        onChange={option => this.setState({gost_option: option}, this.UpdateInput)}
                        options={this.state.balk_type ? balk_types[this.state.balk_type] : []}
                        styles={customStylesSelect}
                        value={[this.state.gost_option]}
                    ></Select>
                </div>
            </div> 
        )
    }

    MainInputs()
    {
        if (this.options === "type")
        {
            return <this.TypeInputs></this.TypeInputs>;
        } 
        else if (this.options === "free")
        {
            return (
                <this.InputsGroups
                    inputs = {this.inputs}
                ></this.InputsGroups>
            )
        }
        
    }
}


export default BalkCalculator;