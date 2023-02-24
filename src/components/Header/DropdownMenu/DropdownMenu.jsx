import '../../../index.css'


export const DropdownMenu = ({active, setActive, children}) => {

    return (
        <div className={active ? 'menu' : null} onClick={() => setActive(false)}>

            <div className={active ? 'menu_content' : null}>
                {children}
            </div>

        </div>
    )
}