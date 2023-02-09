import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, Auth, onAuthStateChanged, signOut, UserCredential } from "firebase/auth";

export interface IAuthService {
    signIn: (cred: AuthCredentials) => Promise<AdminUser | undefined>,
    logout: () => Promise<void>
    checkAuthenticated: () => Promise<AdminUser | undefined>
}

export interface AuthCredentials {
    email: string
    password: string
}

export class AuthService implements IAuthService {
    private readonly auth : Auth = getAuth();

    async signIn(cred: AuthCredentials): Promise<AdminUser | undefined> {
        const { email, password  } = cred
        const response = await signInWithEmailAndPassword(this.auth, email, password)
        const token = await response.user.getIdToken()
        return {
            token, 
            email: response.user.email ?? ""
        }

    }

    async checkAuthenticated() {
        return new Promise<AdminUser | undefined>(resolve => {
            onAuthStateChanged(this.auth, async (user) => {
                if(!user) {
                    resolve(undefined)
                    return
                }
                const token = await user.getIdToken()
                resolve({
                    token, 
                    email: user.email ?? ""
                })
            });
        })
    }

    async logout(){
        await signOut(this.auth)
    }
}