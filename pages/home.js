import React from 'react';
import {StyleSheet, Text, View, FlatList, AsyncStorage, ScrollView, Animated} from 'react-native';
import { connect } from 'react-redux';
import mapStateToProps from '../components/state'
import {Pulse} from "react-native-loader";

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            game: null,
            widthAnime: new Animated.Value(0)
        }
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount(){

        Animated.timing(
            this.state.widthAnime,
            {
                toValue: 30,
                duration: 1500,
            }
        ).start();


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
        let { widthAnime } = this.state;
        const { navigate } = this.props.navigation;

        if (!this.state.games) {
            return (
                <View style={styles.containerLoader}>
                    <Pulse size={30} color="#fff" />
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.wrapper}>
                    <View style={styles.container}>
                        <Text style={styles.lastgame}>Last game: {this.props.nameGame}</Text>
                        <Text style={styles.title}> Games List </Text>
                        <FlatList
                            style={styles.flatlist}
                            data={this.state.games}
                            renderItem={({item}) =>
                                <View style={styles.contentItem}>
                                    <Text style={styles.item} onPress={() => this.props.navigation.navigate('Info', {idGame: item.id})}>{item.name}</Text>
                                    <Animated.View style={{
                                        ...styles.underline,
                                        width: widthAnime
                                    }}>
                                    </Animated.View>
                                </View>}
                            keyExtractor={({id}) => id.toString()}
                        />
                    </View>
                </ScrollView>
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
        paddingTop: '20%',
        backgroundColor: '#74b9ff',
        flex: 1,
        alignItems: 'center',
    },
    flatlist: {
        paddingBottom: '100%'
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
    contentItem: {
        position: 'relative',
        backgroundColor: '#fff',
        marginHorizontal: '8%',
        paddingHorizontal: '15%',
        paddingVertical: '8%',
        marginVertical: '3%'
    },
    item: {
        alignSelf: 'center',
        color: '#74b9ff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    underline: {
        position: 'absolute',
        bottom: 0,
        left: -10,
        height: '50%',
        backgroundColor: '#fab1a0',
        alignSelf: 'flex-start',
    }
});

export default connect(mapStateToProps)(HomeScreen);
