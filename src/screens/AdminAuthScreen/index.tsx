import { useEffect, useState } from "react";
import { View } from "react-native";
import Text from "_/components/Text"
import { TextInput } from "react-native-gesture-handler";
import { Button } from "_/components";
import { COLORS } from "_/constants/colors";
import { useAuth } from "_/hooks/useAuth";
import { styles } from "./styles"
import { useNavigate } from "_/hooks/useNavigate";

export function AdminAuthScreen(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const { signIn, error, isAuthed } = useAuth()
    const { navigate } = useNavigate()

    useEffect(() => {
        if(isAuthed){
            navigate("Main")
        }
    }, [isAuthed])

    const handleSignIn = async () => {
        setIsLoading(true)
        await signIn({ email, password })
        setIsLoading(false)
    }

    return(
        <View style={styles.container}>
          <Text bold size="large" style={styles.title}>Login como administrador</Text>
          {error && <Text color={COLORS.COLOR_QUALITY_0}>{error?.message ?? "Something went wrong."}</Text>}
            <TextInput 
                placeholder="email"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setEmail}
            />
            <TextInput 
                placeholder="senha"
                secureTextEntry={true}
                autoCapitalize="none"
                style={[styles.input, {marginTop: 8}]}
                onChangeText={setPassword}
            />
            <Button 
                disabled={isLoading}
                title={isLoading? "Carregando...": "Entrar"}
                onPress={handleSignIn}
            />
        </View>
    )
}