import {FC, FormEvent} from "react";
import {Box, Button, Dialog, DialogTitle, TextField} from "@mui/material";
import {useAuthentication} from "../hooks/useAuthentication";
import {useNavigate} from "react-router-dom";

export interface SignInProps {
    open: boolean;
    onClose: () => void;
}

export const SignIn: FC<SignInProps> = ({onClose, open}) => {
    const {signInUser} = useAuthentication();
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
                navigate('/pages')
            }
        }).catch(reason => {
            console.log(reason);
        }).finally(() => onClose());
    };

    return (
        <Dialog onClose={handleSubmit} open={open}>
            <DialogTitle textAlign="center">Увійти в режим редагування</DialogTitle>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{pl: 4, pr: 4, pb: 4}}>
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
                    sx={{mt: 1}}
                >
                    Увійти
                </Button>
                <Button
                    onClick={onClose}
                    type="button"
                    fullWidth
                    variant="text"
                    sx={{mt: 1}}
                >
                    Закрити
                </Button>
            </Box>
        </Dialog>
    );
}