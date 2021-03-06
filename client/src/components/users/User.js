import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/user'
import { Card, Image, Button } from '../shared/Elements'
import styled from 'styled-components'

const UserDiv = styled.div`
    display: flex;
    flex-direction: ${({ fd }) => (fd ? fd : 'row')};
    align-items: center;
    justify-content: space-evenly;
`
const User = ({ user }) => {
    const dispatch = useDispatch()
    const { user: currentUser, isAuthenticated } = useSelector(
        (state) => state.auth
    )
    const isFollowed = (currentUserFollowing, followedUserId) => {
        if (
            currentUserFollowing.find(
                (following) => following.user === followedUserId
            )
        ) {
            return true
        }
        return false
    }
    return (
        <div>
            {user && (
                <Card>
                    <UserDiv fd="column">
                        <Image
                            src={
                                user.image
                                    ? user.image
                                    : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar-768x768.png'
                            }
                            style={{ width: '30%' }}
                        />
                        <h3>{user.name}</h3>
                        {currentUser && user && isAuthenticated && (
                            <Button
                                small
                                onClick={() => {
                                    !isFollowed(currentUser.following, user._id)
                                        ? dispatch(followUser(user._id))
                                        : dispatch(unfollowUser(user._id))
                                }}
                            >
                                {isAuthenticated && !isFollowed(currentUser.following, user._id)
                                    ? 'Follow'
                                    : 'Unfollow'}
                            </Button>
                        )}

                        <p>Followers: {user.followers.length}</p>
                        <p>Following: {user.following.length}</p>
                        <p>{user.places.length} Places</p>
                    </UserDiv>
                </Card>
            )}
            ̦
        </div>
    )
}

export default User
