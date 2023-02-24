import { Link } from 'react-router-dom'
import headerStyles from './header.module.scss'
import '../../index.css'
import { DropdownMenu } from './DropdownMenu/DropdownMenu'
import { useState } from 'react'
import { Exit } from './DropdownMenu/Exit'
import { useSelector } from 'react-redux'


export const Header = () => {
const [dropMenu, setDropMenu] = useState(false)
const likes = useSelector((store) => store.likes)

const totalFavesFn = () => {
    let total = likes.length
    return total
}
    return (
        <>
        <div className={headerStyles.header}>
        <Link className={headerStyles.link} to='posts'><span className={headerStyles.logo}><i className="fa-solid fa-blog"></i></span></Link>
        
        <div className='dropdown'>
        <span className={headerStyles.fav}><Link to='/favourites' style={ {color: 'black', textDecoration: 'none'}}><i className="fa-solid fa-heart"></i><span className={headerStyles.total}>{totalFavesFn()}</span></Link></span>
        <span onClick={() => setDropMenu(!dropMenu)} className={headerStyles.icon}><i className="fa-solid fa-circle-user"></i></span>
        
        <DropdownMenu active={dropMenu} setActive={setDropMenu}>
            {dropMenu ? <span className='menu_content_el'><Link to='/user' style={ {color: 'black', textDecoration: 'none'} }>Пользователь</Link></span> : null}
            
            {dropMenu ? <span className='menu_content_el'><Exit/></span>: null }
        </DropdownMenu>
        </div>
        
        </div>
        
        </>
    )
}