import { NavigationContainer } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { useGetProfilePictureQuery } from "../services/user/userService"
import { setProfilePicture } from "../features/auth/authSlice"
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import { useEffect } from "react"


const MainNavigator = ()=>{
    const user = useSelector((state)=>state.authReducer.value.email)
    const localId = useSelector((state)=>state.authReducer.value.localId)

    const dispatch = useDispatch()

    const {data:profilePicture, isLoading, error} =useGetProfilePictureQuery(localId)

    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
        }
    },[profilePicture])

    return(
        <NavigationContainer>
            {   
            user
            ?
            <TabNavigator />
            :
            <AuthNavigator />
            }
        </NavigationContainer>
    )
}
export default MainNavigator