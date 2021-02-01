import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Image, Alert, ImageBackground, ToastAndroid} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome as Icon } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import { AdMobBanner, AdMobInterstitial, setTestDeviceIDAsync } from 'expo-ads-admob';

function Photo() {

    const navigation = useNavigation();

    const goHome = () => {
        navigation.navigate('Home');
    }
    
    const camRef = useRef(null);
    const viewShotRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const [fibonacci, setFibonacci] = useState(true);

    useEffect(() => {
        (async () =>{
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        (async () =>{
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setHasPermission(status === 'granted');
        })(); 
    }, [])

    if(hasPermission === null){
    return <View/>
    }

    if(hasPermission === false){
    return <Text>Acesso Negado!</Text>
    }

    async function takePicture() {
        if(camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);

            type === Camera.Constants.Type.back
            ? setFibonacci(true)
            : setFibonacci(false)
        }
    }

    async function savePicture() {
        if (filter === false) {
            ToastAndroid.showWithGravity(
                'Aplique o filtro antes de salvar!',
                ToastAndroid.CENTER,
                ToastAndroid.SHORT
            )
        } else {
            await MediaLibrary.createAssetAsync(capturedPhoto) 
            ToastAndroid.showWithGravity(
                'Foto salva com sucesso!',
                ToastAndroid.CENTER,
                ToastAndroid.SHORT
            )
        }
    }


    async function saveFilter() {
        const uri = await viewShotRef.current.capture()
        setCapturedPhoto(uri)
        setFilter(true)
        ToastAndroid.showWithGravity(
            'Filtro aplicado com sucesso!',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT
        )
    }

    return(
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
                <View style={styles.header}>
                    <RectButton style={styles.button} onPress={goHome}>
                        <Icon style={styles.buttonIcon} name="chevron-left"/>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </RectButton>
                    <RectButton
                        style={styles.button} 
                        onPress={() => {
                            setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                            )
                        }}
                        >
                        <Icon style={styles.buttonIcon} name="undo"/>
                        <Text style={styles.buttonText}>Inverter{'\n'}Câmera</Text>
                    </RectButton>
                </View>
                <View style={styles.content}>
                    <Camera
                        style={styles.camera} 
                        type={type}  
                        ref={camRef}
                        autoFocus={Camera.Constants.AutoFocus.on}
                    >
                        <Image 
                            style={styles.overlay}
                            source={require('../assets/fibonacci.png')}
                        />
                    </Camera>
                </View>
                <View style={styles.footer}>
                    <RectButton style={styles.buttonFooter} onPress={takePicture}> 
                        <Icon style={styles.buttonFooterIcon} name="camera"/>
                    </RectButton>
                </View>
            </View>

            {capturedPhoto && type === Camera.Constants.Type.back && 
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={open}
                >
                    <View style={styles.container}>
                        <AdMobBanner
                            style={styles.bannerPreview}
                            bannerSize="fullBanner"
                            adUnitID="ca-app-pub-3702483996895342/1026163098"
                            setTestDeviceIDAsync
                            servePersonalizedAds
                            onDidFailToReceiveAdWithError={(err) => console.log(err)}
                        />
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setOpen(false)} style={styles.button}>
                                <Icon name="times" style={styles.buttonIcon}/>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                        <ViewShot 
                            style={styles.content}
                            ref={viewShotRef}
                            options={{format: 'jpg'}}
                        >
                            <ImageBackground
                                style={styles.camera}
                                source={{uri: capturedPhoto}}
                            >
                                <Image
                                    style={styles.overlay}
                                    source={require('../assets/fibonacci.png')}
                                />
                            </ImageBackground>
                        </ViewShot>
                        <View style={styles.footer}>
                            <TouchableOpacity onPress={saveFilter} style={styles.button}>
                                <Icon name="check" style={styles.buttonIcon}/>
                                <Text style={styles.buttonText}>Aplicar Filtro</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={savePicture} style={styles.button}>
                                <Icon name="download" style={styles.buttonIcon}/>
                                <Text style={styles.buttonText}>Salvar Foto</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }

            {capturedPhoto && type === Camera.Constants.Type.front && 
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={open}
                >
                    <View style={styles.container}>
                        <AdMobBanner
                            style={styles.bannerPreview}
                            bannerSize="fullBanner"
                            adUnitID="ca-app-pub-3702483996895342/1026163098"
                            setTestDeviceIDAsync
                            servePersonalizedAds
                            onDidFailToReceiveAdWithError={(err) => console.log(err)}
                        />
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setOpen(false)} style={styles.button}>
                                <Icon name="times" style={styles.buttonIcon}/>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                        <ViewShot 
                            style={styles.content}
                            ref={viewShotRef}
                            options={{format: 'jpg'}}
                        >
                            <ImageBackground
                                style={styles.camera}
                                source={{uri: capturedPhoto}}
                            >
                                <Image
                                    style={styles.overlay}
                                    source={require('../assets/fibonacci2.png')}
                                />
                            </ImageBackground>
                        </ViewShot>
                        <View style={styles.footer}>
                            <TouchableOpacity onPress={saveFilter} style={styles.button}>
                                <Icon name="check" style={styles.buttonIcon}/>
                                <Text style={styles.buttonText}>Aplicar Filtro</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={savePicture} style={styles.button}>
                                <Icon name="download" style={styles.buttonIcon}/>
                                <Text style={styles.buttonText}>Salvar Foto</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CACFD2',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    banner: {
        marginTop: '7%'
    },
    bannerPreview: {

    },
    header: {
        marginTop: '5%',
        flexDirection: 'row'
    },
    content: {
        marginTop: '5%',
        width: '90%',
        height: '60%',
        borderColor: '#2C3E50',
        borderWidth: 1,
    },
    footer: {
        marginTop: '10%',
        flexDirection: 'row',
    },
    camera: {
        width: '100%',
        height: '100%'
    },
    button: {
        marginRight: '7%',
        marginLeft: '7%',
        backgroundColor: '#2C3E50',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonFooter: {
        marginRight: '10%',
        marginLeft: '10%',
        backgroundColor: '#2C3E50',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonFooterIcon: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: '45%',
        paddingRight: '45%',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#CACFD2'
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
        fontSize: 15,
        color: '#CACFD2'
    },
    overlay: {
        width: '100%',
        height: '100%'
    }
});

export default Photo;