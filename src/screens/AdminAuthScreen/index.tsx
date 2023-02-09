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

    const handleSignIn = () => {
        setIsLoading(true)
        signIn({ email, password })
        setIsLoading(false)
    }

    return(
        <View style={styles.container}>
          {error && <Text>{error?.message ?? "Something went wrong."}</Text>}
            <TextInput 
                style={{
                    width: "100%", 
                    height: 30,
                    borderWidth: 1,
                    borderColor: COLORS.BLACK
                }}
                autoCapitalize="none"
                onChangeText={setEmail}
            />
            <TextInput 
                secureTextEntry={true}
                autoCapitalize="none"
                style={{
                    width: "100%", 
                    height: 30,
                    borderWidth: 1,
                    borderColor: COLORS.BLACK, 
                    marginTop: 10,
                }}
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