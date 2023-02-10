import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ViewStyle} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigate } from '_/hooks/useNavigate';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '_/components';
import { FONTS } from '_/constants/fonts';
import { SIZES } from '_/constants/sizes';
import styles from './styles';
import { useTotem } from '_/hooks/useTotem';

export default function QrCodeReader() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
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
    const {mac_address} = JSON.parse(data) as {mac_address: string}
    const response = await listTotem(mac_address)
    navigate('MoreInfo', response[0])
  };

  if (hasPermission === null) {
    return <Text>Aguardando permissão</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera</Text>;
  }

  return (
    <View style={[styles.container, safeArea]}>
        <Text style={styles.title}>Escaneie o QR Code no totem</Text>
        <View style={styles.qrcode}>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={[StyleSheet.absoluteFillObject, {borderRadius: SIZES.RADIUS_REGULAR}]}
            />
        </View>
        <View style={styles.infosContainer}>
            <Text  style={styles.description}>Escaneando o QR Code que está no totem, o aplicativo abrirá a tela com as informações de qualidade de ar do totem escaneado.</Text>
        </View>
    </View>
  );
}

