let seqId = 1;

export const useIds = () => {
  const nextid = () => seqId++;
  
  return [nextid];
};
