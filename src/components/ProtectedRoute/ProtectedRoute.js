import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

    
    let utoken = localStorage.getItem("userToken")

    return (
        utoken ? <Outlet /> : <Navigate to='/' />
    )
}


export default PrivateRoutes