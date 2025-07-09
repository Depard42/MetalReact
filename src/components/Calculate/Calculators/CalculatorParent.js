import React from 'react';
import metals from "./properties/MetalProperty"
import Select from 'react-select';
import DynamicTextArea from '../../UI/DynamicTextArea/DynamicTextArea';
import App from '../../imageWorker/image2';
import "./CalculatorStyle.modul.css"


class CalculatorParent extends React.Component {
    constructor(props) {
        super(props);

        this.metals = metals
        this.pi = 3.1415926;

        this.lengthUnionsBig = [{title: "М", scale: 1}, {title: "Км", scale: 1000}, {title: "См", scale: 0.01}];
        this.weightUnions = [{title: "Кг", scale: 1}, {title: "Т", scale: 0.001}];
        this.priceUnions = [{title: "за 1 Кг", scale: 1}, {title: "за 1 Т", scale: 0.001}];
        this.lengthUnions = [{title: "Мм", scale: 1}, {title: "См", scale: 100}];

        const null_function = (null_arg) => {};
        this.setValues = this.props.setValues || null_function;

        this.inputGroup = this.inputGroup.bind(this);
        this.hiddenMenu = this.hiddenMenu.bind(this);
        this.changeNds = this.changeNds.bind(this);
        this.PriceNdsBlock = this.PriceNdsBlock.bind(this);
        this.priceBlock = this.priceBlock.bind(this);
        this.selectUnions = this.selectUnions.bind(this);
        this.OutputLineWithUnions = this.OutputLineWithUnions.bind(this);
        this.OutputLinesWithUnions = this.OutputLinesWithUnions.bind(this);
        this.MainResult = this.MainResult.bind(this);
        this.ResultLength = this.ResultLength.bind(this);
        this.ResultMass = this.ResultMass.bind(this);
        this.InputsGroups = this.InputsGroups.bind(this);
        this.CalculatorOption = this.CalculatorOption.bind(this);
        this.CalculatorHead = this.CalculatorHead.bind(this);
        this.MassAndLengthInput = this.MassAndLengthInput.bind(this);
        this.QuontityAndPrice = this.QuontityAndPrice.bind(this);
        this.updateCalculator = this.updateCalculator.bind(this);
        this.AdditionalInputs = this.AdditionalInputs.bind(this);
        this.handlesImages = this.handlesImages.bind(this);
    }

    updateCalculator()
    {
        this.setState({
            length_InputValue: 0,
            length_InputOption: 1,
            massa_InputValue: 0,
            massa_InputOption: 1,
        }, this.UpdateInput)
        
    }

    selectUnions(props)
    {
        var unions = props.unions;
        var change = props.change;
        var default_value = props.default_value;
        return (
            <select className='selectUnions'
                value={default_value}
                onChange={change}
            >
                {
                    unions.map((union, i) => {
                        return <option value={union.scale} key={i}>{union.title}</option>
                    })
                }
            </select>
        )
    }

    inputGroup(props)
    {
        var title = props.title;
        var placeholder = props.placeholder;
        var unions = props.unions;
        var changeInput = props.changeInput;
        var changeOption = props.changeOption;
        var default_value = props.default_value || "";
        var default_option = props.default_option;
        return (
            <div className='CalculatorParameter'>
                <p>{title}</p>
                <div className='inputOptionWrapper'>
                    <input type="number" 
                           placeholder={placeholder}
                           defaultValue={default_value}
                           onChange={changeInput}
                    ></input>
                    {
                        unions.length !== 0 &&
                        <this.selectUnions change={changeOption} 
                                           default_value={default_option} 
                                           unions={unions}
                        ></this.selectUnions>
                    }
                    
                </div>
            </div>
        )
    }
    Output(props) {
        return <div className='output'>{props.value}</div>
    }
    priceBlock(props) {
        var price = props.price || 0
        return (
            <div className='CalculatorParameter'>
                <p>Общая стоимость (руб): </p>
                <this.Output value={parseFloat(price.toFixed(2))}></this.Output>
            </div>
        )
    }
    

