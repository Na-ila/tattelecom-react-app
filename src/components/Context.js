import React, {useState, createContext} from 'react';

export const Context = createContext();

export const Provider = props => {

    const [getState, setState] = useState(
        () => {
            if (JSON.parse(localStorage.getItem('state'))) {
                return ({
                    ...JSON.parse(localStorage.getItem('state')),
                    isPost: false
                })
            } else {
                return(
                    {
                        users: [],
                        posts: [],
                        postId: '',
                        albumId: '',
                        isPost: false,
                        isPostForm: false,
                        newPostTitle: '',
                        newPostBody: '',
                        isEmptyForm: false,
                        isAlbums: false,
                        albums: [],
                        isSlider: false,
                        slideImages: [],
                        sliderId: ''
                    }
                )
            }
        }
    )

    return (
        <Context.Provider value={[getState, setState]}>
            {props.children}
        </Context.Provider>
    )
}