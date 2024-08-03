import md5 from 'js-md5';
import { ref, uploadBytes, getDownloadURL as getStorageDownloadURL } from 'firebase/storage'; // Import `getDownloadURL` with alias
import { storage } from '../../config/firebase';

export const getGravatarUrl = (email) => {
  const gravatarBaseUrl = 'https://www.gravatar.com/avatar/';
  const hash = md5(email.trim().toLowerCase());
  return `${gravatarBaseUrl}${hash}`;
};

export const uploadImage = async (file, fileName) => {
  const storageRef = ref(storage, `images/${fileName}`);
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getStorageDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
