import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {counterReducer} from './reducers/reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)




class PalauteNappi extends React.Component {

    render() {
        return (
            <button onClick = {e => store.dispatch({ type: this.props.type})}>{this.props.teksti}</button>
        )
        
    }
}

class PalauteNapit extends React.Component {
    render() {
        const objektit = [];
        this.props.arvosanat.forEach((arvosana) => {
            const palautenappi = <PalauteNappi 
                                    key = {arvosana.teksti}
                                    type = {arvosana.type}
                                    teksti = {arvosana.teksti}
                                    />
            objektit.push(palautenappi);
        })
        return objektit;
    }
}

class StatistiikkaPalanen extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.teksti}</td>
                <td>{this.props.lukuMaara}</td>
            </tr>
        )
    }
}

class StatistiikkaOsio extends React.Component {
    
    render() {
        const maarat = this.props.arvosanat.map((arvosana) => {
            return (
                <StatistiikkaPalanen
                  key = {arvosana.teksti}
                  teksti = {arvosana.teksti}
                  lukuMaara = {arvosana.lukuMaara}
                />
            )
        })
        return (
            <div>
                <h3>Statistiikka</h3>
                    <table>
                        <tbody>
                           {maarat}
                           <StatistiikkaPalanen 
                              teksti = "Hyvien osuus: (%)  "
                              lukuMaara = {laskeHyvienOsuus()}
                            />
                            <StatistiikkaPalanen
                              teksti = "Keskiarvo:"
                              lukuMaara = {laskeKeskiarvo()}
                            />  
                        </tbody>

                    </table>

            </div>
        )
    }
}

const laskeKeskiarvo = (arvosanat) => {
    const state = store.getState()
    const lkm = state.good + state.bad + state.ok
    if (lkm === 0) {
        return 0
    }
    const summa = state.good * 1 + state.bad * -1
    const keskiarvo = summa / lkm;
    return Math.round(keskiarvo * 100) / 100
}

const laskeHyvienOsuus = () => {
    const state = store.getState()
    const hyvat = state.good
    const muut = state.bad + state.ok
    if (hyvat + muut === 0) {
        return 0
    }
    const osuus = hyvat / (hyvat + muut)
    return (Math.round(osuus * 100) / 100) * 100
}

class App extends React.Component {


    
    render () {
        const {store} = this.props
        const hyva = {
            teksti: "Hyvä",
            type: 'GOOD',
            lukuMaara: store.getState().good,
            arvo: 1
        }
        const neutraali = {
            teksti: "Neutraali",
            type: 'OK',
            lukuMaara: store.getState().ok,
            arvo: 0
        }
        const huono = {
            teksti: "Huono",
            type: 'BAD',
            lukuMaara: store.getState().bad,
            arvo: -1
        }
        const arvosanat = [hyva, neutraali, huono];

        return (
            <div>
                <h2>Anna palautetta</h2>
                <PalauteNapit arvosanat = {arvosanat} />
                <StatistiikkaOsio arvosanat = {arvosanat} />
            </div>
        )
    }

}

const render = () => {
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
}

render()
store.subscribe(render)