    hiddenMenu() {
        if (this.state.needsHiddenMenu)
        return (
            <div>
                <div className='menu_opener'
                     onClick={() => {this.setState({isOpenMenu: !this.state.isOpenMenu})}}
                >
                    <i className={!this.state.isOpenMenu ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up"}></i>
                </div>
                <div className='Calculator' style={{display: !this.state.isOpenMenu ? "none" : "block", marginBottom: "10px"}}>
                    <div className='CalculatorParameters'>
                        <div className='CalculatorParameter'>
                            <p>Материал</p>
                            <Select 
                                options={metals}
                                defaultValue={this.state.density_option}
                                onChange={(option) => 
                                    {this.setState({
                                        density: option.value,
                                        material: option.label,
                                        density_option: option
                                    }, this.UpdateInput)}}
                            ></Select>
                            
                        </div>
                        <div className='CalculatorParameter'>
                            <p>Плотность (Гр/См³): </p>
                            <this.Output value={this.state.density} onChange={()=>{}}></this.Output>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

    changeNds(bool) {
        this.setState({isNDS: bool}, this.UpdateInput)
    }
    PriceNdsBlock() {
        var isNDS = this.state.isNDS;
        return (
            <div className='nds-choosing'>
                <div 
                    className={!isNDS ? "active" : ""}
                    onClick={()=>this.changeNds(false)}
                >Без НДС</div>
                <div 
                    className={isNDS ? "active" : ""}
                    onClick={()=>this.changeNds(true)}
                >С НДС</div>
            </div>
        )
    }
    
    OutputLineWithUnions(props){
        var title = props.title || "";
        var value = props.value || 0;
        var signs = props.signs || 32;
        var unions = props.unions;
        var default_option = props.default_option;
        var onChangeUnions = props.onChangeUnions;

        return (
            <div className='CalculatorParameter'>
                <p>{title}: </p>
                <div className='inputOptionWrapper'>
                    <this.Output value={parseFloat(value.toFixed(signs))}></this.Output>
                    {
                        unions && unions.length > 0 &&
                        <this.selectUnions change={(event) => {onChangeUnions(event.target.value)}}
                                       unions={unions}
                                       default_value={ default_option }
                        ></this.selectUnions>
                    }
                </div>
            </div>
        )
    }
    OutputLinesWithUnions(props){
        var lines = props.lines;

        return (
            <div>
                {
                    lines.map((line, i) => {
                        return <this.OutputLineWithUnions
                                key={i}
                                title = { line.title }
                                value = { line.value } 
                                signs = { line.signs }
                                unions = { line.unions }
                                default_option = { line.default_option }
                                onChangeUnions = { line.onChangeUnions }
                                ></this.OutputLineWithUnions>
                    })
                }
            </div>
        )
    }

    ResultMass() {
        var weightUnions = [{title: "Кг", scale: 1}, {title: "Т", scale: 0.001}];
        return (
            <this.OutputLinesWithUnions
                lines={[
                    {
                        title: "Масса (одной единицы)",
                        value: this.state.massaOneScaled,
                        signs: 6,
                        unions: weightUnions,
                        default_option: this.state.massaOneOutputScale,
                        onChangeUnions: (value) => {this.setState({massaOneOutputScale: value}, this.UpdateInput)}
                    },
                    {
                        title: "Общая масса",
                        value: this.state.massaScaled,
                        signs: 6,
                        unions: weightUnions,
                        default_option: this.state.massaOutputScale,
                        onChangeUnions: (value) => {this.setState({massaOutputScale: value}, this.UpdateInput)}
                    }
                ]}
            ></this.OutputLinesWithUnions>
        )
    }
    ResultLength() {
        var lengthUnionsBig = [{title: "М", scale: 1}, {title: "Км", scale: 1000}, {title: "См", scale: 0.01}];
        return (
            <this.OutputLinesWithUnions
                lines={[
                    {
                        title: "Средняя длина (одной единицы)",
                        value: this.state.l_average_Scaled,
                        signs: 6,
                        unions: lengthUnionsBig,
                        default_option: this.state.l_average_OutputScale,
                        onChangeUnions: (value) => {this.setState({l_average_OutputScale: value}, this.UpdateInput)}
                    },
                    {
                        title: "Длина",
                        value: this.state.l_Scaled,
                        signs: 6,
                        unions: lengthUnionsBig,
                        default_option: this.state.l_OutputScale,
                        onChangeUnions: (value) => {this.setState({l_OutputScale: value}, this.UpdateInput)}
                    }
                ]}
            ></this.OutputLinesWithUnions>
        )
    }
    MainResult() {
        return (
            <div className='Calculator'>
                <h2>Результат:</h2>
                { this.state.calculator_option===0 && (
                    <this.ResultMass></this.ResultMass>
                )}{ this.state.calculator_option===1 && (
                    <this.ResultLength></this.ResultLength>
                )}
                <this.priceBlock price={this.state.price}></this.priceBlock>
            </div>
        )
    }
    CalculatorOption(props)
    {
        var number = props.number;
        var text = props.text;
        var update = props.update
        var isActive = this.state.calculator_option === number ? "active" : "";
        var onClick = () => {
            if (this.state.calculator_option !== number) {
                this.setState({calculator_option: number});
                update()
            }}
        return <div className={'CalculatorOption ' + isActive} onClick={onClick}>
                    {text}
                </div>
    }
    CalculatorHead() {
        var img = this.img;
        var alt = this.alt;
        return (
            <div className='CalculatorHead'>
                <img className='CalculatorHeadImg' src={img} alt={alt}></img>
                <div className='CalculatorOptions'>
                    <this.CalculatorOption text="По длине" number={0} update={this.updateCalculator}></this.CalculatorOption>
                    <this.CalculatorOption text="По массе" number={1} update={this.updateCalculator}></this.CalculatorOption>
                </div>
            </div>
        )
    }

    InputsGroups(props){
        var inputs = props.inputs;
        return (
            <div>
                {
                    inputs.map((input, i) => {
                        return <this.inputGroup
                            key={i}
                            title={input.title}
                            placeholder={input.placeholder}
                            changeInput={input.changeInput}
                            changeOption={input.changeOption}
                            unions={input.unions}
                            default_value={input.default_value}
                            default_option={input.default_option}
                        ></this.inputGroup>
                    })
                }
            </div>
        )
    }

    MassAndLengthInput()
    {
        return ( 
            <div>
                { this.state.calculator_option===0 && (
                    <this.inputGroup title="Длина"
                        placeholder='Введите длину'
                        changeInput={(event) => {this.setState({length_InputValue: event.target.value}, this.UpdateInput)}}
                        changeOption={(event) => {this.setState({length_InputOption: event.target.value}, this.UpdateInput)}}
                        unions={this.lengthUnionsBig}
                        default_value = {this.state.length_InputValue}
                        default_option = {this.state.length_InputOption}
                    ></this.inputGroup>
                )}
                { this.state.calculator_option===1 && (
                    <this.inputGroup title="Масса" 
                        placeholder='Введите массу'
                        changeInput={(event) => {this.setState({massa_InputValue: event.target.value}, this.UpdateInput)}}
                        changeOption={(event) => {this.setState({massa_InputOption: event.target.value}, this.UpdateInput)}}
                        unions={this.weightUnions}
                        default_value = {this.state.massa_InputValue}
                        default_option = {this.state.massa_InputOption}
                    ></this.inputGroup>

                )}
            </div>
        )
    }
    QuontityAndPrice()
    {
        return (
            <div>
                <this.inputGroup title="Количество (шт)" 
                    placeholder='Введите количество'
                    changeInput={(event) => {this.setState({quontity_InputValue: event.target.value}, this.UpdateInput)}}
                    default_value={this.state.quontity_InputValue}
                    unions={[]}
                ></this.inputGroup>
                <this.inputGroup title="Цена (руб)" 
                    placeholder='Введите цену'
                    changeInput={(event) => {this.setState({price_InputValue: event.target.value}, this.UpdateInput)}}
                    changeOption={(event) => {this.setState({price_InputOption: event.target.value}, this.UpdateInput)}}
                    unions={this.priceUnions}
                    default_value={this.state.price_InputValue}
                    default_option={this.state.price_InputOption}
                ></this.inputGroup>
            </div>
        )
    }
    handlesImages(images)
    {
        this.setState(
            {images: images},
            () => {this.setValues(this.state)}
        )
    }
    AdditionalInputs()
    {
        if (this.props.additional_inputs)
        return (
            <div className='AdditionalInputs'>
                 <p>Комментарий</p>
                 <DynamicTextArea></DynamicTextArea>
                 <p>Прикрепить фотографии</p>
                <App 
                    initialPhotos={this.state.images}
                    onPhotosChange={this.handlesImages}
                />
            </div>
        )
    }

    render()
    {
        return (
            <div>
                <div className='Calculator'>
                    <this.CalculatorHead></this.CalculatorHead>
                    <div className='CalculatorParameters'>
                        <this.MainInputs></this.MainInputs>
                        <this.MassAndLengthInput></this.MassAndLengthInput>
                        <this.QuontityAndPrice></this.QuontityAndPrice>
                        <this.PriceNdsBlock></this.PriceNdsBlock>
                    </div>
                </div>
                <this.hiddenMenu></this.hiddenMenu>
                <this.AdditionalInputs></this.AdditionalInputs>
                <this.MainResult></this.MainResult>

            </div>
        )
    }
}



export default CalculatorParent;