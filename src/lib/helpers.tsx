export const formatSongName = (songName: string) => {
  let formattedSongName = songName
    .replace(/-/g, ' ')
    .replace(/[0-9]/g, '')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  return formattedSongName;
};
