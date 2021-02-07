import React, {useContext, useEffect} from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Button, Typography} from '@material-ui/core';

import {Context} from './Context';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#F1E3A7',
    margin: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  h2Header: {
    textAlign: 'center',
    fontSize: 34,
    color: '#5B7984'
  },
  button: {
    marginLeft: 20,
    marginBottom: 20
  }
});

export default function SimpleCard() {
  const classes = useStyles();
  const [getState, setState] = useContext(Context); 

  const getPosts = async () => {
    try {
        const data = await Axios.get('https://jsonplaceholder.typicode.com/posts');
        if (getState.posts.length === 0){
          setState({
            ...getState,
            posts: data.data
        })
        }
    } catch (error) {
        console.log('here is error')
    }
}




useEffect(() => {
    getPosts();
}, []);

useEffect(()=>{
  localStorage.setItem('state', JSON.stringify(getState))
}, [getState])

const addPostForm = () => {
    setState({
      ...getState,
      isPostForm: !getState.isPostForm
    })
}

return (
    <>
    <h2 className={classes.h2Header}>Posts</h2>
    {
       getState.posts.map(post => {
            if (post.userId === getState.postId) {
                return (
                    <Card className={classes.root} key={post.id}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {post.body}
                      </Typography>
                    </CardContent>
                  </Card>
                )
            }
        })
    }
    <Button variant="outlined" color="primary" className={classes.button} onClick={addPostForm}>Add new post</Button>
    </>
)

}
