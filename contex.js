import { createContext } from 'react';

const MyContext = createContext({
    user: null,
    updateUser: () => {}
});

export default MyContext;