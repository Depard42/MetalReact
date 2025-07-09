import sheet_calculator_img from '../../../img/calculators/sheet.png'
import CalculatorParent from './CalculatorParent';



class SheetCalculator extends CalculatorParent {
    constructor(props) {
        super(props);

        this.img = sheet_calculator_img;
        this.alt = 'Sheet Calculator';

        this.state = {
            ...props.values
        }
        this.UpdateInput = this.UpdateInput.bind(this);
        this.MainInputs = this.MainInputs.bind(this);

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
                title: "Высота (B)",
                placeholder: 'Введите высоту',
                changeInput: (event) => {this.setState({B_Input: event.target.value}, this.UpdateInput)},
                changeOption: (event) => {this.setState({B_Scale: event.target.value}, this.UpdateInput)},
                unions: this.lengthUnions,
                default_value: this.state.B_Input,
                default_option: this.state.B_Scale
            },
        ]
    };
    UpdateInput() {
        this.A = this.state.A_Input * this.state.A_Scale
        this.B = this.state.B_Input * this.state.B_Scale

        this.Square = this.A * this.B

        if (this.state.calculator_option === 0){
            // По длине
            this.l = this.state.length_InputValue * this.state.length_InputOption;
            this.Volume = this.Square * this.l
            this.MOne = this.Volume * this.state.density / 1000;
            this.M = this.MOne * this.state.quontity_InputValue;
            // scaling to output units
            this.MOneScaled = this.state.massaOneOutputScale * this.MOne;
            this.MScaled = this.state.massaOutputScale * this.M;

        } else if (this.state.calculator_option === 1) {
            // По массе
            this.M = this.state.massa_InputValue / this.state.massa_InputOption
            this.Volume = this.M / this.state.density * 1000
            this.l = this.Volume / this.Square
            this.l_average = this.l / this.state.quontity_InputValue
            // scaling to output units
            this.l_Scaled = this.l / this.state.l_OutputScale;
            this.l_average_Scaled = this.l_average / this.state.l_average_OutputScale;
        }

        this.price = this.state.price_InputValue * this.state.price_InputOption * this.M;
        if (this.state.isNDS) {
            this.price = this.price / 0.8;
        }
        const new_values = {
            massa: this.M, 
            massaOne: this.M / this.state.quontity_InputValue, 
            price: this.price,
            massaOneScaled: this.MOneScaled || 0,
            massaScaled: this.MScaled || 0,
            l: this.l,
            l_average: this.l / this.state.quontity_InputValue,
            l_Scaled: this.l_Scaled || 0,
            l_average_Scaled:  this.l_average_Scaled || 0,
            display_name: `${this.state.name} ${this.A}x${this.B}x${this.l}`
        }
        this.setState(new_values, ()=>{this.setValues(this.state)});
    }
    
    MainInputs()
    {
        return (
            <this.InputsGroups
                inputs = {this.inputs}
            ></this.InputsGroups>
        )
    }
}


export default SheetCalculator;