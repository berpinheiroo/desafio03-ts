import { Center, SimpleGrid, Spinner } from "@chakra-ui/react"
import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { api } from "../api"
import CardInfo from "../components/CardInfo"
import { AppContext } from "../components/AppContext"

interface UserData {
    email: string
    password: string
    name: string
    balance: number
    id: string
}

const AccountInfos = () => {
    const [ userData, setUserData ] = useState<null | UserData>()
    const { id } = useParams()
    const navigate = useNavigate()

    const { isLoggedIn } = useContext(AppContext)

    !isLoggedIn && navigate('/')

    useEffect(() => {
        const getData = async () => {
            const data: any | UserData = await api
            setUserData(data)
        }

        getData()
    }, [])

    if(userData && id !== userData.id) {
        navigate('/')
    }
  
    return (
        <Center>
            <SimpleGrid columns={2} spacing={8} paddingTop={16}>
                {
                    userData === undefined || userData === null ?
                    (  
                        <Center>
                            <Spinner size='xl' color='white'/>
                        </Center>
                    ) : 
                    (
                        <>
                            <CardInfo mainContent='Bem vindo' content={`${userData?.name}`}/>
                            <CardInfo mainContent='E-mail' content={`${userData.email}`}/>
                        </>
                    )
                }
            </SimpleGrid>    
        </Center>
    )
}

export default AccountInfos
