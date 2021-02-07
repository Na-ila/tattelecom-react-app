import React, {useContext, useEffect} from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import {Context} from './Context';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
    borderRadius: 10,
    backgroundColor: '#CCDBAE'
  },
  title: {
    width: '70%'
  },
  body: {
    width: '90%'
  },
}));

export default function BasicTextFields() {
  const [getState, setState] = useContext(Context);
  const classes = useStyles();

  const addTitle = (title) => {
    setState({
      ...getState,
      newPostTitle: title.target.value
    })
  }

  const addBody = (body) => {
    setState({
      ...getState,
      newPostBody: body.target.value
    })
  } 

  const addPost = async (e) => {
    e.preventDefault()
    if (getState.newPostTitle && getState.newPostBody) {
        setState({
          ...getState,
          isEmptyForm: false,
          posts: [...getState.posts, {
              userId: getState.postId,
              id: getState.posts.length+1,
              title: getState.newPostTitle,
              body: getState.newPostBody
          }],
          newPostTitle: '',
          newPostBody: '',
          isPostForm: false
        })

        const newPost = {
          userId: getState.postId,
          id: getState.posts.length+1,
          title: getState.newPostTitle,
          body: getState.newPostBody
        }

        await Axios.post('https://jsonplaceholder.typicode.com/posts', {newPost})
          .then(function (response) {
            console.log(response.data.newPost)
          })
          .catch(function (error) {
            console.log(error);
        });
    } else {
        setState({
          ...getState,
          isEmptyForm: true
        })
    }
  }

useEffect(()=>{
  localStorage.setItem('state', JSON.stringify(getState))
}, [getState])

  return (
      <>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={addPost}>
      <TextField id="standard-basic" label="Title" 
      value={getState.newPostTitle}
       multiline className={classes.title} onChange={title => addTitle(title)}/>
      <TextField id="outlined-basic" label="Text" 
      value={getState.newPostBody}
       variant="outlined" multiline className={classes.body} onChange={body => addBody(body)}/>
      <Button variant="outlined" color="secondary" className={classes.button} type='submit'>Add</Button>  
      {getState.isEmptyForm ? <Alert severity="error">Fill the form!</Alert> : null}  
    </form>
    </>
  );
}