'use client'
import { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorProps {
    error: Error
}

const ErrorState: React.FC<ErrorProps> = ({
    error
}) => {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <EmptyState title="哦买噶！" subtitle="发生了一些错误"/>
    )
}

export default ErrorState;
