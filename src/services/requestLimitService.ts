
interface RequestLimit {
  count: number;
  date: string;
  isPremium: boolean;
}

// Store request limit data in localStorage
export const getRequestLimit = (): RequestLimit => {
  const storedLimit = localStorage.getItem('safliiRequestLimit');
  
  if (storedLimit) {
    const limit = JSON.parse(storedLimit) as RequestLimit;
    const storedDate = new Date(limit.date).toDateString();
    const today = new Date().toDateString();
    
    // Reset count if it's a new day
    if (storedDate !== today && !limit.isPremium) {
      const newLimit = { count: 0, date: new Date().toISOString(), isPremium: limit.isPremium };
      localStorage.setItem('safliiRequestLimit', JSON.stringify(newLimit));
      return newLimit;
    }
    
    return limit;
  }
  
  // Initialize with 0 count
  const newLimit = { count: 0, date: new Date().toISOString(), isPremium: false };
  localStorage.setItem('safliiRequestLimit', JSON.stringify(newLimit));
  return newLimit;
};

export const incrementRequestCount = (): RequestLimit => {
  const limit = getRequestLimit();
  
  // If user is premium, don't increment
  if (limit.isPremium) {
    return limit;
  }
  
  const updatedLimit = { ...limit, count: limit.count + 1 };
  localStorage.setItem('safliiRequestLimit', JSON.stringify(updatedLimit));
  return updatedLimit;
};

export const setUserPremium = (isPremium: boolean): RequestLimit => {
  const limit = getRequestLimit();
  const updatedLimit = { ...limit, isPremium };
  localStorage.setItem('safliiRequestLimit', JSON.stringify(updatedLimit));
  return updatedLimit;
};

export const hasReachedLimit = (): boolean => {
  const limit = getRequestLimit();
  return !limit.isPremium && limit.count >= 3;
};
