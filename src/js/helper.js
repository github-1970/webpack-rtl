function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function textWithClassForItems(LSObject,) {
  return LSObject.map(item => {
    let text = item.text
    // let classValue = item.classList.length>1 ? item.classList.reduce((acc, item) => acc += ' ' + item, ''): item.classList[0]
    return {text, classList: item.classList}
  })
}

module.exports = {
  IsJsonString,
  textWithClassForItems,
}
