import React from "react";

function Header() {
  return (
    <header class="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
      <div class="container flex flex-col items-start justify-between md:flex-row">
        <a class="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa3bOnPztI-R93_jp9fqv_J_r_bCQI_mBzAUtKEARelxsbPlyj2l3RBjZVHmpzmxBRZp0&usqp=CAU"
            class="h-12 sm:h-20 rounded-full"
            alt="Logo"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            ProjectManager
          </span>
        </a>
      </div>
    </header>
  );
}

export default Header;
