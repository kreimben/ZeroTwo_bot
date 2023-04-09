import styled from 'styled-components';
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import UserInfo from "./UserInfo";
import Login from "./Login";


const Auth = () => {
    const [cookies, setCookies] = useCookies(['discord_access_token']);

    useEffect(() => {
        console.log(`in auth`)
    }, [])


    return (
        <AuthWrapper>
            {
                cookies.discord_access_token ?
                    <UserInfo/> :
                    <Login/>
            }
            <div>
                auth view
            </div>
        </AuthWrapper>

    )
}

const AuthWrapper = styled.div`
`;

export default Auth;