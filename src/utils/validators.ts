export const validateResidentAdvisor = (djid?: string, accessKey?: string, userId?: string) => {
  return (!djid && !accessKey && !userId);
}

export const cleanPlaylists = (playlists: string[]) => 
  playlists
    .map(playlist => {
      const p = playlist.split('/');
      return p[p.length - 1];
    })
    .filter(p => !!p.trim());
