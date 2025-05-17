import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage, getAllLocalStorage } from "../services/storage";

const Home = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = getAllLocalStorage() as { login?: boolean };
        if (stored?.login) {
            setIsLoggedIn(true);
            navigate('/conta/1');
        }
    }, [navigate, setIsLoggedIn]);

    const validateUser = async (email: string, password: string) => {
        const loggedIn = await login(email, password);

        if (!loggedIn) {
            return alert('Email ou senha inválidos');
        }

        setIsLoggedIn(true);
        changeLocalStorage({ login: true });
        navigate('/conta/1');
    };

    return (
        <Box padding="25px">
            <Card>
                <Center>
                    <h1>Faça o login</h1>
                </Center>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    marginY={2}
                />
                <Input
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    marginY={2}
                />
                <Center marginTop={4}>
                    <DButton onClick={() => validateUser(email, password)} />
                </Center>
            </Card>
        </Box>
    );
};

export default Home;
