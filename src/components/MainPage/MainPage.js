import React, {Suspense, lazy} from 'react';
import "./MainPage.css";

import BackButton from '../UI/BackButton/BackButton';
import LoadingScreen from '../UI/StatusScreens/LoadingScreen';

const CalculateMain = lazy(() => import("../Calculate/CalculateMain"))
const LengthMap = lazy(() => import("./../Calculate/LengthMap"))

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0
    };

    this.windows = {
        1: CalculateMain,
        2: LengthMap
    }

    this.getWindow = this.getWindow.bind(this);
  }

  getWindow()
  {
    const Window = this.windows[this.state.option];
    return <Window></Window>
  }

  render() {

    return (
      <div>
        
        {
            this.state.option !== 0 ? 
              <div>
                <BackButton onClick={()=>{this.setState({ option: 0 })}}/>
                <Suspense fallback={<LoadingScreen/>}>
                    <this.getWindow></this.getWindow>
                </Suspense>
              </div> 
            :
              <div>
                <h2>Главная</h2>
                <div className='mainList'>
                    <div>
                        <div className='block_button'
                        onClick={()=>{this.setState({ option: 1 })}}
                        >
                            <div></div>
                            <p>Калькуляторы</p>
                            
                        </div>
                        <div className='block_button'
                        onClick={()=>{this.setState({ option: 2 })}}
                        >
                            <div></div>
                            <p>Карта длин</p>
                            
                        </div>
                        
                    </div>
                    </div>
              </div>
        }
      </div>
    
    )
  }
}

export default MainPage;