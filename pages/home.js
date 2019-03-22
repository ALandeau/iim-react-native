import React from 'react';
import {StyleSheet, Text, View, FlatList, AsyncStorage, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import mapStateToProps from '../components/state'

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={ games: "" }
    }

    componentDidMount(){

        AsyncStorage.getItem("nameGame").then((value) => {
                if (value) {
                    const action = {type: 'SAVE_GAME', payload: value};
                    this.props.dispatch(action);
                }
            }).catch(error => {});

        return fetch('https://androidlessonsapi.herokuapp.com/api/game/list', {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    games: responseJson,
                }, function(){});
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        return (
            <ScrollView style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.lastgame}>Last game: {this.props.nameGame}</Text>
                    <Text style={styles.title}> Games List </Text>
                    <FlatList
                        data={this.state.games}
                        renderItem={({item}) => <Text style={styles.item} onPress={
                            () => this.props.navigation.navigate('Info', {idGame: item.id})}>{item.name}</Text>}
                        keyExtractor={({id}) => id}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%'
    },
    container: {
        backgroundColor: '#74b9ff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lastgame: {
        color: '#fff',
        fontStyle: 'italic',
        fontSize: 16,
        marginTop: '5%'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#74b9ff',
        padding: '8%',
        width: '100%',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    item: {
        textAlign: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: '8%',
        paddingVertical: '5%',
        marginTop: '5%',
        marginHorizontal: '8%',
        backgroundColor: '#fff',
        color: '#74b9ff',
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%'
    }
});

export default connect(mapStateToProps)(HomeScreen);
