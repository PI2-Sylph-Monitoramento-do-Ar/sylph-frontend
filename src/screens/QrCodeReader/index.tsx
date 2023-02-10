import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ViewStyle, ActivityIndicator} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigate } from '_/hooks/useNavigate';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIZES } from '_/constants/sizes';
import styles from './styles';
import { Camera, CameraType } from 'expo-camera';
import { useTotem } from '_/hooks/useTotem';
import { Button } from '_/components';

export default function QrCodeReader() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigate();
  const { top } = useSafeAreaInsets();
  const { listTotem } = useTotem();
  const safeArea = { paddingTop: top } as ViewStyle;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }:{type: string, data: string}) => {

    if(scanned) return

    setScanned(true);
    setLoading(true)
    const {mac_address} = JSON.parse(data) as {mac_address: string}
    const response = await listTotem(mac_address)
    navigate('MoreInfo', response[0])
    setLoading(false)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderCameraComponent = () => {
    if(loading) return <ActivityIndicator />
    if(scanned) return <Button title='Escanear novamente' onPress={() => setScanned(false)}/>
    return (
      <Camera 
            ratio='1:1'
            type={CameraType.back}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.pdf417, 2048],
            }}
            onBarCodeScanned={handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject, {borderRadius: SIZES.RADIUS_REGULAR}]}          
          />
    )
  }

  return (
    <View style={[styles.container, safeArea]}>
        <Text style={styles.title}>Escaneie o QR Code no totem</Text>
        <View style={styles.qrcode}>
          {renderCameraComponent()}
        </View>
        <View style={styles.infosContainer}>
            <Text  style={styles.description}>Escaneando o QR Code que está no totem, o aplicativo abrirá a tela com as informações de qualidade de ar do totem escaneado.</Text>
        </View>
    </View>
  );
}

