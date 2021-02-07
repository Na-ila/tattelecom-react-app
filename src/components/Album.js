import React, {useContext, useEffect} from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Button, Typography} from '@material-ui/core';

import {Context} from './Context';

const useStyles = makeStyles({
  root: {
      width: '30%',
    minWidth: 275,
    backgroundColor: '#CCDBAE',
    margin: 20
  },
  title: {
    fontSize: 14,
  },
  h2Header: {
    textAlign: 'center',
    fontSize: 34,
    color: '#5B7984'
  },
  card: {
      display: 'flex',
      alignItems: 'center'
  },
  button: {
      height: 60
  }
});

export default function Albums() {
  const classes = useStyles();
  const [getState, setState] = useContext(Context);

  const getAlbums = async () => {
    try {
      const data = await Axios.get('https://jsonplaceholder.typicode.com/albums');
      setState({
          ...getState,
          albums: data.data
      })
    } catch (error) {
        console.log('here is error')
    }
  }

  useEffect(() => {
    getAlbums();
  }, []);

  const openAlbum = (id) => {
    setState({
      ...getState,
      isSlider: true,
      sliderId: id,
      isAlbums: false
    })
  }

  return (
    <>
    <h2 className={classes.h2Header}>Albums</h2>
    {
        getState.albums.map(album => {
            if (album.userId === getState.albumId) {
                return (
                    <div className={classes.card} key={album.id}>
                    <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {album.title}
                      </Typography>
                    </CardContent>
                  </Card>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={() => openAlbum(album.id)}>Open album</Button>
                    </div>
                )
            }
        })
    }
    </>
  );
}