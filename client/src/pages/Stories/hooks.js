import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const useHook = () => {
  const [stories, setStories] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // ... (previous code)

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:3001/stories/test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleRefetch();

      setTitle("");
      setImage(null);
      setDescription("");
      setCreatedSuccessfully(true);
      setTimeout(() => setCreatedSuccessfully(false), 3000);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchStories = async () => {
    try {
      const data = await axios.get("http://localhost:3001/stories/");

      console.log(data.data);

      setStories(data.data ?? []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRefetch = useCallback(
    () => handleFetchStories(),
    [handleFetchStories]
  );

  useEffect(() => {
    handleFetchStories().catch((e) => console.error(e));
  }, []);

  return {
    stories,
    handleCreate,
    createdSuccessfully,
    isModalOpen,
    handleOpenModal,
    handleTitleChange,
    handleImageChange,
    handleDescriptionChange,
    title,
    image,
    description,
    handleCloseModal,
  };
};
