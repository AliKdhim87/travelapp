import React, { useEffect, useState, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { Card, Title, Image, Divider, Button, Icon } from '../shared/Elements'
import { Container, Row, Grid } from '../shared/GridSystem'
import CommentForm from './CommentForm'
import { useSelector, useDispatch } from 'react-redux'
import { getPlace, deletePlace } from '../../actions/places'

import Map from '../../components/shared/Map'
import { addPlaceToBoard } from '../../actions/boards'
import UpdatePlace from './UpdatePlace'
import { addItemToWishlist } from '../../actions/user'
import { loadUser } from '../../actions/auth'

const PlaceDetails = () => {
    const history = useHistory()
    const placeId = useParams().placeId
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPlace(placeId))
    }, [placeId, dispatch])
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    const place = useSelector((state) => state.places.place)
    const { user, isAuthenticated } = useSelector((state) => state.auth)

    const [updateMode, setUpdateMode] = useState(false)

    const [open, setOpen] = useState(false)
    const [isBoardsOpen, setIsBoardsOpen] = useState(false)
    const [deletePlaceOpen, setDeletePlaceOpen] = useState(false)
    const isInWishlist = (wishlist, placeId) => {
        if (wishlist.find((wish) => wish.wish._id === placeId)) {
            return true
        }
        return false
    }
    if (!place) return <h4>Loading</h4>
    return (
        <Container>
            <Modal
                center
                open={updateMode}
                onClose={() => setUpdateMode(false)}
            >
                <UpdatePlace current={place} setUpdateMode={setUpdateMode} />
            </Modal>
            <Row center>
                <Modal center open={open} onClose={() => setOpen(false)}>
                    <Map
                        center={place.location}
                        zoom={16}
                        title={place.address}
                        onClick={() => setOpen(false)}
                    />
                </Modal>
                <Grid md={6} sm={12} lg={4}>
                    <Card marginTop="1rem">
                        {user && user._id === place.creator && (
                            <Fragment>
                                <Icon
                                    mr="5px"
                                    className="far fa-trash-alt"
                                    onClick={() => setDeletePlaceOpen(true)}
                                ></Icon>
                                <Icon
                                    mr="5px"
                                    className="far fa-edit"
                                    onClick={() => {
                                        setUpdateMode(true)
                                    }}
                                ></Icon>
                                <Modal
                                    center
                                    open={deletePlaceOpen}
                                    onClose={() => setDeletePlaceOpen(false)}
                                >
                                    <p>
                                        Are you sure you want to delete this
                                        place
                                    </p>
                                    <Button
                                        small
                                        red
                                        onClick={() => {
                                            dispatch(
                                                deletePlace(placeId, history)
                                            )
                                        }}
                                    >
                                        DELETE
                                    </Button>
                                    <Button
                                        darkGray
                                        small
                                        onClick={() =>
                                            setDeletePlaceOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                </Modal>
                            </Fragment>
                        )}
                        <Title center marginTop="1.5rem" marginBottom="1.5rem">
                            {place.title}
                        </Title>
                        <Divider gray marginBottom="0.8rem" />

                        <Image src={place.image} />

                        <Title center marginTop="1.5rem" marginBottom="1.5rem">
                            {place.address}
                        </Title>
                        <Divider gray marginBottom="0.8rem" />
                        <p>{place.description}</p>
                        <Divider
                            gray
                            marginTop="0.8rem"
                            marginBottom="0.8rem"
                        />
                        <Button
                            small
                            margin="5px"
                            onClick={() => setOpen(true)}
                        >
                            Map
                        </Button>
                        {isAuthenticated && (
                            <Button
                                small
                                margin="5px"
                                fontSize="0.98rem"
                                onClick={() => setIsBoardsOpen(true)}
                            >
                                Add to your board
                            </Button>
                        )}
                        {isAuthenticated &&
                        user &&
                        !isInWishlist(user.travelWishList, placeId) ? (
                            <Button
                                medium
                                margin="5px"
                                joustBlue
                                onClick={() =>
                                    dispatch(addItemToWishlist(placeId))
                                }
                            >
                                Add to your wishlist
                            </Button>
                        ) : (
                            <Button small darkGray>
                                In the Wishlist
                            </Button>
                        )}
                        <Modal
                            center
                            open={isBoardsOpen}
                            onClose={() => setIsBoardsOpen(false)}
                        >
                            <div>
                                <Title marginBottom="1rem" center>
                                    Your Boards
                                </Title>
                                {user &&
                                    user.placeLists &&
                                    user.placeLists.map((placelist) => (
                                        <Fragment key={placelist._id}>
                                            <Button
                                                onClick={() => {
                                                    dispatch(
                                                        addPlaceToBoard(
                                                            placelist._id,
                                                            placeId
                                                        )
                                                    )
                                                    setIsBoardsOpen(false)
                                                }}
                                            >
                                                {placelist.listName}
                                            </Button>
                                            <Divider dark></Divider>
                                        </Fragment>
                                    ))}
                            </div>
                            <Button
                                small
                                fontSize="0.75rem"
                                marginTop="1rem"
                                wheat
                                onClick={() => {
                                    setIsBoardsOpen(false)
                                }}
                                darkGray
                            >
                                Close
                            </Button>
                        </Modal>
                    </Card>
                    <CommentForm
                        placeId={place._id}
                        user={user}
                        isAuthenticated={isAuthenticated}
                    />
                </Grid>
            </Row>
        </Container>
    )
}

export default PlaceDetails
