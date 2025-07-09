import React from "react";
import "./LengthMap.modul.css"
import PopUpMenu from "../PopUpMenu";
import CalculatorList from "./CalculatorList";
import axios from 'axios';

class LengthMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isPopUpOpen: true,
            data: [],
            edit_calculator: NaN,
            edit_index: NaN,
            choosen: false,
        }
        this.addCalculator = this.addCalculator.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.copyRow = this.copyRow.bind(this);
        this.closeCurrentCalculator = this.closeCurrentCalculator.bind(this);
        this.backbutton = this.backbutton.bind(this);
        this.setValuesToCalculator = this.setValuesToCalculator.bind(this);
        this.EditCalculatorWindow = this.EditCalculatorWindow.bind(this);
        this.MainTable = this.MainTable.bind(this);
        this.ResultsTable = this.ResultsTable.bind(this);
        this.ControlPanel = this.ControlPanel.bind(this);
        this.Buttons = this.Buttons.bind(this);
        this.send_data = this.send_data.bind(this);
    }

    addCalculator(item, options)
    {
        this.setState({ isPopUpOpen: false });
        const { data } = this.state;
        const new_data = [...data, {item: item, options: options, values: { ...item.default_values }}]
        this.setState({ data: new_data },
            ()=>{
                const i = this.state.data.length-1;
                this.setState({ edit_calculator: this.state.data[i], edit_index: i })
            }
        );
    }

    deleteRow(index)
    {
        const { data } = this.state;
        data.splice(index, 1);
        this.setState({ data: data });
    }
    copyRow(index)
    {
        const { data } = this.state;
        const new_data = [...data, {...data[index]}];
        this.setState({ data: new_data, choosen: new_data.length-1 })
    }
    closeCurrentCalculator()
    {
        this.setState({ edit_calculator: NaN, edit_index: NaN });
    }
    backbutton()
    {
        return <div className='backbutton' onClick={this.closeCurrentCalculator}><i className="fas fa-arrow-left"></i></div>
    }
    setValuesToCalculator(values)
    {
        console.log(values)
        const { data } = this.state;
        data[this.state.edit_index].values = values;
        this.setState({ data: data });
    }
    send_data()
    {
        let formData = {
            pipes: [],
            lists: [],
            balks: []
        }
        this.state.data.forEach((row)=>{
            if (row.values.name === "Труба")
            {
                formData.pipes.push(row.values)
            }
            else if (row.values.name === "Балка" )
            {
                formData.balks.push(row.values)
            }
            else if (row.values.name === "Лист" )
            {
                formData.lists.push(row.values)
            }
        })
        console.log(formData)
        try {
            const response = axios.post('http://127.0.0.1:8000/api/add_order', formData);
            console.log('Успешно:', response.data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    EditCalculatorWindow()
    {
        const { edit_calculator } = this.state;
        return (
            <div>
                <this.backbutton></this.backbutton>
                <edit_calculator.item.calculator
                    options={edit_calculator.options}
                    values={edit_calculator.values}
                    setValues={this.setValuesToCalculator}
                    additional_inputs={true}
                >
                </edit_calculator.item.calculator>
                    
            </div>
        )
    }

    MainTable()
    {
        const { data } = this.state;
        return (
            <div className="table-container">
                <table>
                    <thead className="fixed">
                        <tr>
                            <th>№</th>
                            <th>Позиция</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((row, i) => {
                                return (
                                    <tr key={i}
                                        style={{
                                            backgroundColor: this.state.choosen === i ? "#ff6968" : "",
                                            color: this.state.choosen === i ? "white" : "black",
                                        }}
                                        onClick={()=>{this.setState({choosen: i})}}
                                    >
                                        <th>{i+1}</th>
                                        <th>{row.values.display_name}</th>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                    
                </table>
            </div>
        )
    }

    ResultsTable()
    {
        const { data } = this.state;
        return (
            <table className="result">
                <thead
                    style={{ backgroundColor: "#ff8f6166"}}
                >
                        <tr>
                            <th>Масса (кг)</th>
                            <th>Длина (м)</th>
                            <th>Цена (₽)</th>
                        </tr>
                    </thead>
                <tbody>
                    <tr>
                        <th>{parseFloat(data.reduce(function(s, row) {return s + row.values.massa;}, 0).toFixed(4))}</th>
                        <th>{parseFloat(data.reduce(function(s, row) {return s + row.values.l;}, 0).toFixed(4))}</th>
                        <th>{parseFloat(data.reduce(function(s, row) {return s + row.values.price;}, 0).toFixed(2))}</th>
                    </tr>
                </tbody>
            </table>
        )
    }

    ControlPanel()
    {
        const { data } = this.state;
        if (this.state.choosen !== false)
            return (
                <div className="control_panel">
                    <i className="fas fa-edit"
                        onClick={()=>{ this.setState({ edit_calculator: data[this.state.choosen], edit_index: this.state.choosen }) }}
                    ></i>
                    <i className="fa-regular fa-copy"
                        onClick={()=>{ this.copyRow(this.state.choosen)}}
                    ></i>
                    <i className="fas fa-trash" 
                        onClick={()=>{ this.deleteRow(this.state.choosen); this.setState({ choosen: false }) }}
                    ></i>
                </div>
            )
    }

    Buttons()
    {
        return (
            <div className="Buttons">    
                <div
                    onClick={this.send_data}
                    style={{ backgroundColor: "#7b55ff" }}
                >
                    <p>Сохранить</p>
                </div>
                <div
                    onClick={()=>{this.setState({ isPopUpOpen: true })}}
                    style={{ backgroundColor: "#09749e" }}
                >
                    <p>Добавить</p>
                </div>
            </div>
        )
    }

    render() {
        const { edit_calculator } = this.state;

        if (edit_calculator)
        {
            return <this.EditCalculatorWindow></this.EditCalculatorWindow>;
        }
        else
        {
            return (
                <div>
                    <div className="LengthMap">
                        <h2>Карта Длин</h2>
                        <div className="main">
                            <this.MainTable></this.MainTable>
                            <this.ResultsTable></this.ResultsTable>
                        </div>
                        <this.ControlPanel></this.ControlPanel>
                        <this.Buttons></this.Buttons>
                    </div>
                    
                    <PopUpMenu
                        closeFun = {() => {this.setState({ isPopUpOpen: false })}}
                        trigger = {this.state.isPopUpOpen}
                        column={true}
                    >
                        <CalculatorList
                            setCalculator = { this.addCalculator }
                        ></CalculatorList>
                    </PopUpMenu>
                </div>
            )
        }
    }
}

export default LengthMap;