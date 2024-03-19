import './Login.scss'
import {FC, FormEvent} from "react";
import {Box, Button, TextField, Typography} from '@mui/material';
import {auth} from "../../firebase-config";
import {
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {useUser} from "../../hooks/useUser";
import {useNavigate} from "react-router-dom";

export const Login: FC = () => {
    const {signInUser} = useUser();
    const navigate = useNavigate();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get('email') as string,
            password: data.get('password') as string,
        }

        signInUser(user.email, user.password).then(result => {
            console.log(result);
            if (result) {
                navigate('/')
            }
        }).catch(reason => {
            console.log(reason);
        });
    };

    return <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Typography component="h1" variant="h5">
            Форма входу в режим редагування:
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Пошта користувача"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                id="password"
                autoComplete="current-password"
                type="password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Увійти
            </Button>
        </Box>
    </Box>
}