import Account from "../shared/Account";
import Friends from "../shared/Friends";
import Pages from "../shared/Pages";
import LogoContent from "../shared/LogoContent";


export default function MySideBar() {

    return(
        <div className="sidebar-section">
            <LogoContent />
            <Pages />
            <Friends />
            <Account />
        </div>
    )
}