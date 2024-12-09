import Login from "./login";
import LoginModal from './LoginModal';
import InscriptionModal from "./InscriptionModal";




export default function Header() {
    return (
        <header className="p-3 bg-white text-dark fixed-top">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
                        <img src="./R.png" className="bi me-2" width="32" height="32" role="img" aria-label="Bootstrap"/>
                        <p className="doto-header mb-0 me-5">ConnectHive</p>
                    </a>
                    <form className="search col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input className="form-control form-control-dark rounded-5" type="search" placeholder="Rechercher sur ConnectHive" aria-label="Search"/>
                    </form>
                    <div className="text-end d-flex">
                        <LoginModal/>
                        <InscriptionModal/>
                    </div>
                </div>
            </div>
        </header>
    );
}