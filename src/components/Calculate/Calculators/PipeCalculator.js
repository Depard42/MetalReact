import pipe_calculator_img from '../../../img/calculators/pipe.png'
import CalculatorParent from './CalculatorParent';



class PipeCalculator extends CalculatorParent {
    constructor(props) {
        super(props);

        this.img = pipe_calculator_img;
        this.alt = 'Pipe Calculator';

        this.state = {
            ...props.values
        }
        this.UpdateInput = this.UpdateInput.bind(this);
        this.MainInputs = this.MainInputs.bind(this);

        this.inputs = [
            {
                title: "Диаметр (D)",
                placeholder: 'Введите диаметр',
                changeInput: (event) => {this.setState({D_Input: event.target.value}, this.UpdateInput)},
                changeOption: (event) => {this.setState({D_Scale: event.target.value}, this.UpdateInput)},
                unions: this.lengthUnions,
                default_value: this.state.D_Input,
                default_option: this.state.D_Scale
            },
            {
                title: "Толщина (T)" ,
                placeholder: 'Введите толщину',
                changeInput: (event) => {this.setState({T_Input: event.target.value}, this.UpdateInput)},
                changeOption: (event) => {this.setState({T_Scale: event.target.value}, this.UpdateInput)},
                unions: this.lengthUnions,
                default_value: this.state.T_Input,
                default_option: this.state.T_Scale
            },
        ]
        
    };
    UpdateInput() {
        var D = this.state.D_Input * this.state.D_Scale;
        var T = this.state.T_Input * this.state.T_Option;

        this.R = D / 2;
        this.r = this.R - T;
        

        if (this.state.calculator_option === 0){
            // По длине
            this.l = this.state.length_InputValue * this.state.length_InputOption;
            this.Volume = this.pi * this.l * (this.R - this.r) * (this.R + this.r);
            this.MOne = this.Volume * this.state.density / 1000;
            this.M = this.MOne * this.state.quontity_InputValue;
            // scaling to output units
            this.MOneScaled = this.state.massaOneOutputScale * this.MOne;
            this.MScaled = this.state.massaOutputScale * this.M;

        } else if (this.state.calculator_option === 1) {
            // По массе
            this.M = this.state.massa_InputValue / this.state.massa_InputOption
            this.Volume = this.M / this.state.density * 1000
            this.l = this.Volume / this.pi / (this.R - this.r) / (this.R + this.r)
            this.l_average = this.l / this.state.quontity_InputValue
            // scaling to output units
            this.l_Scaled = this.l / this.state.l_OutputScale;
            this.l_average_Scaled = this.l_average / this.state.l_average_OutputScale ;
        }

        this.price = this.state.price_InputValue / this.state.price_InputOption * this.M;
        if (this.state.isNDS) {
            this.price = this.price / 0.8;
        }
        const new_data = {
            D: D,
            T: T,
            massa: this.M, 
            massaOne: this.M / this.state.quontity_InputValue, 
            price: this.price,
            massaOneScaled: this.MOneScaled || 0,
            massaScaled: this.MScaled || 0,
            l: this.l,
            l_average: this.l / this.state.quontity_InputValue,
            l_Scaled: this.l_Scaled || 0,
            l_average_Scaled:  this.l_average_Scaled || 0,
            display_name: `${this.state.name} ${this.state.D_Input * this.state.D_Scale}x${this.state.T_Input * this.state.T_Option}`
        }
        this.setState(new_data,()=>{this.setValues(this.state)});
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


export default PipeCalculator;