// Hàm bỏ dấu tiếng việt tham khảo https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
export const removeAccents = (str) => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

// Hàm chuyển sang dạng kebabCase tham khảo https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-123.php
export const toKebabCase = str =>
    str &&
    str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
export const urlFormat = (name) => {
    return toKebabCase(removeAccents(name));
}
