import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Dashboardview from "../../components/Dashboardview";
import Storiesitem from "./Storiesitem";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useHook } from "./hooks";

const Stories = () => {
  const {
    stories,
    createdSuccessfully,
    handleCreate,
    handleDescriptionChange,
    handleImageChange,
    handleOpenModal,
    handleTitleChange,
    isModalOpen,
    title,
    description,
    image,
    handleCloseModal,
  } = useHook();

  useEffect(() => {
    if (createdSuccessfully) {
      window.alert("Created Successfully");
    }
  }, [createdSuccessfully]);

  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <Sidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <Dashboardview />
        <div className="flex items-center justify-center font-bold gap-[15px] py-[20px]">
          <section className="portfolio section">
            <h2 className="section__title">
              Alumni <span>Stories</span>{" "}
              <AiOutlinePlusCircle
                className="plus-icon cursor-pointer"
                onClick={handleOpenModal}
              />
            </h2>

            <div className="portfolio__container container grid">
              {stories &&
                stories.map((item) => {
                  return <Storiesitem key={item.id} {...item} />;
                })}
            </div>
          </section>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded">
            <h2 className="text-lg font-bold mb-4">Title</h2>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="border p-2 mb-4 w-full"
            />
            <h2 className="text-lg font-bold mb-4">Image</h2>
            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 mb-4 w-full"
            />
            {image && <div className="selected-image">{image.name}</div>}
            <h2 className="text-lg font-bold mb-4">Description</h2>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter Description"
              className="border p-2 mb-4 w-full resize-y"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Close
              </button>
              <button
                onClick={handleCreate}
                className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
