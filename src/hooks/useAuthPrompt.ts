import { CLIENT_ID } from "_/constants/secrets";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, OAuthCredential } from "firebase/auth";

export interface AuthPromptService {
  promptAuth: () => Promise<OAuthCredential>;
}

export function useAuthPrompt() {
  const [_1, _2, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID,
  });

  const promptAuth = async (): Promise<OAuthCredential> => {
    const response = await promptAsync();
    if (response.type !== "success")
      throw new Error("Algo deu errado ao tentar logar.");

    const { id_token: idToken } = response.params;
    const credential = GoogleAuthProvider.credential(idToken);

    return credential;
  };

  return { promptAuth };
}
