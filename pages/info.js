import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import { Pulse } from 'react-native-loader';
import { connect } from 'react-redux';
import mapStateToProps from '../components/state'

class InfoScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            game: "",
            idGame: this.props.navigation.state.params.idGame,
        };
    }

    componentDidMount(){
        return fetch(`https://androidlessonsapi.herokuapp.com/api/game/details?game_id=${this.state.idGame}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const action = {
                    type: 'SAVE_GAME',
                    payload: responseJson.name
                };
                this.props.dispatch(action);

                this.setState({
                    titleGame: responseJson.name,
                    typeGame: responseJson.type,
                    yearGame: responseJson.year,
                    descriptfrGame: responseJson.description_fr,
                    descriptenGame: responseJson.description_en,
                    playerGame: responseJson.players,
                    linkGame: responseJson.url
                }, function(){
                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        if (!this.state.titleGame) {
            return (
                <View style={styles.containerLoader}>
                    <Pulse size={15} color="#fff" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>{this.state.titleGame}</Text>
                    <View style={styles.contentinfo}>
                        <Text style={styles.infogame}>Player: {this.state.playerGame}</Text>
                        <Text style={styles.infogame}>Type: {this.state.typeGame}</Text>
                        <Text style={styles.infogame}>Year: {this.state.yearGame}</Text>
                    </View>
                    <View>
                        <Text style={styles.descript}>{this.state.descriptenGame}</Text>
                    </View>
                    <Text style={styles.button} onPress={() => Linking.openURL(`${this.state.linkGame}`)}>Page wikipedia</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    containerLoader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#74b9ff'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        fontSize: 40,
        backgroundColor: '#74b9ff'
    },
    contentinfo: {
        alignSelf: 'flex-end',
        paddingVertical: '5%',
        paddingHorizontal: '8%'
    },
    infogame: {
        textAlign: 'right',
        fontSize: 15,
        marginVertical: '0.25%',
        color: '#fff',
        fontStyle: 'italic'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#74b9ff',
        backgroundColor: '#fff',
        padding: '8%',
        width: '100%'
    },
    descript: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingHorizontal: '8%',
        paddingVertical: '5%',
        marginTop: '15%',
        marginHorizontal: '8%',
        backgroundColor: '#fff',
        color: '#74b9ff',
        fontSize: 16
    },
    button: {
        marginTop: '10%',
        fontSize: 20,
        color: '#fff',
        textDecorationLine: 'underline'
    }
});

export default connect(mapStateToProps)(InfoScreen);
