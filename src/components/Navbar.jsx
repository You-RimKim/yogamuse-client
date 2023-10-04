// import { Link } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../context/auth.context";
// // import { bootstrap } from "bootstrap"; 
// // import "bootstrap/dist/css/bootstrap.min.css";

// function Navbar() {
//   // Subscribe to the AuthContext to gain access to
//   // the values from AuthContext.Provider `value` prop
//   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

//   // // Function for shrinking the navbar
//   // const navbarShrink = () => {
//   //   const navbarCollapsible = document.body.querySelector("#mainNav");
//   //   if (!navbarCollapsible) {
//   //     return;
//   //   }
//   //   if (window.scrollY === 0) {
//   //     navbarCollapsible.classList.remove("navbar-shrink");
//   //   } else {
//   //     navbarCollapsible.classList.add("navbar-shrink");
//   //   }
//   // };

//   // useEffect(() => {
//   //   // Shrink the navbar on page load
//   //   navbarShrink();

//   //   // Shrink the navbar when the page is scrolled
//   //   window.addEventListener("scroll", navbarShrink);

//   //   // Activate Bootstrap scrollspy on the main nav element
//   //   const mainNav = document.body.querySelector("#mainNav");
//   //   if (mainNav) {
//   //     new bootstrap.ScrollSpy(document.body, {
//   //       target: "#mainNav",
//   //       rootMargin: "0px 0px -40%",
//   //     });
//   //   }

//   //   // Collapse responsive navbar when toggler is visible
//   //   const navbarToggler = document.body.querySelector(".navbar-toggler");
//   //   const responsiveNavItems = [].slice.call(
//   //     document.querySelectorAll("#navbarResponsive .nav-link")
//   //   );
//   //   responsiveNavItems.map(function (responsiveNavItem) {
//   //     responsiveNavItem.addEventListener("click", () => {
//   //       if (window.getComputedStyle(navbarToggler).display !== "none") {
//   //         navbarToggler.click();
//   //       }
//   //     });
//   //   });

//   //   // Clean up event listeners when the component unmounts
//   //   return () => {
//   //     window.removeEventListener("scroll", navbarShrink);
//   //   };
//   // }, []);


//   return (
//     <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
//       <div className="container px-4 px-lg-5">
//         <Link className="navbar-brand" to="/">Yoga Muse</Link>
//         <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
//           Menu
//           <i className="fas fa-bars"></i>
//         </button>
//         {/* <div className="collapse navbar-collapse" id="navbarResponsive"> */}
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link to="/" className="nav-link">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/categories" className="nav-link">Categories</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/my-favorites" className="nav-link">Favorites</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/user" className="nav-link">Profile</Link>
//             </li>
//           </ul>
//           {isLoggedIn && (
//             <>
//               <button onClick={logOutUser}>Logout</button>
//               <span>{user && user.name}</span>
//             </>
//           )}
//           {!isLoggedIn && (
//             <>
//               <Link to="/signup">
//                 {" "}
//                 <button>Sign Up</button>{" "}
//               </Link>
//               <Link to="/login">
//                 {" "}
//                 <button>Login</button>{" "}
//               </Link>
//             </>
//           )}
//         </div>
//       {/* </div> */}
//     </nav>
//   )
// }


// export default Navbar;

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/categories">
            <button>Categories</button>
          </Link>

          <Link to="/my-favorites">
            <button>Favorites</button>
          </Link>

          <Link to="/user">
          <button>Profile</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;