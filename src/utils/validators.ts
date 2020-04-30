export const validateResidentAdvisor = (djid?: string, accessKey?: string, userId?: string) => {
  console.log('=========');
  console.log('USER ID => ', userId);
  console.log('ACCESS KEY', accessKey);
  console.log('DJID => ', djid);
  console.log('=========');
  return (!djid && !accessKey && !userId);
}