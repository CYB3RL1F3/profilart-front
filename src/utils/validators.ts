export const validateResidentAdvisor = (djid?: string, accessKey?: string, userId?: string) => {
  const isEmptyDjid = djid === "";
  const isEmptyAccessKey = accessKey === "";
  const isEmptyUserId = userId === "";
  return (isEmptyAccessKey && isEmptyDjid && isEmptyUserId) || (!isEmptyUserId && !isEmptyDjid && !isEmptyAccessKey);
}