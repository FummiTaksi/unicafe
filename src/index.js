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
        objektit.push(<p>Keskiarvo: {laskeKeskiarvo(this.props.arvosanat)}</p>)
        objektit.push(<p>Positiivisia: {laskeHyvienOsuus(this.props.arvosanat)}%</p>)
        return objektit;
    }
}

const laskeKeskiarvo = (arvosanat) => {
    let summa = 0;
    let palautteidenMaara = 0;
    arvosanat.forEach((arvosana) => {
        summa +=  arvosana.arvo  * arvosana.lukuMaara;
        palautteidenMaara +=  arvosana.lukuMaara;
    })
    if (palautteidenMaara === 0) {
        return 0;
    }
    const keskiarvo = summa / palautteidenMaara;
    return Math.round(keskiarvo * 100) / 100
}

const laskeHyvienOsuus = (arvosanat) => {
    let hyvienMaara = 0;
    let muidenMaara = 0;
    arvosanat.forEach((arvosana) => {
        if (arvosana.teksti === "Hyvä") {
            hyvienMaara += arvosana.lukuMaara;
        }
        else {
            muidenMaara += arvosana.lukuMaara;
        }
    })
    if (hyvienMaara + muidenMaara === 0) {
        return 0;
    }
    const osuus = ( hyvienMaara / (hyvienMaara + muidenMaara) ) * 100.0;
    return Math.round(osuus * 100) / 100
}

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            hyvat: 0,
            neutraalit: 0,
            huonot: 0,
            palautettaAnnettu: false
        }
    }

    kasvataMaaraa = (arvosanaNimi, arvo) => {

        return () => {
            this.setState({
                [arvosanaNimi]: arvo,
                palautettaAnnettu: true
                })
            }
        
    }

     statistiikka = (arvosanat) => {
        if (this.state.palautettaAnnettu) {
            return (
                <StatistiikkaOsio arvosanat = {arvosanat} />
            )
        }
        return (<p>Yhtään palautetta ei ole vielä annettu</p>)
    }

    render () {
        const hyva = {
            teksti: "Hyvä",
            kasvatusFunktio: this.kasvataMaaraa("hyvat", this.state.hyvat + 1),
            lukuMaara: this.state.hyvat,
            arvo: 1
        }
        const neutraali = {
            teksti: "Neutraali",
            kasvatusFunktio: this.kasvataMaaraa("neutraalit", this.state.neutraalit +1),
            lukuMaara: this.state.neutraalit,
            arvo: 0
        }
        const huono = {
            teksti: "Huono",
            kasvatusFunktio: this.kasvataMaaraa("huonot", this.state.huonot + 1),
            lukuMaara: this.state.huonot,
            arvo: -1
        }
        const arvosanat = [hyva, neutraali, huono];

        return (
            <div>
                <h2>Anna palautetta</h2>
                <PalauteNapit arvosanat = {arvosanat} />
                {this.statistiikka(arvosanat)}
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
