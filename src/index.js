import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red', showScene: false};
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render () {
    const filler = new Array(100).fill(1);

    return (
      <div>

        { filler.map( (v,i) => {
          return (
            <div key={`lipsum-${i}`}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate vestibulum neque, faucibus dignissim ante fermentum lacinia. Etiam at nunc viverra, lobortis arcu vitae, porta libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean in tempor mi. In non nunc velit. Nunc efficitur tellus ac erat feugiat auctor.</p>
            </div>
          );
        }) }

        <button onClick={ e => this.setState({ showScene: !this.state.showScene }) }>Toggle</button>


        { this.state.showScene ? (
          <div style={{ width: 900, height: 500 }}>
            <Scene embedded >
              <a-assets>
                <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
                <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
              </a-assets>

              <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
              <Entity primitive="a-light" type="ambient" color="#445451"/>
              <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
              <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
              <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>
              <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>

              <Entity id="box"
                geometry={{primitive: 'box'}}
                material={{color: this.state.color, opacity: 0.6}}
                animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
                animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
                position={{x: 0, y: 1, z: -3}}
                events={{click: this.changeColor.bind(this)}}>
                <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                        geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                        material={{color: '#24CAFF'}}/>
              </Entity>

              <Entity primitive="a-camera">
                <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
              </Entity>
            </Scene>
          </div>
        ) : null }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
