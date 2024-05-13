import React from 'react'
import { useSearchParams } from 'react-router-dom'

function NotFound() {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("huy"));


    return (
        <button onClick={() => setSearchParams({ query: 'router', huy: "2001" })}>set Params</button>
    )
}

export default NotFound