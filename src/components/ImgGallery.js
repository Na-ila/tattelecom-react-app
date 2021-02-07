import React, {useContext, useEffect} from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Gallery from 'react-photo-gallery';
import { Button } from '@material-ui/core';

import {Context} from './Context';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center', 
        backgroundColor: 'red'
    },
    button: {
        margin: 20
    },
    h2Header: {
        textAlign: 'center',
        fontSize: 34,
        color: '#5B7984'
      }
});

const ImgGallery = () => {
    const classes = useStyles();
    const [getState, setState] = useContext(Context);

    const getImages = async () => {
        try {
            const data = await Axios.get('https://jsonplaceholder.typicode.com/photos');
            setState({
                ...getState,
                slideImages: data.data
            })
        } catch (error) {
            console.log('here is error')
        }
    }
    
    useEffect(() => {
        getImages();
    }, []);

    const closeAlbum = () => {
        setState({
            ...getState,
            isSlider: false,
            sliderId: '',
            isAlbums: true
        })
    }

    let photos = [];

    getState.slideImages.map(image => {
        if (image.albumId === getState.sliderId) {
            photos = [...photos, {
                src: image.thumbnailUrl,
                width: 150,
                height: 150
            }]
        }
    })

    return (
        <>
        <h2 className={classes.h2Header}>Gallery</h2>
        <Button variant="outlined" color="secondary" className={classes.button} onClick={() => closeAlbum()}>Close album</Button>
        <Gallery photos={photos}/>
        </>
    )
}

export default ImgGallery;
