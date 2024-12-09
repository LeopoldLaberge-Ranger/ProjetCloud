import React from "react";
import Head from "next/head";

const Sidebar = () => {
  return (
    <>
      <div className="container-fluid overflow-hidden">
        <div className=" overflow-y-auto">
          <div className="col-2 col-sm-3 col-xl-2 d-flex fixed-top" id="sidebar">
            <div className="d-flex flex-column flex-grow-1 align-items-center align-items-sm-start bg-white px-2 px-sm-3 py-2 text-white vh-100 overflow-auto">
              <a
                href="/"
                className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-5">
                  B<span className="d-none d-sm-inline">rand</span>
                </span>
              </a>
              <ul
                className="nav nav-pills flex-column flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item">
                  <a href="#" className="nav-link px-sm-0 px-2">
                    <i className="fs-5 bi-house"></i>
                    <span className="ms-1 d-none d-sm-inline">Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    className="nav-link px-sm-0 px-2"
                  >
                    <i className="fs-5 bi-speedometer2"></i>
                    <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                  </a>
                </li>
                {/* Other menu items */}
                <li>
                  <a
                    href="#submenu2"
                    className="nav-link px-sm-0 px-2"
                    data-bs-toggle="collapse"
                    data-bs-target="#submenu2"
                  >
                    <i className="fs-5 bi-map"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Expand <span className="bi-caret-down"></span>
                    </span>
                  </a>
                  <div
                    className="collapse collapse-horizontal px-2"
                    id="submenu2"
                  >
                    <ul className="list-unstyled mx-2">
                      <li>
                        <a href="#" className="nav-link px-sm-0 px-2">
                          <span>Item A</span>
                        </a>
                      </li>
                      {/* Other submenu items */}
                    </ul>
                  </div>
                </li>
              </ul>
              <div className="dropup py-sm-4 py-1 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="28"
                    height="28"
                    className="rounded-circle"
                  />
                  <span className="d-none d-sm-inline mx-1">Joe</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark px-0 px-sm-2 text-center text-sm-start"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <a className="dropdown-item px-1" href="#">
                      <i className="fs-6 bi-basket"></i>
                      <span className="d-none d-sm-inline ps-1">New project</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item px-1" href="#">
                      <i className="fs-6 bi-bookmark"></i>
                      <span className="d-none d-sm-inline ps-1">Settings</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item px-1" href="#">
                      <i className="fs-6 bi-binoculars"></i>
                      <span className="d-none d-sm-inline ps-1">Profile</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>        
        </div>
      </div>
    </>
  );
};

export default Sidebar;
