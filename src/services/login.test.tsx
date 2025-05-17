import { login } from "./login"

describe('login', () => {

    const mockEmail = 'be@dio.bank'
    const mockPassword = '123456'
    it('Deve exibir um alert com boas vindas caso o email e a senha sejam válidos', async() => {
        const response = await login(mockEmail, mockPassword)
        expect(response).toBeTruthy()
    })

    it('Deve exibir um erro caso o email e a senha sejam inválidos', async() => {
        const response = await login('email@invalido.com', 'senhaerrada')
        expect(response).toBeFalsy()
    })
})