import React from "react";

const PageNotFound = () => {
  return (
    <div>
      <div class="flex items-center justify-center h-screen">
        <div class="flex-col space-y-4 text-center">
          <div class="text-5xl font-medium">Page not found</div>
          <div class="text-gray-500">
            Sorry, the page you're looking for isn't available.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
