import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class PalauteNappi extends React.Component {

    render() {
        return (
            <button onClick = {this.props.onClick}>{this.props.teksti}</button>
        )
        
    }
}

class PalauteNapit extends React.Component {
    render() {
        const objektit = [];
        this.props.arvosanat.forEach((arvosana) => {
            const palautenappi = <PalauteNappi 
                                    key = {arvosana.teksti}
                                    onClick = {arvosana.kasvatusFunktio}
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
            <p>{this.props.teksti}: {this.props.lukuMaara}</p>
        )
    }
}

class StatistiikkaOsio extends React.Component {
    render() {
        const objektit = [<h3>Statistiikka</h3>];
        this.props.arvosanat.forEach((arvosana) => {
            const palanen = <StatistiikkaPalanen 
                                key = {arvosana.teksti}
                                teksti = {arvosana.teksti}
                                lukuMaara = {arvosana.lukuMaara}
                                /> 
            objektit.push(palanen);
        })
        return objektit;
    }
}

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            hyvat: 0,
            neutraalit: 0,
            huonot: 0
        }
    }

    kasvataHyvanMaaraa = () => {
        this.setState({
            hyvat: this.state.hyvat + 1
        })
    }

    kasvataNeutraalinMaaraa = () => {
        this.setState({
            neutraalit: this.state.neutraalit + 1
        })
    }

    kasvataHuononMaaraa  = () => {
        this.setState({
            huonot: this.state.huonot + 1
        })
    }

    teeArvosanaObjekti = (teksti, kasvatusFunktio, lukuMaara) => {
        return ({
            teksti: teksti,
            kasvatusFunktio: kasvatusFunktio,
            lukuMaara: lukuMaara
        })
    }

    render () {
        const hyva = this.teeArvosanaObjekti("Hyvä", this.kasvataHyvanMaaraa, 
                            this.state.hyvat);
        const neutraali = this.teeArvosanaObjekti("Neutraali",
                            this.kasvataNeutraalinMaaraa, this.state.neutraalit);
        const huono = this.teeArvosanaObjekti("Huono", this.kasvataHuononMaaraa,
                            this.state.huonot);
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

ReactDOM.render(<App />, document.getElementById('root'));
