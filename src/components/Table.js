import React, {useContext, useEffect, useState} from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Collapse, IconButton, Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import {Context} from './Context';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  table: {
    marginTop: 70,
    backgroundColor: '#F1F1F1'
  },
  tableHeader: {
    backgroundColor: '#96A363'
  },
  moreHeader: {
    backgroundColor: '#DAE1D9'
  },
  buttons: {
    width: '20%',
    margin: 20,
    display: 'flex',
    justifyContent: 'space-evenly'
  }
});

const ThirdTable = props => {
  const [open, setOpen] = useState(false);
  const [getState, setState] = useContext(Context);

  const classes = useRowStyles();
  const {user} = props;

  const showPosts = (id) => {
    if (getState.postId === id) {
      setState({
        ...getState,
        isPost: true,
        postId: id,
        isPostForm: false,
        isAlbums: false,
        isSlider: false
      })
    } else {
      setState({
        ...getState,
        isPost: true,
        postId: id,
        isPostForm: false,
        isAlbums: false,
        isSlider: false
      })
    }
  }

  const showAlbum = (id) => {
    if (getState.albumId === id) {
      setState({
        ...getState,
        isAlbums: true,
        albumId: id,
        isPost: false,
        isSlider: false,
        isPostForm: false
      })
    } else {
      setState({
        ...getState,
        isAlbums: true,
        albumId: id,
        isPost: false,
        isSlider: false,
        isPostForm: false
      })
    }
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell align="right">{user.username}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="right">{user.phone}</TableCell>
        <TableCell align="right">{user.website}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div" className={classes.moreHeader}>
                Adress
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Street</TableCell>
                    <TableCell>Suite</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Zipcode</TableCell>
                    <TableCell align="right">Geo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.address.street}
                      </TableCell>
                      <TableCell>{user.address.suite}</TableCell>
                      <TableCell align="right">{user.address.city}</TableCell>
                      <TableCell align="right">{user.address.zipcode}</TableCell>
                      <TableCell align="right">{user.address.geo.lat}/{user.address.geo.lng}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div" className={classes.moreHeader}>
                Company
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>CatchPhrase</TableCell>
                    <TableCell align="right">Bs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.company.name}
                      </TableCell>
                      <TableCell>{user.company.catchPhrase}</TableCell>
                      <TableCell align="right">{user.company.bs}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box className={classes.buttons}>
            <Button variant="outlined" color="primary" onClick={() => showPosts(user.id)}>Posts</Button>
            <Button variant="outlined" color="secondary" onClick={() => showAlbum(user.id)}>Album</Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

 const UserTable = () => {
    const classes = useRowStyles();
    const [getState, setState] = useContext(Context);

    const getUsers = async () => {
        try {
            const data = await Axios.get('https://jsonplaceholder.typicode.com/users');
            setState({
                ...getState,
                users: data.data
            })
        } catch (error) {
            console.log('here is error')
        }
    }
    
    useEffect(() => {
        getUsers();
    }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getState.users.map((user) => (
            <ThirdTable key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;