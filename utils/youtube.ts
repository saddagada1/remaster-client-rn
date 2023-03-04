export const validateYoutubeURL = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|youtube(-nocookie)?.com\/(v\/|.*u\/\w\/|embed\/|.*v=))([\w-]{11}).*/;
  const match = url.match(regExp);
  if (match) {
    return true;
  } else {
    return false;
  }
};

export const extractYoutubeVideoID = (url: string) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match) {
    return match[2];
  } else {
    return undefined;
  }
};
