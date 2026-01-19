import { createContext,useContext ,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
const AppContext  = createContext();
import { dummyChats,dummyUserData } from "../assets/assets";


export const AppContextProvider = ({children})=>{


    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [chats,setChats] = useState([]);
    const [selectedChat,setSelectedChat] = useState(null);
    const [theme,setTheme] = useState(localStorage.getItem('theme')|| 'light');

    const fetchUser = async () =>{
        setUser(dummyUserData)
    }

    const fetchUserChats = async() =>{
        setChats(dummyChats)
        setSelectedChat()
    }

    useEffect(()=>{
        if(user){
            fetchUserChats()
        }
        else{
            setChats([])
            setSelectedChat(null)
        }
    },[user])

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme',theme)
    },[theme])

    useEffect(()=>{
        fetchUser();
    },[])


    const value ={ navigate,user ,setUser,fetchUser,chats,setChats, selectedChat,setSelectedChat,theme,setTheme}
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)