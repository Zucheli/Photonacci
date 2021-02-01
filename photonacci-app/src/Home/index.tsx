import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AdMobBanner, AdMobInterstitial, setTestDeviceIDAsync } from 'expo-ads-admob';

function Home() {

    const navigation = useNavigation();

    const goPhoto = () => {
        navigation.navigate('Photo');
    } 

    return (
        <>
            <View style={styles.container}>
                <AdMobBanner
                    style={styles.banner}
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3702483996895342/1026163098"
                    setTestDeviceIDAsync
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={(err) => console.log(err)}
                />
                <View style={styles.logo}>
                    <Image source={require('../assets/logo.png')}/>
                </View>
                <Text style={styles.title}>Photonacci</Text>
                <Text style={styles.subTitle}>Um app inspirado na sequência de Fibonacci e sua proporção áurea</Text>
                <View style={styles.footer}>
                    <RectButton style={styles.button} onPress={goPhoto}>
                        <Icon style={styles.buttonIcon} name="camera"/>
                        <Text style={styles.buttonText}>Tirar Foto</Text>
                    </RectButton>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    banner: {
       marginTop: '7%'
    },
    container: {
        backgroundColor: '#CACFD2',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    title: {
        color: '#2C3E50',
        fontSize: 60,
        textAlign: 'center'
    },
    subTitle: {
        color: '#B7950B',
        fontSize: 20,
        marginTop: '5%',
        width: '70%',
        textAlign: 'center',
    },
    logo: {
        marginTop: '5%'
    },
    button: {
        backgroundColor: '#2C3E50',
        borderRadius: 15,
        marginRight: '10%',
        marginLeft: '10%',
        flexDirection: 'row'
    },
    buttonIcon: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#CACFD2'
    },
    buttonText: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 15,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#CACFD2'
    },
    footer: {
        marginTop: '55%',
        flexDirection: 'row'
    }
});

export default Home;