export const removeWhitespace = data => {
  const regex = /\s/g;
  return data.replace(regex, '');
};

export const regexName = data => {
  const regex = /^[가-힣]{2,5}$/;
  return regex.test(data);
};

export const regexId = data => {
  const regex = /^[a-zA-Z0-9]{4,20}$/;
  return regex.test(data);
};

export const regexPwd = data => {
  const regex = /^[A-Za-z0-9!@]{4,20}$/;
  return regex.test(data);
};

export const regexNickNm = data => {
  const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
  return regex.test(data);
};
