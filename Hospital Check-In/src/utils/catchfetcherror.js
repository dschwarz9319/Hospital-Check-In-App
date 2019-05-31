const catchfetcherror = res => {
  if (!res.ok) {
    throw new Error(res);
  }
  return res;
};

export default catchfetcherror;
