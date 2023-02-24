import footerStyles from './footer.module.scss'


export const Footer = () => {
    return (
        <div className={footerStyles.footer}>
            <span className={footerStyles.copyright}><i class="fa-solid fa-copyright"></i><span className={footerStyles.copyright_text}>Все права защищены</span></span>
        </div>
    )
}