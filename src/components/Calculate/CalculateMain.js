import React from 'react';

import CalculatorList from './CalculatorList';
import BackButton from '../UI/BackButton/BackButton';

class CalculateMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_calculator: null,
      current_calculator_options: null
    }
    this.closeCurrentCalculator = this.closeCurrentCalculator.bind(this);
  }

  closeCurrentCalculator()
  {
    this.setState({current_calculator: false});
  }

  render() {

    return (
      <div>
        
        {
          this.state.current_calculator ?
            <div>
                    <BackButton
                      onClick={this.closeCurrentCalculator}
                    />
                    <this.state.current_calculator.calculator
                      options={this.state.current_calculator_options}
                      values={this.state.current_calculator.default_values}
                    />
            </div>
            :
              <div>
                <h2>Калькуляторы</h2>
                <div className='mainList'>
                  
                  <CalculatorList
                    setCalculator={(item, options)=>{
                      this.setState({
                        current_calculator: item,
                        current_calculator_options: options
                      })
                    }}
                  />
                  
                </div>
              </div>
        }
      </div>
    
    )
  }
}

export default CalculateMain;