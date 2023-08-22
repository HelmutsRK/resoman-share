import React from 'react'
import { Navigate } from 'react-router-dom'
import {validateUserAuth} from "../../helpers/authHelper";

function ProtectedRoute({ children }) {
    let authStatus = validateUserAuth()

    if (!authStatus) {
        return <Navigate to="/" replace />
    }
    return children
}
export default ProtectedRoute