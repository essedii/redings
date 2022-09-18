import React from 'react'
import { useParams } from 'react-router-dom'

const UserListingsPage = () => {
    const username = useParams()
  return (
    <div>{username}</div>
  )
}

export default UserListingsPage